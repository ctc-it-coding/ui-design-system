const fs = require('fs');
const { nodes, msg } = require('./tree');
const blob = (i) => Buffer.from(msg.blobs[i], 'base64');
const R = (v) => +v.toFixed(3);

function mul(A, B) { // affine 2x3 {a,b,c,d,e,f}: x' = a x + c y + e ; y' = b x + d y + f
  return { a: A.a * B.a + A.c * B.b, b: A.b * B.a + A.d * B.b, c: A.a * B.c + A.c * B.d, d: A.b * B.c + A.d * B.d, e: A.a * B.e + A.c * B.f + A.e, f: A.b * B.e + A.d * B.f + A.f };
}
const fromT = (t) => t ? { a: t.m00, b: t.m10, c: t.m01, d: t.m11, e: t.m02, f: t.m12 } : { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
const ap = (M, x, y) => [R(M.a * x + M.c * y + M.e), R(M.b * x + M.d * y + M.f)];

function vnPath(n, M) {
  const vd = n.vectorData; if (!vd || vd.vectorNetworkBlob === undefined) return null;
  const b = blob(vd.vectorNetworkBlob);
  const sx = n.size.x / (vd.normalizedSize?.x || n.size.x || 1), sy = n.size.y / (vd.normalizedSize?.y || n.size.y || 1);
  let o = 0; const u32 = () => { const v = b.readUInt32LE(o); o += 4; return v; }; const f32 = () => { const v = b.readFloatLE(o); o += 4; return v; };
  const nv = u32(), ns = u32(), nr = u32();
  const V = []; for (let i = 0; i < nv; i++) { u32(); V.push([f32() * sx, f32() * sy]); }
  const S = []; for (let i = 0; i < ns; i++) { u32(); const a = u32(), ax = f32() * sx, ay = f32() * sy, e = u32(), ex = f32() * sx, ey = f32() * sy; S.push({ a, ax, ay, e, ex, ey }); }
  const regions = [];
  for (let i = 0; i < nr; i++) { u32(); const lc = u32() ; const loops = []; for (let j = 0; j < (lc & 0x7fffffff) ; j++) { const c = u32(); const idx = []; for (let k = 0; k < c; k++) idx.push(u32()); loops.push(idx); } regions.push(loops); }
  const segD = (s, first) => {
    const [x0, y0] = V[s.a], [x1, y1] = V[s.e];
    let d = first ? `M${ap(M, x0, y0).join(' ')}` : '';
    if (!s.ax && !s.ay && !s.ex && !s.ey) d += `L${ap(M, x1, y1).join(' ')}`;
    else d += `C${ap(M, x0 + s.ax, y0 + s.ay).join(' ')} ${ap(M, x1 + s.ex, y1 + s.ey).join(' ')} ${ap(M, x1, y1).join(' ')}`;
    return d;
  };
  // open network: chain segments
  let d = ''; let prevEnd = null; let start = null;
  const used = new Array(S.length).fill(false);
  // greedy chaining: follow connected segments (reversing when needed)
  for (let i = 0; i < S.length; i++) {
    if (used[i]) continue; used[i] = true; let s = S[i]; start = s.a; d += segD(s, true); prevEnd = s.e;
    while (true) {
      let j = S.findIndex((t, k) => !used[k] && (t.a === prevEnd || t.e === prevEnd));
      if (j < 0) break; used[j] = true; let t = S[j];
      if (t.a !== prevEnd) t = { a: t.e, ax: t.ex, ay: t.ey, e: t.a, ex: t.ax, ey: t.ay };
      d += segD(t, false); prevEnd = t.e; if (prevEnd === start) { d += 'Z'; break; }
    }
  }
  return { d, closed: false };
}
function geomPath(n, which, M) { // decode commandsBlob
  const g = n[which]; if (!g || !g.length) return null; let d = '';
  for (const gg of g) { const b = blob(gg.commandsBlob); let o = 0; const f = () => { const v = b.readFloatLE(o); o += 4; return v; };
    while (o < b.length) { const c = b[o++]; if (c === 0) { d += 'Z'; } else if (c === 1) { d += 'M' + ap(M, f(), f()).join(' '); } else if (c === 2) { d += 'L' + ap(M, f(), f()).join(' '); } else if (c === 3) { const a = ap(M, f(), f()), e = ap(M, f(), f()); d += `Q${a.join(' ')} ${e.join(' ')}`; } else if (c === 4) { const a = ap(M, f(), f()), bb = ap(M, f(), f()), e = ap(M, f(), f()); d += `C${a.join(' ')} ${bb.join(' ')} ${e.join(' ')}`; } else break; } }
  return d;
}
const vis = (ps) => (ps || []).some(p => p.visible !== false && (p.opacity ?? 1) > 0);
function iconSvg(sym) {
  const parts = [];
  const walk = (n, M) => {
    if (n.visible === false) return;
    const T = n === sym ? { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 } : mul(M, fromT(n.transform));
    if (n !== sym && (n.type === 'VECTOR' || n.type === 'ELLIPSE' || n.type === 'ROUNDED_RECTANGLE' || n.type === 'RECTANGLE' || n.type === 'LINE' || n.type === 'STAR' || n.type === 'REGULAR_POLYGON' || n.type === 'BOOLEAN_OPERATION')) {
      const stroke = vis(n.strokePaints) && n.strokeWeight > 0; const fill = vis(n.fillPaints);
      const op = n.opacity !== undefined && n.opacity < 1 ? ` opacity="${R(n.opacity)}"` : '';
      if (n.type === 'VECTOR' && stroke && !fill) { const p = vnPath(n, T); if (p) { parts.push(`<path d="${p.d}" stroke="currentColor" stroke-width="${n.strokeWeight}" stroke-linecap="${(n.strokeCap || 'NONE') === 'ROUND' ? 'round' : (n.strokeCap === 'SQUARE' ? 'square' : 'butt')}" stroke-linejoin="${(n.strokeJoin || 'MITER').toLowerCase()}"${op}/>`); return; } }
      if (fill) { const d = geomPath(n, 'fillGeometry', T); if (d) parts.push(`<path d="${d}" fill="currentColor"${op}/>`); }
      if (stroke) { const d = geomPath(n, 'strokeGeometry', T); if (d) parts.push(`<path d="${d}" fill="currentColor"${op}/>`); }
      return;
    }
    for (const c of n._children) walk(c, T);
  };
  walk(sym, null);
  return parts.join('');
}
module.exports = { iconSvg };
if (require.main === module) {
  const page = [...nodes.values()].find(n => n.type === 'CANVAS' && n.name.includes('↳ Icons'));
  const icons = {}; const cats = {};
  for (const cat of page._children) {
    if (/Design system|Notes/.test(cat.name)) continue;
    const walk = (n) => { if (n.type === 'SYMBOL') { if (n.size.x === 24) { icons[n.name] = iconSvg(n); (cats[cat.name] ||= []).push(n.name); } return; } n._children.forEach(walk); };
    walk(cat);
  }
  fs.writeFileSync('icons.json', JSON.stringify({ icons, cats }));
  console.log(Object.keys(icons).length, 'icons', Object.entries(cats).map(([k, v]) => k + ':' + v.length).join(', '));
  const empty = Object.entries(icons).filter(([k, v]) => !v); console.log('empty', empty.length, empty.slice(0, 10).map(e => e[0]));
}

// ---- colored export (keeps original fills/strokes), for logos / flags / file-type icons
const hx = (c, o = 1) => { const a = (c.a ?? 1) * o; return '#' + [c.r, c.g, c.b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('') + (a < 0.999 ? Math.round(a * 255).toString(16).padStart(2, '0') : ''); };
function paintColor(ps) { const p = (ps || []).filter(p => p.visible !== false); if (!p.length) return null; const t = p[p.length - 1]; if (t.type === 'SOLID') return hx(t.color, t.opacity ?? 1); if (t.stops) return hx(t.stops[0].color, t.opacity ?? 1); return null; }
function coloredSvg(sym) {
  const parts = [];
  const walk = (n, M, clip) => {
    if (n.visible === false) return;
    const T = n === sym ? { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 } : mul(M, fromT(n.transform));
    const op = n.opacity !== undefined && n.opacity < 1 ? ` opacity="${R(n.opacity)}"` : '';
    if (n !== sym && /^(VECTOR|ELLIPSE|ROUNDED_RECTANGLE|RECTANGLE|LINE|STAR|REGULAR_POLYGON|BOOLEAN_OPERATION)$/.test(n.type)) {
      const fc = paintColor(n.fillPaints); const sc = n.strokeWeight > 0 ? paintColor(n.strokePaints) : null;
      if (fc) { const d = geomPath(n, 'fillGeometry', T); if (d) parts.push(`<path d="${d}" fill="${fc}"${op}${n.fillGeometry?.[0]?.windingRule === 'ODD' ? ' fill-rule="evenodd"' : ''}/>`); }
      if (sc) { const d = geomPath(n, 'strokeGeometry', T); if (d) parts.push(`<path d="${d}" fill="${sc}"${op}/>`); }
      return;
    }
    if (n !== sym && (n.type === 'FRAME' || n.type === 'SYMBOL' || n.type === 'INSTANCE')) {
      const fc = paintColor(n.fillPaints);
      if (fc && n.size) { const [x, y] = ap(T, 0, 0); const r = n.cornerRadius || 0; parts.push(`<rect x="${x}" y="${y}" width="${R(n.size.x)}" height="${R(n.size.y)}" rx="${r}" fill="${fc}"${op}/>`); }
    }
    for (const c of n._children) walk(c, T);
  };
  const fc = paintColor(sym.fillPaints); if (fc) parts.push(`<rect width="${R(sym.size.x)}" height="${R(sym.size.y)}" rx="${sym.cornerRadius || 0}" fill="${fc}"/>`);
  walk(sym, null);
  return { w: R(sym.size.x), h: R(sym.size.y), body: parts.join('') };
}
module.exports.coloredSvg = coloredSvg;
module.exports.iconSvg = iconSvg;
