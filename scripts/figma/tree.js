const fs = require('fs');
const msg = JSON.parse(fs.readFileSync(__dirname + '/' + (process.env.FIG_FULL ? 'doc.json' : 'doc-slim.json'), 'utf8'));
const key = (g) => g ? `${g.sessionID}:${g.localID}` : null;
const nodes = new Map();
for (const n of msg.nodeChanges) { n._id = key(n.guid); n._children = []; nodes.set(n._id, n); }
for (const n of msg.nodeChanges) { const p = n.parentIndex && nodes.get(key(n.parentIndex.guid)); if (p) { n._parent = p; p._children.push(n); } }
for (const n of nodes.values()) n._children.sort((a, b) => (a.parentIndex.position < b.parentIndex.position ? -1 : 1));
module.exports = { msg, nodes, key };
if (require.main === module) {
  const doc = [...nodes.values()].find(n => n.type === 'DOCUMENT');
  const types = {}; for (const n of nodes.values()) types[n.type] = (types[n.type] || 0) + 1;
  console.log(types);
  for (const page of doc._children) {
    console.log('PAGE', page.name, page._children.length);
    for (const f of page._children) {
      const cs = []; const walk = (n) => { if (n.type === 'SYMBOL' || n.isStateGroup) cs.push(n); for (const c of n._children) walk(c); };
      walk(f);
      console.log('  ', f.type, JSON.stringify(f.name), f.size && `${Math.round(f.size.x)}x${Math.round(f.size.y)}`, 'symbols:', cs.length);
    }
  }
  // styles
  const styles = [...nodes.values()].filter(n => n.styleType && n.styleType !== 'NONE');
  console.log('STYLES', styles.length); const st = {}; for (const s of styles) (st[s.styleType] ||= []).push(s.name); for (const k in st) console.log(k, st[k].length, st[k].slice(0, 400).join(' | '));
  const vars = [...nodes.values()].filter(n => n.type === 'VARIABLE'); console.log('VARS', vars.length, vars.slice(0, 50).map(v => v.name).join(' | '));
}
