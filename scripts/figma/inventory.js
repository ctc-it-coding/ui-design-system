const fs = require('fs');
const { nodes } = require('./tree');
const doc = [...nodes.values()].find(n => n.type === 'DOCUMENT');
let started = false; const out = [];
const want = /SHARED COMPONENTS|APPLICATION COMPONENTS|FOUNDATIONS/;
let section = '';
for (const page of doc._children) {
  if (page.name.includes('❖') && !page.name.trim().startsWith('❖ ') === false) section = page.name;
  if (page.name.trim().startsWith('❖')) { section = page.name.trim(); continue; }
  if (!want.test(section) || !page.name.includes('↳')) continue;
  const sets = [];
  const walk = (n, depth) => {
    if (n.isStateGroup) {
      const variants = n._children.filter(c => c.type === 'SYMBOL');
      const props = {};
      for (const v of variants) for (const kv of v.name.split(',')) { const [k, val] = kv.split('=').map(s => s && s.trim()); if (val !== undefined) (props[k] ||= new Set()).add(val); }
      sets.push({ name: n.name, id: n._id, count: variants.length, props: Object.fromEntries(Object.entries(props).map(([k, s]) => [k, [...s]])) });
      return;
    }
    if (n.type === 'SYMBOL') { sets.push({ name: n.name, id: n._id, count: 1, single: true }); return; }
    for (const c of n._children) walk(c, depth + 1);
  };
  for (const c of page._children) walk(c, 0);
  out.push({ section, page: page.name.replace('↳', '').trim(), id: page._id, sets });
}
fs.writeFileSync('inventory.json', JSON.stringify(out, null, 1));
for (const p of out) {
  console.log(`\n## ${p.page} (${p.section})`);
  for (const s of p.sets) { if (s.name.startsWith('_') && s.single) continue; console.log(`- ${s.name} [${s.count}] ${s.props ? Object.entries(s.props).map(([k, v]) => `${k}: ${v.slice(0, 12).join('|')}${v.length > 12 ? '…' : ''}`).join('; ') : ''}`.slice(0, 400)); }
}
