"""一次性：把 Hexo 文章轉成 Astro 格式。
用法：python3 tools/migrate-from-hexo.py <hexo 專案路徑>
"""
import json, os, re, shutil, sys
import yaml

HEXO = sys.argv[1]
POSTS = os.path.join(HEXO, 'source', '_posts')
PUBLIC = os.path.join(HEXO, 'public')
OUT = 'src/content/posts'

IMG_TAG = re.compile(r'<div align=(?:left|right)>\s*<img src="([^"]+)"[^>]*/>\s*</div>')
MD_IMG = re.compile(r'!\[([^\]]*)\]\(([^)\s]+)\)')

def local(path):
    return not re.match(r'^(https?:)?//|^/', path)

def md_path(name):
    p = './' + name
    return f'<{p}>' if ' ' in p else p

redirects = {}
old_urls = {}
for root, _, files in os.walk(PUBLIC):
    m = re.search(r'/(\d{4}/\d\d/\d\d)/([^/]+)$', root)
    if m and 'index.html' in files:
        old_urls[m.group(2)] = f'/{m.group(1)}/{m.group(2)}/'

for md in sorted(f for f in os.listdir(POSTS) if f.endswith('.md')):
    name = md[:-3]
    raw = open(os.path.join(POSTS, md), encoding='utf-8').read()
    _, fm_raw, body = raw.split('---', 2)
    fm = yaml.safe_load(fm_raw)
    slug = name.lower()
    dest = os.path.join(OUT, slug)
    os.makedirs(dest, exist_ok=True)
    src_dir = os.path.join(POSTS, name)
    if os.path.isdir(src_dir):
        for f in os.listdir(src_dir):
            if not f.startswith('.'):
                shutil.copy2(os.path.join(src_dir, f), dest)

    body = IMG_TAG.sub(lambda m: f'![]({md_path(m.group(1))})', body)
    body = MD_IMG.sub(lambda m: f'![{m.group(1)}]({md_path(m.group(2)) if local(m.group(2)) and not m.group(2).startswith("./") else m.group(2)})', body)

    new = {
        'title': str(fm['title']),
        'description': (fm.get('subtitle') or '').strip(),
        'published': fm['date'].strftime('%Y-%m-%dT%H:%M:%S+08:00'),
        'slug': slug,
    }
    cover = fm.get('header-img')
    if cover and os.path.exists(os.path.join(dest, cover)):
        new['cover'] = './' + cover
    new['tags'] = [str(t) for t in (fm.get('tags') or [])]
    cats = fm.get('categories') or []
    if cats:
        new['category'] = str(cats[0])
    new['toc'] = bool(fm.get('catalog', True))

    out = '---\n' + yaml.safe_dump(new, allow_unicode=True, sort_keys=False) + '---\n' + body.lstrip('\n')
    open(os.path.join(dest, 'index.md'), 'w', encoding='utf-8').write(out)
    if name in old_urls:
        redirects[old_urls[name]] = f'/posts/{slug}/'
    else:
        print('WARN no old URL for', name)

redirects['/tags/'] = '/tags/'
json.dump(redirects, open('src/redirects.json', 'w'), indent=2, ensure_ascii=False)
print(len(redirects) - 1, 'posts migrated')
