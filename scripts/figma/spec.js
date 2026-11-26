// Dump compact specs for a component set / symbol by name
const fs = require('fs');
const { nodes, key } = require('./tree');
const hex = (c) => '#' + [c.r, c.g, c.b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('') + (c.a !== undefined && c.a < 0.999 ? Math.round(c.a * 255).toString(16).padStart(2, '0') : '');
const styleNames = new Map();
for (const n of nodes.values()) if (n.styleType && n.styleType !== 'NONE' && n.key) styleNames.set(n.key, n.name);
const sname = (ref) => { if (!ref) return null; const k = ref.assetRef?.key; if (k && styleNames.has(k)) return styleNames.get(k); const g = ref.guid && nodes.get(key(ref.guid)); return g ? g.name : null; };
const H2T = JSON.parse(fs.readFileSync(__dirname + '/hex2tok.json', 'utf8'));
const tok = (h) => { const base = h.slice(0, 7), a = h.slice(7); const t = H2T[base]; return t ? t + (a ? '/' + Math.round(parseInt(a, 16) / 2.55) + '%' : '') : h; };
const styleNode = (ref, prop) => { if (!ref) return null; const g = ref.guid && nodes.get(key(ref.guid)); if (g && g[prop]) return g; const k = ref.assetRef?.key; if (k) { for (const n of nodes.values()) if (n.key === k && n[prop]) return n; } return null; };
const paint = (ps, ref) => { const sn = styleNode(ref, 'fillPaints'); if (sn) ps = sn.fillPaints; const nm = sname(ref); const v = (ps || []).filter(p => p.visible !== false).map(p => p.type === 'SOLID' ? tok(hex({ ...p.color, a: (p.color.a ?? 1) * (p.opacity ?? 1) })) : p.type.replace('GRADIENT_', 'grad-')).join('+'); return v || null; };
const r = (x) => Math.round(x * 10) / 10;
function line(n) {
  const a = [];
  if (n.size) a.push(`${r(n.size.x)}x${r(n.size.y)}`);
  if (n.stackMode && n.stackMode !== 'NONE') {
    const pl = n.stackHorizontalPadding ?? 0, pt = n.stackVerticalPadding ?? 0, pr = n.stackPaddingRight ?? pl, pb = n.stackPaddingBottom ?? pt;
    a.push(`${n.stackMode === 'HORIZONTAL' ? 'row' : 'col'} gap${r(n.stackSpacing ?? 0)} p[${r(pt)},${r(pr)},${r(pb)},${r(pl)}]` + (n.stackPrimaryAlignItems ? ` main:${n.stackPrimaryAlignItems}` : '') + (n.stackCounterAlignItems ? ` cross:${n.stackCounterAlignItems}` : ''));
  }
  if (n.stackChildPrimaryGrow) a.push('grow');
  if (n.stackChildAlignSelf === 'STRETCH') a.push('stretch');
  if (n.stackPositioning === 'ABSOLUTE') a.push(`abs@${r(n.transform?.m02)},${r(n.transform?.m12)}`);
  const rad = n.rectangleCornerRadiiIndependent ? [n.rectangleTopLeftCornerRadius, n.rectangleTopRightCornerRadius, n.rectangleBottomRightCornerRadius, n.rectangleBottomLeftCornerRadius].map(r).join('/') : n.cornerRadius;
  if (rad) a.push(`r${rad}`);
  const f = paint(n.fillPaints, n.styleIdForFill); if (f && n.type !== 'TEXT') a.push(`bg:${f}`);
  const s = paint(n.strokePaints, n.styleIdForStrokeFill); if (s && n.strokeWeight) a.push(`border:${r(n.strokeWeight)}${n.strokeAlign ? '/' + n.strokeAlign.toLowerCase() : ''} ${s}` + (n.borderStrokeWeightsIndependent ? ` [t${n.borderTopWeight} r${n.borderRightWeight} b${n.borderBottomWeight} l${n.borderLeftWeight}]` : ''));
  const esn = styleNode(n.styleIdForEffect, 'effects'); const ef = ((esn ? esn.effects : n.effects) || []).filter(e => e.visible !== false); if (ef.length) a.push('fx:' + ((ef.map(e => `${e.type[0]}${e.offset?.x ?? 0},${e.offset?.y ?? 0},${e.radius},${e.spread ?? 0} ${tok(hex(e.color))}`).join(' | '))));
  if (n.opacity !== undefined && n.opacity < 1) a.push(`op${r(n.opacity)}`);
  if (n.visible === false) a.push('HIDDEN');
  if (n.type === 'TEXT') {
    const ts = '';
    a.push(`text "${(n.textData?.characters || '').slice(0, 60).replace(/\n/g, '⏎')}" ${ts || ''} ${n.fontName?.style} ${n.fontSize}/${n.lineHeight?.value}${n.lineHeight?.units === 'PERCENT' ? '%' : ''} ${paint(n.fillPaints, n.styleIdForFill)}` + (n.textAlignHorizontal && n.textAlignHorizontal !== 'LEFT' ? ` align:${n.textAlignHorizontal}` : ''));
  }
  if (n.type === 'INSTANCE') { const m = nodes.get(key(n.symbolData?.symbolID)); a.push(`→ ${m ? (m._parent?.isStateGroup ? m._parent.name + ' {' + m.name + '}' : m.name) : '?'}`); }
  return a.join(' ');
}
function dump(n, depth, maxDepth, outArr) {
  outArr.push('  '.repeat(depth) + `${n.type === 'INSTANCE' ? '◇' : n.type === 'TEXT' ? 'T' : n.type[0]} ${n.name}: ` + line(n));
  if (depth >= maxDepth || n.type === 'INSTANCE') return;
  for (const c of n._children) dump(c, depth + 1, maxDepth, outArr);
}
module.exports = { dump, line, nodes };
if (require.main === module) {
  const [name, filter, maxDepth = '6', limit = '400'] = process.argv.slice(2);
  // `--id <nodeId>` dumps any node (e.g. an example page frame from pages.json) instead of a component set
  const sets = name === '--id' ? [nodes.get(filter)].filter(Boolean) : [...nodes.values()].filter(n => (n.isStateGroup || n.type === 'SYMBOL') && n.name === name);
  if (name === '--id') { const out = []; dump(sets[0], 0, +maxDepth, out); console.log(out.slice(0, +limit).join('\n')); process.exit(0); }
  const out = [];
  for (const set of sets) {
    const vs = set.isStateGroup ? set._children.filter(c => c.type === 'SYMBOL') : [set];
    for (const v of vs) { if (filter && !new RegExp(filter).test(v.name)) continue; out.push(`\n=== ${v.name}`); dump(v, 0, +maxDepth, out); }
  }
  console.log(out.join('\n').split('\n').slice(0, +limit).join('\n'));
}
