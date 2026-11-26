import json,re
d=json.load(open('/home/claude/figparse/icons.json'))
icons,cats=d['icons'],d['cats']
def pascal(n):
  p=''.join(w[:1].upper()+w[1:] for w in re.split(r'[^A-Za-z0-9]+',n) if w)
  if p[0].isdigit(): p='I'+p
  return p
seen={}
out=['/* Generated from the Figma "Icons" page — 1 icon = 24x24, 2px stroke, currentColor. Do not edit by hand. */',
     "import { createIcon } from './createIcon';",'']
meta=[]
for cat,names in cats.items():
  out.append(f'// ── {cat}')
  for n in names:
    p=pascal(n)
    if p in seen: p=p+'Alt'
    seen[p]=n
    body=icons[n].replace('"',"'")
    out.append(f'export const {p} = /*#__PURE__*/ createIcon("{p}", "{body}");')
    meta.append({'name':p,'figma':n,'category':cat})
open('src/icons/icons.generated.ts','w').write('\n'.join(out)+'\n')
open('src/icons/meta.generated.ts','w').write('/* Generated. */\nexport const iconMeta = '+json.dumps(meta)+' as const;\n')
print(len(seen))
