# Figma extraction tools

Node scripts that read the Figma `.fig` export directly (no Figma API needed).

1. Unzip the `.fig` file → `canvas.fig`.
2. `node --max-old-space-size=8000 decode.js canvas.fig doc.json` — decodes the kiwi binary (Node ≥ 22 for zstd).
3. `node slim.js` → `doc-slim.json` (fast, small copy for spec dumps).
4. `node inventory.js` — list of pages / component sets / variant properties.
5. `node spec.js "<Component set>" "<variant regex>" <depth> <lines>` — layout/color spec of variants
   (colors resolved through the bound Figma styles; needs `hex2tok.json` generated from the theme palette).
6. `FIG_FULL=1 node icons.js` + `python3 genicons.py` — regenerate `src/icons/icons.generated.ts`.

Paths inside the scripts point at the working folder used during conversion; adjust them for your machine.
7. `node pages.js` → `pages.json` (composition of every example page), then `node genpages.js <out dir>` regenerates `src/pages/marketing/*`.
8. `node spec.js --id "<node id>" "" <depth> <lines>` dumps any frame (used for the dashboard / settings / informational pages).
