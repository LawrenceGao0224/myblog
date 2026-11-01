"""把文章裡的 YouTube 影片連結換成內嵌播放器。
用法：python3 tools/embed-youtube.py   （可重複執行，已轉過的不會再轉）
"""
import glob, re

URL = re.compile(r'https?://(?:www\.|m\.)?(?:youtube\.com/(?:watch\?[^\s)\]<>]*?v=|shorts/)|youtu\.be/)([\w-]{11})[^\s)\]<>]*')
MDLINK = re.compile(r'\[([^\]]*)\]\((' + URL.pattern + r')\)')
JUNK = re.compile(r'^(YouTube( Shorts| vlog)?|VLOG)?\s*[:：]?\s*$', re.I)

def start_seconds(url):
    """網址裡的開始時間：t=95、t=95s、t=1m35s、start=95"""
    m = re.search(r'[?&](?:t|start)=(?:(\d+)h)?(?:(\d+)m)?(\d+)?s?(?:&|$)', url)
    if not m or not any(m.groups()):
        return 0
    h, mi, se = (int(x or 0) for x in m.groups())
    return h * 3600 + mi * 60 + se

def iframe(vid, short, start=0):
    cls = 'yt short' if short else 'yt'
    query = f'?start={start}' if start else ''
    return (f'<iframe class="{cls}" src="https://www.youtube-nocookie.com/embed/{vid}{query}" title="YouTube video" '
            'loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" '
            'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>')

def convert(md):
    out, group = [], []
    last = [None]  # 上一組影片的說明文字
    def flush():
        if group:
            out.append('<div class="videos">\n' + '\n'.join(group) + '\n</div>\n')
            group.clear()
    in_code = False
    for line in md.split('\n'):
        if line.lstrip().startswith('```'):
            in_code = not in_code
        m = None if in_code else URL.search(line)
        if not m:
            if group and line.strip() == '':
                continue  # 影片之間的空行：繼續合併成同一組
            flush(); last[0] = None; out.append(line); continue
        vid, short = m.group(1), '/shorts/' in m.group(0)
        # 說明文字：把連結換成它的文字（文字本身是網址就拿掉）
        caption = MDLINK.sub(lambda l: '' if URL.match(l.group(1)) else l.group(1), line)
        caption = URL.sub('', caption).rstrip(' :：')
        caption = re.sub(r'[:：]\s*YouTube$', '', caption).strip()
        heading = re.match(r'^(#+)\s*', caption)
        if JUNK.match(caption) or (heading and not caption[heading.end():].strip()):
            caption = ''
        if caption and caption != last[0]:
            flush()
            out.append(caption + '\n')
            last[0] = caption
        group.append(iframe(vid, short, start_seconds(m.group(0))))
    flush()
    return '\n'.join(out)

total = 0
for f in sorted(glob.glob('src/content/posts/*/index*.md')):
    s = open(f, encoding='utf-8').read()
    fm_end = s.index('---', 3) + 3
    body = s[fm_end:]
    new = convert(body)
    if new != body:
        n = new.count('youtube-nocookie.com/embed/') - body.count('youtube-nocookie.com/embed/')
        total += n
        open(f, 'w', encoding='utf-8').write(s[:fm_end] + new)
        print(f'{f}: {n} 部影片')
print('共', total, '部影片轉成內嵌')
