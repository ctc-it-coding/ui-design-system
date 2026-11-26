const fs = require('fs');
const { dump, nodes } = require('./spec');
const doc = [...nodes.values()].find(n => n.type === 'DOCUMENT');
fs.mkdirSync('specs2', { recursive: true });
let section = '';
const pick = /MARKETING WEBSITE COMPONENTS|SHARED ASSETS/;
for (const page of doc._children) {
  const nm = page.name.trim();
  if (/^❖ [A-Z]{3}/.test(nm)) { section = nm; continue; }
  if (!pick.test(section) || !nm.startsWith('↳')) continue;
  const out = [];
  const walk = (n) => {
    if (n.isStateGroup) {
      const vs = n._children.filter(c => c.type === 'SYMBOL');
      const sorted = [...vs].sort((a, b) => (/Breakpoint=Mobile|State=(Hover|Focused)/.test(a.name) - /Breakpoint=Mobile|State=(Hover|Focused)/.test(b.name)));
      out.push(`\n########## SET ${n.name} (${vs.length})`); let lines = 0;
      for (const v of sorted) { const o = []; dump(v, 0, 7, o); if (lines > 1500) { out.push(`(+ ${v.name})`); continue; } out.push(`\n=== ${v.name}`); out.push(...o.slice(0, 160)); lines += Math.min(o.length, 160); }
      return;
    }
    if (n.type === 'SYMBOL') { const o = []; dump(n, 0, 7, o); out.push(`\n########## SYMBOL ${n.name}`); out.push(...o.slice(0, 160)); return; }
    n._children.forEach(walk);
  };
  page._children.forEach(walk);
  fs.writeFileSync(`specs2/${nm.replace('↳', '').trim().replace(/[^a-z0-9]+/gi, '_')}.txt`, out.join('\n'));
}
