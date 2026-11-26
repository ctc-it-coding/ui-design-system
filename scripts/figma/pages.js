const fs = require('fs');
const { nodes, key } = require('./tree');
const doc = [...nodes.values()].find(n => n.type === 'DOCUMENT');
const ref = (n) => { const m = nodes.get(key(n.symbolData?.symbolID)); return m ? (m._parent?.isStateGroup ? `${m._parent.name} {${m.name}}` : m.name) : '?'; };
const out = {};
for (const p of doc._children) {
  const nm = p.name.trim(); if (!nm.startsWith('❖') || /[A-Z]{4}/.test(nm)) continue;
  out[nm] = p._children.filter(f => f.name.startsWith('Desktop') || f.size?.x >= 1200).map(f => {
    const kids = []; const walk = (n, d) => { for (const c of n._children) { if (c.visible === false) continue; if (c.type === 'INSTANCE') kids.push('  '.repeat(d) + ref(c)); else if (d < 2 && c._children.length) { kids.push('  '.repeat(d) + `[${c.type} ${c.name}]`); walk(c, d + 1); } else if (d < 2) kids.push('  '.repeat(d) + `(${c.type} ${c.name})`); } };
    walk(f, 0); return { name: f.name, id: f._id, size: [Math.round(f.size.x), Math.round(f.size.y)], kids };
  });
}
fs.writeFileSync('pages.json', JSON.stringify(out, null, 1));
for (const [k, v] of Object.entries(out)) { console.log(`\n## ${k} (${v.length})`); for (const f of v.slice(0, 2)) console.log(' *', f.name, f.size.join('x'), '\n   ' + f.kids.slice(0, 14).join('\n   ')); }
