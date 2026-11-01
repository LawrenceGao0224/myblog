// 和 Hexo 一樣：文章裡按 Enter 就換行（把段落內的換行轉成 <br>）
// 緊貼著照片的換行不轉，避免照片前後多出一行空白
export const softBreaks = {
  name: 'soft-breaks',
  text(node, ctx) {
    if (!node.value.includes('\n')) return;
    const parent = ctx.parent(node);
    if (parent?.type !== 'paragraph') return;
    const i = ctx.indexOf(node);
    const isImage = (n) => n?.type === 'image';
    let value = node.value;
    if (isImage(parent.children[i - 1])) value = value.replace(/^\n+/, '');
    if (isImage(parent.children[i + 1])) value = value.replace(/\n+$/, '');
    if (!value) return ctx.removeNode(node);
    const parts = value.split('\n');
    if (parts.length === 1) return value === node.value ? undefined : ctx.replaceNode(node, { type: 'text', value });
    ctx.replaceNode(
      node,
      parts.flatMap((part, j) => [...(j > 0 ? [{ type: 'break' }] : []), ...(part ? [{ type: 'text', value: part }] : [])]),
    );
  },
};
