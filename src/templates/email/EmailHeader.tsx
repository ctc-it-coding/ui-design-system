import type { ReactNode } from 'react';
import { colors } from '../../tokens';
import { Block, EmailLogo, EmailSocialIcons, Row, Spacer, emailFont, tableReset, type EmailSocialLink } from './_primitives';

export interface EmailNavLink {
  label: ReactNode;
  href: string;
}

export interface EmailHeaderProps {
  /** Figma: Type */
  align?: 'left' | 'center';
  /** Figma: Links (False / True = nav links / Social = log-in link + social icons). */
  links?: 'none' | 'nav' | 'social';
  /** Logo element (default text logo) or use `logoSrc`. */
  logo?: ReactNode;
  logoSrc?: string;
  brandName?: string;
  navLinks?: EmailNavLink[];
  socialLinks?: EmailSocialLink[];
  /** "Log in" link next to the social icons (left-aligned social header). */
  loginLabel?: ReactNode;
  loginHref?: string;
}

const defaultNav: EmailNavLink[] = [
  { label: 'Home', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Tutorials', href: '#' },
  { label: 'Support', href: '#' },
];

/** EmailHeader — Figma "_Email template header". Email-safe (tables + inline styles). */
export function EmailHeader({ align = 'left', links = 'none', logo, logoSrc, brandName, navLinks = defaultNav, socialLinks, loginLabel = 'Log in', loginHref = '#' }: EmailHeaderProps) {
  const logoEl = logo ?? <EmailLogo src={logoSrc} brandName={brandName} />;
  const linkStyle = { fontFamily: emailFont, fontSize: 16, lineHeight: '24px', color: colors.gray[900], textDecoration: 'none' };
  const centeredLogo = align === 'center' ? <div style={{ display: 'inline-block' }}>{logoEl}</div> : logoEl;

  if (links === 'social' && align === 'left') {
    return (
      <Block style={{ padding: 24, backgroundColor: colors.white }}>
        <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} border={0} style={tableReset}>
          <tbody>
            <tr>
              <td style={{ verticalAlign: 'middle' }}>{logoEl}</td>
              <td align="right" style={{ verticalAlign: 'middle' }}>
                <table role="presentation" cellPadding={0} cellSpacing={0} border={0} align="right" style={tableReset}>
                  <tbody>
                    <tr>
                      <td style={{ paddingRight: 24, verticalAlign: 'middle' }}>
                        <a href={loginHref} style={{ ...linkStyle, fontWeight: 500 }}>
                          {loginLabel}
                        </a>
                      </td>
                      <td style={{ verticalAlign: 'middle' }}>
                        <EmailSocialIcons links={socialLinks} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </Block>
    );
  }

  return (
    <Block align={align} style={{ padding: 24, backgroundColor: colors.white }}>
      {align === 'center' ? <Row align="center">{[centeredLogo]}</Row> : logoEl}
      {links === 'nav' && (
        <>
          <Spacer h={32} />
          <Row gap={16} align={align}>
            {navLinks.map((l, i) => (
              <a key={i} href={l.href} style={linkStyle}>
                {l.label}
              </a>
            ))}
          </Row>
        </>
      )}
      {links === 'social' && (
        <>
          <Spacer h={32} />
          <EmailSocialIcons links={socialLinks} align="center" />
        </>
      )}
    </Block>
  );
}
