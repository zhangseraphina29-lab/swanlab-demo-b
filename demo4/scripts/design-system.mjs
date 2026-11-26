import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import postcss from 'postcss';

const root = path.resolve(import.meta.dirname, '..');
const docs = path.join(root, 'docs/design-system');
const mode = process.argv.includes('--write') ? 'write' : 'check';
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const rulePaths = JSON.parse(read('docs/design-system/reference/rule-source-paths.json'));
const sources = [...Object.values(rulePaths).map(file => path.resolve(root, file)), path.join(root, 'docs/design-system/reference/rule-source-paths.json'), ...walk(path.join(root, 'src')), ...['index.html', 'vite.config.js', 'package.json', 'design-reference/supabase/tokens.css'].map(file => path.join(root, file))].sort();
const hashes = Object.fromEntries(sources.map(file => [path.relative(root, file).split(path.sep).join('/'), crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')]));
const sheetOrder = [];
function visit(file) {
  if (sheetOrder.includes(file)) return;
  const ast = postcss.parse(read(file), { from: file });
  ast.walkAtRules('import', rule => {
    const match = rule.params.match(/^["']([^"']+)["']/);
    if (match && match[1].startsWith('.')) visit(path.posix.normalize(path.posix.join(path.posix.dirname(file), match[1])));
  });
  sheetOrder.push(file);
}
visit('src/styles/index.css');
const tokens = new Map();
const usages = new Map();
for (const file of sheetOrder) {
  const ast = postcss.parse(read(file), { from: file });
  ast.walkDecls(decl => {
    for (const match of decl.value.matchAll(/var\((--[\w-]+)/g)) {
      const found = usages.get(match[1]) || [];
      found.push({ file, line: decl.source.start.line, prop: decl.prop, value: decl.value });
      usages.set(match[1], found);
    }
    if (!decl.prop.startsWith('--')) return;
    const parents = [];
    for (let parent = decl.parent; parent && parent.type !== 'root'; parent = parent.parent) parents.unshift(parent.type === 'rule' ? parent.selector : `@${parent.name} ${parent.params}`);
    const records = tokens.get(decl.prop) || [];
    records.push({ file, line: decl.source.start.line, context: parents.join(' → '), value: decl.value, important: !!decl.important });
    tokens.set(decl.prop, records);
  });
}
function section(file, content, initial) {
  const start = '<!-- generated:start -->', end = '<!-- generated:end -->';
  const block = `${start}\n${content}\n${end}`;
  if (!fs.existsSync(file)) fs.writeFileSync(file, `${initial}\n\n${block}\n`);
  else {
    const previous = fs.readFileSync(file, 'utf8');
    if (!previous.includes(start) || !previous.includes(end)) throw Error(`缺少生成区标记：${file}`);
    fs.writeFileSync(file, previous.slice(0, previous.indexOf(start)) + block + previous.slice(previous.indexOf(end) + end.length));
  }
}
const tokenSlug = name => name.slice(2);
if (mode === 'write') {
  for (const [name, records] of [...tokens].sort(([a], [b]) => a.localeCompare(b))) {
    const used = (usages.get(name) || []).slice(0, 6);
    const usageText = used.length ? used.map(item => `- [${item.file}:${item.line}](../../../${item.file})：\`${item.prop}: ${item.value}\``).join('\n') : '当前已导入的 CSS 中未发现 var() 直接引用；不能仅凭声明认定组件正在使用。';
    const body = records.map(record => `- [${record.file}:${record.line}](../../../${record.file}) · 条件：\`${record.context}\`\n  - 值：\`${record.value}\`${record.important ? '（!important）' : ''}`).join('\n');
    section(path.join(docs, 'tokens', `${tokenSlug(name)}.md`), `## 当前代码定义（按样式导入和声明顺序）\n\n${body}\n\n这些是声明记录，并非浏览器计算值；具体元素还受选择器优先级、继承和媒体条件影响。\n\n## 直接引用示例（最多六处）\n\n${usageText}`, `# ${name}\n\n[返回 Token 目录](../reference/token-catalog.md) · [返回总目录](../README.md)\n\n## 已确定用途\n\n## 其他使用规则\n\n## 代码声明记录（不表示已冻结的规范）`);
  }
  const sorted = [...tokens].sort(([a], [b]) => a.localeCompare(b));
  const parts = [];
  for (let offset = 0; offset < sorted.length; offset += 60) {
    const chunk = sorted.slice(offset, offset + 60);
    const name = `token-catalog-${offset / 60 + 1}.md`;
    const catalog = chunk.map(([token, records]) => `| [\`${token}\`](../tokens/${tokenSlug(token)}.md) | ${records.length} |`).join('\n');
    section(path.join(docs, 'reference', name), `| Token | 条件声明数 |\n| --- | ---: |\n${catalog}`, `# Token 分册 ${offset / 60 + 1}\n\n[返回 Token 目录](token-catalog.md) · [返回总目录](../README.md)`);
    parts.push(`- [${chunk[0][0]} → ${chunk.at(-1)[0]}](${name})（${chunk.length} 项）`);
  }
  section(path.join(docs, 'reference/token-catalog.md'), `共 ${tokens.size} 个变量；分册中的每个变量均可点开独立 Markdown。仅枚举实际导入的项目样式，不枚举 Tailwind 内置变量和未导入的历史主题。\n\n${parts.join('\n')}`, '# Token 完整目录\n\n[返回总目录](../README.md)\n\n这是代码变量的可查询目录；主题选择和使用语义见[颜色](../foundations/color.md)、[设计 Token](../foundations/design-token.md)与[主题](../foundations/theme.md)。');
  const imports = sheetOrder.map((file, index) => `${index + 1}. [${file}](../../../${file})`).join('\n');
  section(path.join(docs, 'reference/source-map.md'), `## 当前项目 CSS 导入展开顺序\n\n${imports}\n\n## 实现文件\n\n${Object.keys(hashes).filter(file => !file.endsWith('.css')).map(file => `- [${file}](../../../${file})`).join('\n')}`, '# 实现来源\n\n[返回总目录](../README.md)\n\n这是实现定位表，不是样式优先级排序。选择器优先级、!important、@layer、主题与媒体查询仍参与级联。');
  fs.writeFileSync(path.join(docs, 'reference/source-snapshot.json'), JSON.stringify({ sources: hashes }, null, 2) + '\n');
}
let errors = [];
const snapshotPath = path.join(docs, 'reference/source-snapshot.json');
if (!fs.existsSync(snapshotPath)) errors.push('缺少源码快照，请运行 npm run docs:sync');
else {
  const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8')).sources;
  for (const file of new Set([...Object.keys(snapshot), ...Object.keys(hashes)])) if (snapshot[file] !== hashes[file]) errors.push(`UI 源码已变化，需同步文档：${file}`);
}
for (const file of [...walk(docs).filter(file => file.endsWith('.md')), path.join(root, 'DESIGN.md')]) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.split('\n').length > (path.basename(file) === 'README.md' ? 100 : 150)) errors.push(`文档过长，应拆分：${path.relative(root, file)}`);
  for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1].split('#')[0];
    if (!target || /^(https?:|mailto:)/.test(target)) continue;
    if (!fs.existsSync(path.resolve(path.dirname(file), decodeURI(target)))) errors.push(`失效链接 ${path.relative(root, file)} → ${target}`);
  }
}
for (const name of tokens.keys()) if (!fs.existsSync(path.join(docs, 'tokens', `${tokenSlug(name)}.md`))) errors.push(`缺少 Token 文档：${name}`);
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`Design System ${mode === 'write' ? '同步并校验' : '校验'}通过：${tokens.size} 个 Token，${Object.keys(hashes).length} 个源码文件。`);
