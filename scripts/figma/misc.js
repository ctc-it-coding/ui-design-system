const fs = require('fs');
const { nodes } = require('./tree');
const { coloredSvg } = require('./icons');
const page = [...nodes.values()].find(n => n.type === 'CANVAS' && n.name.includes('↳ Misc icons'));
const out = {};
const walk = (n, setName) => {
  if (n.isStateGroup) { for (const c of n._children) if (c.type === 'SYMBOL') (out[n.name] ||= {})[c.name] = coloredSvg(c); return; }
  if (n.type === 'SYMBOL') { (out['_singles'] ||= {})[n.name] = coloredSvg(n); return; }
  n._children.forEach(c => walk(c));
};
walk(page);
fs.writeFileSync('misc-icons.json', JSON.stringify(out));
for (const [k, v] of Object.entries(out)) console.log(k, Object.keys(v).length, Object.keys(v).slice(0, 4).join(' | '));
