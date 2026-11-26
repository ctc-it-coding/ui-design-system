// Generates src/pages/marketing/*.tsx from the Figma example pages (pages.json).
const fs = require('fs');
const path = require('path');
const pages = require('./pages.json');
const OUT = process.argv[2] || '/home/claude/tinicorn-ui/src/pages/marketing';
fs.mkdirSync(OUT, { recursive: true });

const kebab = (s) => s.trim().toLowerCase().replace(/^primary dark$/, 'brand').replace(/hortizontal/g, 'horizontal').replace(/–/g, '-').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// Figma set → [component, import source, prop mapping]
const map = {
  'Dropdown header navigation': ['MarketingHeaderNav', 'marketing', (p) => ({ variant: 'dropdown', type: p.Type })],
  'Full-width header navigation': ['MarketingHeaderNav', 'marketing', (p) => ({ variant: 'full-width', type: p.Type })],
  Banner: ['MarketingBanner', 'marketing', (p) => ({ type: p.Type, theme: p.Theme, size: p.Size })],
  '–––– Section divider ––––': ['SectionDivider', 'marketing', () => ({})],
  'Hero header section': ['HeroHeaderSection', 'marketing', (p) => ({ type: p.Type, theme: p.Theme })],
  'Header section': ['HeaderSection', 'marketing', (p) => ({ alignment: p.Alignment, actions: p.Actions, color: p.Color })],
  'Features section': ['FeaturesSection', 'marketing', (p) => ({ type: p.Type, theme: p.Theme })],
  'Metrics section': ['MetricsSection', 'marketing', (p) => ({ type: p.Type, theme: p.Theme })],
  'Metric item': null,
  'Social proof section': ['SocialProofSection', 'marketing', (p) => ({ type: p.Type, theme: p.Theme })],
  'Press mentions section': ['PressMentionsSection', 'marketing', (p) => ({ theme: p.Theme })],
  'Pricing section': ['PricingSection', 'marketing', (p) => ({ type: p.Type })],
  'Pricing page header': ['PricingPageHeader', 'marketing', (p) => ({ type: p.Type })],
  'CTA section': ['CTASection', 'marketing', (p) => ({ type: p.Type, theme: p.Theme })],
  'Newsletter CTA section': ['NewsletterCTASection', 'marketing', (p) => ({ type: p.Type, theme: p.Theme })],
  'Testimonial section': ['TestimonialSection', 'marketing', (p) => ({ type: p.Type, theme: p.Theme })],
  'Blog section': ['BlogSection', 'marketing', (p) => ({ type: p.Type })],
  'Blog page header': ['BlogPageHeader', 'marketing', (p) => ({ type: p.Type })],
  'Blog post page header': ['BlogPostPageHeader', 'marketing', (p) => ({ type: p.Type })],
  'Content section': ['ContentSection', 'marketing', (p) => ({ type: p.Type })],
  'Contact sections': ['ContactSection', 'marketing', (p) => ({ type: p.Type, theme: p.Theme })],
  'Contact page header': ['ContactPageHeader', 'marketing', (p) => ({ type: p.Type })],
  'Team section': ['TeamSection', 'marketing', (p) => ({ type: p.Type })],
  'Careers section': ['CareersSection', 'marketing', (p) => ({ type: p.Type, theme: p.Theme })],
  'FAQ section': ['FAQSection', 'marketing', (p) => ({ type: p.Type, theme: p.Theme })],
  Footer: ['MarketingFooter', 'marketing', (p) => ({ type: p.Type, theme: p.Theme })],
  'Log in': ['LogIn', 'templates', (p) => ({ type: p.Type })],
  'Sign up': ['SignUp', 'templates', (p) => ({ type: p.Type })],
  '404 section': ['NotFoundSection', 'templates', (p) => ({ type: p.Type })],
};
const catName = { 'Landing pages': 'Landing', 'Pricing pages': 'Pricing', Blogs: 'Blog', 'Blog posts': 'BlogPost', 'About pages': 'About', 'Contact pages': 'Contact', 'Team pages': 'Team', 'Legal pages': 'Legal', 'FAQ pages': 'Faq', 'Log in pages': 'LogIn', 'Sign up pages': 'SignUp', '404 pages': 'NotFound' };
const registry = []; const files = [];
const unmapped = {};
for (const [cat, frames] of Object.entries(pages)) {
  const c = cat.replace('❖', '').trim(); if (!catName[c]) continue;
  const base = catName[c]; const imports = { marketing: new Set(), templates: new Set() }; const comps = [];
  frames.filter((f) => f.size[0] >= 1200 && f.kids.some((l) => !/^[\s[(]/.test(l))).forEach((f, i) => {
    const name = `${base}Page${String(i + 1).padStart(2, '0')}`;
    const body = [];
    for (const l of f.kids) {
      if (/^[\s[(]/.test(l)) continue;
      const m = l.match(/^(.*?) \{(.*)\}$/); const set = m ? m[1] : l; const props = {};
      if (m) for (const kv of m[2].split(', ')) { const [k, v] = kv.split('='); props[k] = v; }
      const entry = map[set]; if (entry === undefined) { unmapped[set] = (unmapped[set] || 0) + 1; continue; } if (!entry) continue;
      const [comp, src, fn] = entry; imports[src].add(comp);
      const p = Object.entries(fn(props)).filter(([, v]) => v !== undefined).map(([k, v]) => (k === 'variant' ? `${k}="${v}"` : `${k}="${kebab(v)}"`)).join(' ');
      const extra = comp === 'HeroHeaderSection' ? ' nav={<MarketingHeaderNav variant="dropdown" />}' : '';
      if (extra) imports.marketing.add('MarketingHeaderNav');
      body.push(`      <${comp}${p ? ' ' + p : ''}${extra} />`);
    }
    comps.push(`/** Figma "${c}" example ${i + 1} (${f.size.join('×')}, node ${f.id}). */\nexport function ${name}() {\n  return (\n    <div className="min-h-screen bg-white">\n${body.join('\n')}\n    </div>\n  );\n}`);
    registry.push({ name, category: c, file: base });
  });
  const imp = [];
  if (imports.marketing.size) imp.push(`import { ${[...imports.marketing].sort().join(', ')} } from '../../marketing';`);
  if (imports.templates.size) imp.push(`import { ${[...imports.templates].sort().join(', ')} } from '../../templates';`);
  fs.writeFileSync(path.join(OUT, `${base}Pages.tsx`), `/* Generated from the Figma "${c}" example page — composition of marketing sections. */\n${imp.join('\n')}\n\n${comps.join('\n\n')}\n`);
  files.push(base);
}
fs.writeFileSync(path.join(OUT, 'index.ts'), files.map((b) => `export * from './${b}Pages';`).join('\n') + `\n\n/** All generated marketing example pages. */\nexport const marketingPageList = ${JSON.stringify(registry.map(({ name, category }) => ({ name, category })), null, 1)} as const;\n`);
console.log('pages', registry.length, 'unmapped', unmapped);
