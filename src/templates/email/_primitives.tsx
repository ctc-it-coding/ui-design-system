import type { CSSProperties, ReactNode } from 'react';
import { colors } from '../../tokens';

/** Web-safe font stack with Inter first. */
export const emailFont = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/** Shorthand for the type scale as inline styles. */
export const type = {
  sm: { fontSize: 14, lineHeight: '20px' },
  md: { fontSize: 16, lineHeight: '24px' },
  lg: { fontSize: 18, lineHeight: '28px' },
  dsm: { fontSize: 30, lineHeight: '38px' },
  dmd: { fontSize: 36, lineHeight: '44px', letterSpacing: '-0.02em' },
} satisfies Record<string, CSSProperties>;

export const tableReset: CSSProperties = { borderCollapse: 'collapse', borderSpacing: 0, msoTableLspace: '0pt', msoTableRspace: '0pt' } as CSSProperties;

/** A full-width single-cell table (the email equivalent of a block div). */
export function Block({ children, style, align, bg }: { children: ReactNode; style?: CSSProperties; align?: 'left' | 'center'; bg?: string }) {
  return (
    <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} border={0} style={tableReset}>
      <tbody>
        <tr>
          <td align={align} style={{ fontFamily: emailFont, backgroundColor: bg, textAlign: align, ...style }}>
            {children}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/** Vertical gap. */
export function Spacer({ h }: { h: number }) {
  return (
    <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} border={0} style={tableReset}>
      <tbody>
        <tr>
          <td height={h} style={{ height: h, fontSize: 0, lineHeight: 0 }}>
            &nbsp;
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/** Horizontal row of cells with a fixed gap (inline-table friendly). */
export function Row({ children, gap = 12, align = 'left' }: { children: ReactNode[]; gap?: number; align?: 'left' | 'center' }) {
  const items = children.filter(Boolean);
  return (
    <table role="presentation" cellPadding={0} cellSpacing={0} border={0} align={align === 'center' ? 'center' : undefined} style={{ ...tableReset, margin: align === 'center' ? '0 auto' : undefined }}>
      <tbody>
        <tr>
          {items.map((c, i) => (
            <td key={i} style={{ paddingLeft: i === 0 ? 0 : gap, verticalAlign: 'middle' }}>
              {c}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export function P({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <p style={{ margin: 0, fontFamily: emailFont, color: colors.gray[700], ...type.md, ...style }}>{children}</p>;
}

/** "Bulletproof" table button (primary or secondary-gray), 44px tall (Figma Button lg). */
export function EmailButton({ href = '#', children, variant = 'primary' }: { href?: string; children: ReactNode; variant?: 'primary' | 'secondary' }) {
  const primary = variant === 'primary';
  const bg = primary ? colors.brand[600] : colors.white;
  const border = primary ? colors.brand[600] : colors.gray[300];
  return (
    <table role="presentation" cellPadding={0} cellSpacing={0} border={0} style={tableReset}>
      <tbody>
        <tr>
          <td style={{ backgroundColor: bg, border: `1px solid ${border}`, borderRadius: 8, boxShadow: '0 1px 2px 0 rgba(16,24,40,0.05)' }}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', padding: '10px 18px', fontFamily: emailFont, fontSize: 16, lineHeight: '24px', fontWeight: 600, color: primary ? colors.white : colors.gray[700], textDecoration: 'none', borderRadius: 8 }}
            >
              {children}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export function A({ href = '#', children, style }: { href?: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', ...style }}>
      {children}
    </a>
  );
}

/** Image (or a neutral placeholder cell when no `src`). */
export function EmailImage({ src, alt = '', width, height, radius = 0, placeholder = colors.gray[100], children }: { src?: string; alt?: string; width: number | string; height: number; radius?: number; placeholder?: string; children?: ReactNode }) {
  if (src) {
    return <img src={src} alt={alt} width={typeof width === 'number' ? width : undefined} height={height} style={{ display: 'block', width, maxWidth: '100%', height: 'auto', border: 0, borderRadius: radius, outline: 'none', textDecoration: 'none' }} />;
  }
  return (
    <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} border={0} style={tableReset}>
      <tbody>
        <tr>
          <td height={height} align="center" style={{ height, backgroundColor: placeholder, borderRadius: radius, verticalAlign: 'middle', fontFamily: emailFont, color: colors.gray[400], fontSize: 14 }}>
            {children ?? ' '}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/** Text logo: brand circle + wordmark (renders everywhere without images). Pass `src` to use an image logo. */
export function EmailLogo({ src, brandName = 'Tinicorn', height = 32 }: { src?: string; brandName?: string; height?: number }) {
  if (src) return <img src={src} alt={brandName} height={height} style={{ display: 'block', height, border: 0 }} />;
  const s = Math.round(height * 0.875);
  return (
    <Row gap={10}>
      {[
        <span key="m" style={{ display: 'inline-block', width: s, height: s, borderRadius: s / 2, backgroundColor: colors.brand[600], border: `${Math.round(s / 3.2)}px solid ${colors.brand[200]}`, boxSizing: 'border-box' }} />,
        <span key="t" style={{ fontFamily: emailFont, fontSize: Math.round(height * 0.625), lineHeight: `${height}px`, fontWeight: 600, color: colors.gray[900], whiteSpace: 'nowrap' }}>
          {brandName}
        </span>,
      ]}
    </Row>
  );
}

export type EmailSocialPlatform = 'x' | 'facebook' | 'instagram' | 'linkedin';
export interface EmailSocialLink {
  platform: EmailSocialPlatform;
  href: string;
  /** Hosted 20×20 icon image (recommended for email). */
  iconSrc?: string;
}
export const defaultSocialLinks: EmailSocialLink[] = [
  { platform: 'x', href: 'https://x.com' },
  { platform: 'facebook', href: 'https://facebook.com' },
  { platform: 'instagram', href: 'https://instagram.com' },
];
const socialGlyph: Record<EmailSocialPlatform, string> = { x: '𝕏', facebook: 'f', instagram: '◎', linkedin: 'in' };

/** Social icon row (Figma "Social icon", Style=White → gray-400 glyphs). */
export function EmailSocialIcons({ links = defaultSocialLinks, gap = 16, align }: { links?: EmailSocialLink[]; gap?: number; align?: 'left' | 'center' }) {
  return (
    <Row gap={gap} align={align}>
      {links.map((l) => (
        <a key={l.platform} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.platform} style={{ display: 'inline-block', textDecoration: 'none' }}>
          {l.iconSrc ? (
            <img src={l.iconSrc} alt={l.platform} width={20} height={20} style={{ display: 'block', border: 0 }} />
          ) : (
            <span style={{ display: 'inline-block', width: 20, height: 20, lineHeight: '20px', textAlign: 'center', fontFamily: emailFont, fontSize: 14, fontWeight: 700, color: colors.gray[400] }}>{socialGlyph[l.platform]}</span>
          )}
        </a>
      ))}
    </Row>
  );
}

/** App Store / Google Play badges (Figma "Mobile app store badge", black). */
export function EmailAppStoreBadges({ appStoreHref = '#', googlePlayHref = '#', align }: { appStoreHref?: string; googlePlayHref?: string; align?: 'left' | 'center' }) {
  const badge = (href: string, small: string, big: string, w: number) => (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', width: w, height: 40, boxSizing: 'border-box', padding: '4px 10px', backgroundColor: colors.black, border: '1px solid #a6a6a6', borderRadius: 7, textDecoration: 'none', fontFamily: emailFont, color: colors.white }}>
      <span style={{ display: 'block', fontSize: 9, lineHeight: '11px' }}>{small}</span>
      <span style={{ display: 'block', fontSize: 15, lineHeight: '19px', fontWeight: 600 }}>{big}</span>
    </a>
  );
  return <Row gap={12} align={align}>{[badge(appStoreHref, 'Download on the', 'App Store', 120), badge(googlePlayHref, 'GET IT ON', 'Google Play', 135)]}</Row>;
}
