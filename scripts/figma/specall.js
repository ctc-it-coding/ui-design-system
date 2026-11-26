const fs = require('fs');
const { dump, nodes } = require('./spec');
const inv = JSON.parse(fs.readFileSync('inventory.json', 'utf8'));
fs.mkdirSync('specs', { recursive: true });
for (const p of inv) {
  if (/Icons|Logos|Colors|Typography|Portfolio|annotations|Misc icons/.test(p.page)) continue;
  const out = [];
  for (const s of p.sets) {
    const set = nodes.get(s.id);
    const vs = set.isStateGroup ? set._children.filter(c => c.type === 'SYMBOL') : [set];
    out.push(`\n########## SET ${s.name} (${vs.length})`);
    let lines = 0;
    // prefer default states
    const sorted = [...vs].sort((a, b) => (/State=(Default|Placeholder)/.test(b.name) - /State=(Default|Placeholder)/.test(a.name)));
    for (const v of sorted) {
      const o = []; dump(v, 0, /Modal|Slide out|Sidebar|Header nav|Table$|Command bar|Date picker|Page header|File upload$|Activity feed|Inline CTA|Notification|Empty state/.test(s.name) ? 7 : 6, o);
      if (lines > 700) { out.push(`(+ ${v.name})`); continue; }
      out.push(`\n=== ${v.name}`); out.push(...o.slice(0, 120)); lines += Math.min(o.length, 120);
    }
  }
  fs.writeFileSync(`specs/${p.page.replace(/[^a-z0-9]+/gi, '_')}.txt`, out.join('\n'));
}
