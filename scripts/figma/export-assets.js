// FIG_FULL=1 node export-assets.js  -> assets-full.json
// Colored SVG export for logos / badges / hand-drawn art / mockup parts, resolving bound styles,
// gradients, instances (walks into masters), text nodes.
const fs = require('fs');
const { nodes, key, msg } = require('./tree');
const blob = (i) => Buffer.from(msg.blobs[i], 'base64');
const R = (v) => +(+v).toFixed(2);
const H2T = JSON.parse(fs.readFileSync(__dirname + '/hex2tok.json', 'utf8'));
function mul(A, B) { return { a: A.a * B.a + A.c * B.b, b: A.b * B.a + A.d * B.b, c: A.a * B.c + A.c * B.d, d: A.b * B.c + A.d * B.d, e: A.a * B.e + A.c * B.f + A.e, f: A.b * B.e + A.d * B.f + A.f }; }
function inv(M) { const det = M.a * M.d - M.b * M.c || 1e-9; return { a: M.d / det, b: -M.b / det, c: -M.c / det, d: M.a / det, e: (M.c * M.f - M.d * M.e) / det, f: (M.b * M.e - M.a * M.f) / det }; }
const I = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
const fromT = (t) => t ? { a: t.m00, b: t.m10, c: t.m01, d: t.m11, e: t.m02, f: t.m12 } : I;
const ap = (M, x, y) => [R(M.a * x + M.c * y + M.e), R(M.b * x + M.d * y + M.f)];
function geomPath(n, which, M) {
  const g = n[which]; if (!g || !g.length) return null; let d = '';
  for (const gg of g) { if (gg.commandsBlob === undefined) continue; const b = blob(gg.commandsBlob); let o = 0; const f = () => { const v = b.readFloatLE(o); o += 4; return v; };
    while (o < b.length) { const c = b[o++]; if (c === 0) d += 'Z'; else if (c === 1) d += 'M' + ap(M, f(), f()).join(' '); else if (c === 2) d += 'L' + ap(M, f(), f()).join(' '); else if (c === 3) { const a = ap(M, f(), f()), e = ap(M, f(), f()); d += `Q${a.join(' ')} ${e.join(' ')}`; } else if (c === 4) { const a = ap(M, f(), f()), bb = ap(M, f(), f()), e = ap(M, f(), f()); d += `C${a.join(' ')} ${bb.join(' ')} ${e.join(' ')}`; } else break; } }
  return d.replace(/ -/g, '-');
}
const keyIdx = new Map(); for (const n of nodes.values()) if (n.key && (n.fillPaints || n.effects)) keyIdx.set(n.key, n);
const styleNode = (ref, prop) => { if (!ref) return null; const g = ref.guid && nodes.get(key(ref.guid)); if (g && g[prop]) return g; const k = ref.assetRef?.key; if (k && keyIdx.has(k) && keyIdx.get(k)[prop]) return keyIdx.get(k); return null; };
const hex6 = (c) => '#' + [c.r, c.g, c.b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
const colorStr = (c) => { const h = hex6(c); const t = H2T[h]; return t ? `var(--color-${t},${h})` : h; };

let defs = []; let gid = 0; let prefix = 'g';
function paintFill(ps, ref, n, M) {
  const sn = styleNode(ref, 'fillPaints'); if (sn) ps = sn.fillPaints;
  const p = (ps || []).filter(p => p.visible !== false && (p.opacity ?? 1) > 0);
  if (!p.length) return null; const t = p[p.length - 1];
  if (t.type === 'SOLID') { const a = (t.color.a ?? 1) * (t.opacity ?? 1); return { fill: colorStr(t.color), op: a }; }
  if (t.type === 'IMAGE') return null;
  if (t.stops && n.size) {
    const id = `${prefix}${gid++}`;
    const G = mul(M, mul({ a: n.size.x, b: 0, c: 0, d: n.size.y, e: 0, f: 0 }, inv(fromT(t.transform))));
    const stops = t.stops.map(s => `<stop offset="${R(s.position)}" stop-color="${colorStr(s.color)}"${(s.color.a ?? 1) < 1 ? ` stop-opacity="${R(s.color.a)}"` : ''}/>`).join('');
    const gt = `gradientUnits="userSpaceOnUse" gradientTransform="matrix(${[G.a, G.b, G.c, G.d, G.e, G.f].map(v => R(v)).join(' ')})"`;
    if (t.type === 'GRADIENT_LINEAR') defs.push(`<linearGradient id="${id}" x1="0" y1="0.5" x2="1" y2="0.5" ${gt}>${stops}</linearGradient>`);
    else defs.push(`<radialGradient id="${id}" cx="0.5" cy="0.5" r="0.5" ${gt}>${stops}</radialGradient>`);
    return { fill: `url(#${id})`, op: t.opacity ?? 1 };
  }
  return null;
}
const SHAPES = /^(VECTOR|ELLIPSE|ROUNDED_RECTANGLE|RECTANGLE|LINE|STAR|REGULAR_POLYGON|BOOLEAN_OPERATION)$/;
const opa = (o) => o < 0.999 ? ` opacity="${R(o)}"` : '';
function svgOf(sym) {
  defs = []; gid = 0; const parts = [];
  const walk = (n, M, op, ov, isRoot) => {
    const blur = !isRoot && n.visible !== false && (n.effects || []).find(e => e.visible !== false && e.type === 'FOREGROUND_BLUR');
    if (!blur) return walk0(n, M, op, ov, isRoot);
    const fid = `${prefix}f${gid++}`; defs.push(`<filter id="${fid}" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="${R(blur.radius / 4.5)}"/></filter>`);
    parts.push(`<g filter="url(#${fid})">`); walk0(n, M, op, ov, isRoot); parts.push('</g>');
  };
  const walk0 = (n, M, op, ov, isRoot) => {
    if (n.visible === false) return;
    const o = ov.get(n._id) || {}; const nn = { ...n, ...o };
    if (nn.visible === false) return;
    if (nn.mask) return;
    const T = isRoot ? I : mul(M, fromT(n.transform));
    const myOp = op * (isRoot ? 1 : (nn.opacity ?? 1));
    if (!isRoot && SHAPES.test(n.type)) {
      const fp = paintFill(nn.fillPaints, nn.styleIdForFill, nn, T);
      if (fp) { const d = geomPath(n, 'fillGeometry', T); if (d) parts.push(`<path d="${d}" fill="${fp.fill}"${opa(myOp * fp.op)}${n.fillGeometry?.[0]?.windingRule === 'ODD' ? ' fill-rule="evenodd"' : ''}/>`); }
      if (nn.strokeWeight > 0) { const sp = paintFill(nn.strokePaints, nn.styleIdForStrokeFill, nn, T); if (sp) { const d = geomPath(n, 'strokeGeometry', T); if (d) parts.push(`<path d="${d}" fill="${sp.fill}"${opa(myOp * sp.op)}/>`); } }
      return;
    }
    if (n.type === 'TEXT') {
      const fp = paintFill(nn.fillPaints, nn.styleIdForFill, nn, T) || { fill: '#000', op: 1 };
      const txt = (nn.textData?.characters || '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
      const fs_ = nn.fontSize || 14; const lh = nn.lineHeight?.units === 'PIXELS' ? nn.lineHeight.value : fs_ * 1.2;
      const st = nn.fontName?.style || 'Regular'; const w = /Black/.test(st) ? 900 : /Extra ?Bold/.test(st) ? 800 : /Semi ?Bold/.test(st) ? 600 : /Bold/.test(st) ? 700 : /Medium/.test(st) ? 500 : /Light/.test(st) ? 300 : 400;
      const al = nn.textAlignHorizontal; const xx = al === 'CENTER' ? n.size.x / 2 : al === 'RIGHT' ? n.size.x : 0;
      const [x, y] = ap(T, xx, (lh - fs_) / 2 + fs_ * 0.8);
      parts.push(`<text x="${x}" y="${y}" font-family="${nn.fontName?.family || 'Inter'}" font-weight="${w}" font-size="${fs_}"${al === 'CENTER' ? ' text-anchor="middle"' : al === 'RIGHT' ? ' text-anchor="end"' : ''}${nn.letterSpacing?.value ? ` letter-spacing="${R(nn.letterSpacing.units === 'PERCENT' ? nn.letterSpacing.value * fs_ / 100 : nn.letterSpacing.value)}"` : ''} fill="${fp.fill}"${opa(myOp * fp.op)}>${txt}</text>`);
      return;
    }
    if (!isRoot && /^(FRAME|SYMBOL|INSTANCE)$/.test(n.type) && n.size) {
      const fp = paintFill(nn.fillPaints, nn.styleIdForFill, nn, T);
      const r = nn.cornerRadius || 0; const [x, y] = ap(T, 0, 0);
      const rot = Math.abs(T.b) > 1e-3 ? ` transform="matrix(${[T.a, T.b, T.c, T.d, T.e, T.f].map(R).join(' ')})"` : '';
      const xy = rot ? 'x="0" y="0"' : `x="${x}" y="${y}"`;
      if (fp) parts.push(`<rect ${xy} width="${R(n.size.x)}" height="${R(n.size.y)}" rx="${R(r)}" fill="${fp.fill}"${opa(myOp * fp.op)}${rot}/>`);
      if (nn.strokeWeight > 0) { const sp = paintFill(nn.strokePaints, nn.styleIdForStrokeFill, nn, T); if (sp) { const sw = nn.strokeWeight; const ins = nn.strokeAlign === 'OUTSIDE' ? -sw / 2 : nn.strokeAlign === 'CENTER' ? 0 : sw / 2; const [x2, y2] = ap(T, ins, ins); parts.push(`<rect x="${rot ? ins : x2}" y="${rot ? ins : y2}" width="${R(n.size.x - 2 * ins)}" height="${R(n.size.y - 2 * ins)}" rx="${R(Math.max(0, r - ins))}" fill="none" stroke="${sp.fill}" stroke-width="${sw}"${opa(myOp * sp.op)}${rot}/>`); } }
    }
    let kids = n._children; let ov2 = ov;
    if (n.type === 'INSTANCE') {
      const m = nodes.get(key(n.symbolData?.symbolID));
      if (m) {
        kids = m._children; ov2 = new Map(ov);
        for (const so of n.symbolData?.symbolOverrides || []) { const gp = so.guidPath?.guids; if (!gp?.length) continue; const id = key(gp[gp.length - 1]); const { guidPath, ...rest } = so; ov2.set(id, { ...(ov2.get(id) || {}), ...rest }); }
        if (m.size && n.size && (Math.abs(m.size.x - n.size.x) > 0.5 || Math.abs(m.size.y - n.size.y) > 0.5)) {
          const S = { a: n.size.x / m.size.x, b: 0, c: 0, d: n.size.y / m.size.y, e: 0, f: 0 };
          for (const c of kids) walk(c, mul(T, S), myOp, ov2, false); return;
        }
      }
    }
    for (const c of kids) walk(c, T, myOp, ov2, false);
  };
  walk(sym, I, 1, new Map(), true);
  const fp = paintFill(sym.fillPaints, sym.styleIdForFill, sym, I);
  const bg = fp ? `<rect width="${R(sym.size.x)}" height="${R(sym.size.y)}" rx="${R(sym.cornerRadius || 0)}" fill="${fp.fill}"${opa(fp.op)}/>` : '';
  let bd = '';
  if (sym.strokeWeight > 0) { const sp = paintFill(sym.strokePaints, sym.styleIdForStrokeFill, sym, I); if (sp) { const sw = sym.strokeWeight; const ins = sym.strokeAlign === 'OUTSIDE' ? -sw / 2 : sym.strokeAlign === 'CENTER' ? 0 : sw / 2; bd = `<rect x="${ins}" y="${ins}" width="${R(sym.size.x - 2 * ins)}" height="${R(sym.size.y - 2 * ins)}" rx="${R(Math.max(0, (sym.cornerRadius || 0) - ins))}" fill="none" stroke="${sp.fill}" stroke-width="${sw}"${opa(sp.op)}/>`; } }
  return { w: R(sym.size.x), h: R(sym.size.y), op: sym.opacity ?? 1, body: (defs.length ? `<defs>${defs.join('')}</defs>` : '') + bg + parts.join('') + bd };
}
module.exports = { svgOf };
if (require.main === module) {
  const SETS = ['Fictional company logo', 'Press logo', 'Logomark', 'Logo', 'Mobile app store badge', 'Hand-drawn arrow', 'Hand-drawn underlines', 'Hand-drawn accents', 'Hand-drawn pen scribble', 'Hand-drawn line', 'Line pattern', 'Credit card mockup', '_Play button', 'Video player', '_Video progress', 'iPhone mockup', '_iPhone mockup status bar', 'Macbook Pro mockup', '_WYSIWYG editor icon', 'WYSIWYG toolbar', 'WYSIWYG tooltip', 'Background pattern decorative'];
  const out = {}; const raw = {};
  for (const name of SETS) {
    const sets = [...nodes.values()].filter(n => (n.isStateGroup || n.type === 'SYMBOL') && n.name === name && !(n.type === 'SYMBOL' && n._parent?.isStateGroup));
    if (!sets.length) { console.log('MISSING', name); continue; }
    const set = sets[0]; const vs = set.isStateGroup ? set._children.filter(c => c.type === 'SYMBOL') : [set];
    out[name] = {};
    for (const v of vs) { prefix = 'g' + Math.random().toString(36).slice(2, 6); try { out[name][v.name] = svgOf(v); } catch (e) { console.log('ERR', name, v.name, e.message); } }
    console.log(name, vs.length, Math.round(JSON.stringify(out[name]).length / 1024) + 'KB');
  }
  // raw gradient / layout info for background masks and patterns
  for (const name of ['_Background mask', 'Background overlay', 'Background pattern']) {
    const set = [...nodes.values()].find(n => n.isStateGroup && n.name === name); if (!set) continue;
    raw[name] = {};
    for (const v of set._children.filter(c => c.type === 'SYMBOL')) {
      const info = []; const w = (n, d) => { if (d > 4) return; const fp = (n.fillPaints || []).filter(p => p.visible !== false); if (fp.length || n.type !== 'FRAME') info.push({ d, name: n.name, type: n.type, size: n.size, t: n.transform && [n.transform.m02, n.transform.m12], op: n.opacity, fills: fp.map(p => ({ type: p.type, color: p.color && hex6(p.color), opacity: p.opacity, transform: p.transform, stops: p.stops?.map(s => [s.position, hex6(s.color), s.color.a]) })) }); n._children.forEach(c => w(c, d + 1)); };
      w(v, 0); raw[name][v.name] = info;
    }
  }
  fs.writeFileSync('assets-full.json', JSON.stringify(out));
  fs.writeFileSync('assets-raw.json', JSON.stringify(raw));
}
