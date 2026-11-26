const fs = require('fs');
const { nodes } = require('./tree');
const hex = (c) => '#' + [c.r, c.g, c.b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('') + (c.a !== undefined && c.a < 1 ? Math.round(c.a * 255).toString(16).padStart(2, '0') : '');
const pageOf = (n) => { while (n && n.type !== 'CANVAS') n = n._parent; return n ? n.name.trim() : '?'; };
const out = { fills: {}, text: {}, effects: {}, vars: {} };
for (const n of nodes.values()) {
  if (!n.styleType || n.styleType === 'NONE') continue;
  const pg = pageOf(n);
  if (n.styleType === 'FILL') {
    const p = (n.fillPaints || []).filter(p => p.visible !== false);
    out.fills[n.name] = p.map(p => p.type === 'SOLID' ? hex({ ...p.color, a: (p.color.a ?? 1) * (p.opacity ?? 1) }) : p.type + ':' + JSON.stringify((p.stops || []).map(s => [hex(s.color), +s.position.toFixed(3)]))).join(' ; ') + '  [' + pg + ']';
  } else if (n.styleType === 'TEXT') {
    out.text[n.name] = { family: n.fontName?.family, style: n.fontName?.style, size: n.fontSize, lh: n.lineHeight, ls: n.letterSpacing, page: pg };
  } else if (n.styleType === 'EFFECT') {
    out.effects[n.name] = (n.effects || []).filter(e => e.visible !== false).map(e => `${e.type} ${e.offset?.x ?? 0} ${e.offset?.y ?? 0} ${e.radius} ${e.spread ?? 0} ${hex(e.color)}`);
  }
}
for (const n of nodes.values()) if (n.type === 'VARIABLE') out.vars[n.name] = JSON.stringify(n.variableDataValues?.entries?.map(e => e.variableData) ?? n.variableData).slice(0, 200);
fs.writeFileSync('tokens.json', JSON.stringify(out, null, 1));
