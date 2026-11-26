import { useId, useMemo } from 'react';

/** Prefixes every `id="…"` and `url(#…)` / `href="#…"` reference in an SVG markup string. */
export function scopeSvgIds(body: string, prefix: string): string {
  if (!body.includes('id=')) return body;
  return body
    .replace(/\bid="([^"]+)"/g, (_, id) => `id="${prefix}${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}${id})`)
    .replace(/href="#([^"]+)"/g, (_, id) => `href="#${prefix}${id}"`);
}

/** Per-instance unique ids for inline SVG markup, so the same artwork can render several times on a page. */
export function useScopedSvg(body: string): string {
  const raw = useId();
  const prefix = 'tc' + raw.replace(/[^a-zA-Z0-9_-]/g, '') + '-';
  return useMemo(() => scopeSvgIds(body, prefix), [body, prefix]);
}
