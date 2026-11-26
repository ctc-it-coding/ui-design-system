const fs = require('fs');
const { nodes } = require('./tree');
const doc = [...nodes.values()].find(n => n.type === 'DOCUMENT');
let section = ''; const out = [];
for (const page of doc._children) {
  const nm = page.name.trim();
  if (/^❖ [A-Z]/.test(nm) || /^–/.test(nm)) { if (/^❖/.test(nm)) section = nm; continue; }
  if (/FOUNDATIONS|SHARED COMPONENTS|APPLICATION COMPONENTS/.test(section) && nm.startsWith('↳')) continue;
  const sets = []; const frames = [];
  const walk = (n, d) => {
    if (n.isStateGroup) { const v = n._children.filter(c => c.type === 'SYMBOL'); const props = {}; for (const s of v) for (const kv of s.name.split(',')) { const [k, val] = kv.split('=').map(x => x && x.trim()); if (val) (props[k] ||= new Set()).add(val); } sets.push(`${n.name} [${v.length}] ` + Object.entries(props).map(([k, s]) => `${k}: ${[...s].slice(0, 14).join('|')}${s.size > 14 ? '…' : ''}`).join('; ')); return; }
    if (n.type === 'SYMBOL') { if (!n.name.startsWith('_')) sets.push(`${n.name} [1]`); return; }
    if (d === 0 && (n.type === 'FRAME' || n.type === 'SECTION')) frames.push(`${n.name} ${Math.round(n.size?.x)}x${Math.round(n.size?.y)}`);
    for (const c of n._children) walk(c, d + 1);
  };
  for (const c of page._children) walk(c, 0);
  out.push(`\n## ${nm} (${section}) frames:${frames.length} sets:${sets.length}\n  F: ${frames.slice(0, 40).join(' | ')}\n` + sets.map(s => '  - ' + s.slice(0, 300)).join('\n'));
}
fs.writeFileSync('inv2.txt', out.join('\n'));
