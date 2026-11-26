// Minimal kiwi decoder for Figma .fig canvas files
const fs = require('fs');
const zlib = require('zlib');

class BB {
  constructor(buf) { this.b = buf; this.i = 0; }
  byte() { return this.b[this.i++]; }
  bool() { return this.byte() !== 0; }
  vu() { let v = 0, s = 0, c; do { c = this.byte(); v |= (c & 127) << s; s += 7; } while (c & 128 && s < 35); return v >>> 0; }
  vi() { const v = this.vu(); return (v & 1) ? ~(v >>> 1) : (v >>> 1); }
  vu64() { let v = 0n, s = 0n, c; do { c = this.byte(); v |= BigInt(c & 127) << s; s += 7n; } while (c & 128 && s < 70n); return v; }
  vi64() { const v = this.vu64(); return (v & 1n) ? ~(v >> 1n) : (v >> 1n); }
  float() {
    const first = this.byte(); if (first === 0) return 0;
    let bits = first | (this.byte() << 8) | (this.byte() << 16) | (this.byte() << 24);
    bits = (bits << 23) | (bits >>> 9);
    const dv = new DataView(new ArrayBuffer(4)); dv.setInt32(0, bits); return dv.getFloat32(0);
  }
  str() { const st = this.i; while (this.b[this.i] !== 0) this.i++; const s = this.b.toString('utf8', st, this.i); this.i++; return s; }
  bytes() { const n = this.vu(); const r = this.b.subarray(this.i, this.i + n); this.i += n; return r; }
}

const BUILTIN = { [-1]: 'bool', [-2]: 'byte', [-3]: 'int', [-4]: 'uint', [-5]: 'float', [-6]: 'string', [-7]: 'int64', [-8]: 'uint64' };

function readSchema(buf) {
  const bb = new BB(buf); const n = bb.vu(); const defs = [];
  for (let i = 0; i < n; i++) {
    const name = bb.str(); const kind = ['ENUM', 'STRUCT', 'MESSAGE'][bb.byte()]; const fc = bb.vu(); const fields = [];
    for (let j = 0; j < fc; j++) { const fname = bb.str(); const t = bb.vi(); const isArray = bb.byte() & 1; const value = bb.vu(); fields.push({ name: fname, t, isArray, value }); }
    defs.push({ name, kind, fields });
  }
  for (const d of defs) for (const f of d.fields) f.type = f.t < 0 ? BUILTIN[f.t] : defs[f.t].name;
  const byName = {}; for (const d of defs) { byName[d.name] = d; if (d.kind !== 'STRUCT') { d.byValue = {}; for (const f of d.fields) d.byValue[f.value] = f; } }
  return byName;
}

function decode(schema, bb, typeName) {
  const read1 = (type) => {
    switch (type) {
      case 'bool': return bb.bool(); case 'byte': return bb.byte(); case 'int': return bb.vi(); case 'uint': return bb.vu();
      case 'float': return bb.float(); case 'string': return bb.str(); case 'int64': return Number(bb.vi64()); case 'uint64': return Number(bb.vu64());
      default: return decode(schema, bb, type);
    }
  };
  const readField = (f) => {
    if (f.isArray) {
      if (f.type === 'byte') return Array.from(bb.bytes());
      const n = bb.vu(); const a = new Array(n); for (let i = 0; i < n; i++) a[i] = read1(f.type); return a;
    }
    return read1(f.type);
  };
  const d = schema[typeName];
  if (d.kind === 'ENUM') { const v = bb.vu(); return d.byValue[v] ? d.byValue[v].name : v; }
  const o = {};
  if (d.kind === 'STRUCT') { for (const f of d.fields) o[f.name] = readField(f); return o; }
  while (true) { const id = bb.vu(); if (id === 0) return o; const f = d.byValue[id]; if (!f) throw new Error('bad field ' + id + ' in ' + typeName + ' @' + bb.i); o[f.name] = readField(f); }
}

const file = fs.readFileSync(process.argv[2]);
let off = 12; const chunks = [];
while (off < file.length) { const n = file.readUInt32LE(off); chunks.push(file.subarray(off + 4, off + 4 + n)); off += 4 + n; }
const unz = (c) => (c[0] === 0x28 && c[1] === 0xb5) ? zlib.zstdDecompressSync(c) : zlib.inflateRawSync(c);
const schema = readSchema(unz(chunks[0]));
const data = unz(chunks[1]);
const msg = decode(schema, new BB(data), 'Message');
console.error('nodes', msg.nodeChanges.length, 'blobs', (msg.blobs || []).length);
if (msg.blobs) msg.blobs = msg.blobs.map(b => Buffer.from(b.bytes).toString("base64"));
fs.writeFileSync(process.argv[3], JSON.stringify(msg));
