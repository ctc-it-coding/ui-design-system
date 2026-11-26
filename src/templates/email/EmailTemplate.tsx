import type { CSSProperties, ReactNode } from 'react';
import { colors } from '../../tokens';
import { EmailAppStoreBadges, Block, EmailButton, EmailImage, P, Row, Spacer, emailFont, tableReset, type } from './_primitives';
import { EmailHeader, type EmailHeaderProps } from './EmailHeader';
import { EmailFooter, type EmailFooterProps } from './EmailFooter';

export type EmailTemplateType =
  | 'simple-welcome-01'
  | 'simple-welcome-02'
  | 'image-welcome'
  | 'simple-verification'
  | 'simple-invite'
  | 'video-welcome-01'
  | 'video-welcome-02'
  | 'video-welcome-03'
  | 'mockup-01'
  | 'mockup-02';

export interface EmailLinkItem {
  label: ReactNode;
  href: string;
  description?: ReactNode;
}

export interface EmailTemplateProps {
  /** Figma: Type */
  type?: EmailTemplateType;
  /** Recipient first name used in "Hi Olivia,". */
  recipientName?: string;
  /** Heading (types with a heading). */
  heading?: ReactNode;
  /** Body paragraphs (each string becomes a paragraph). */
  body?: ReactNode[];
  /** Primary button. */
  ctaLabel?: ReactNode;
  ctaHref?: string;
  /** Secondary button (video-welcome-03). */
  secondaryLabel?: ReactNode;
  secondaryHref?: string;
  /** Sign-off ("Thanks, The team"). */
  signOff?: ReactNode;
  /** Hero image / video thumbnail / mockup screenshot URL (placeholders are drawn without it). */
  imageSrc?: string;
  /** Second image (mockup-02 second phone). */
  imageSrc2?: string;
  /** Link to the video (video types). */
  videoHref?: string;
  /** Verification code (simple-verification). */
  code?: string;
  /** Inviter name (simple-invite). */
  inviterName?: string;
  /** Link list (simple-welcome-02). */
  links?: EmailLinkItem[];
  /** Hidden preview text shown by inbox lists. */
  preheader?: string;
  /** Overrides passed to the header / footer. */
  header?: Partial<EmailHeaderProps>;
  footer?: Partial<EmailFooterProps>;
}

const WIDTH = 600;

const defaultLinks: EmailLinkItem[] = [
  { label: 'Tinicorn changelog →', href: '#', description: 'Weekly new updates and improvements to Tinicorn.' },
  { label: 'Follow us on Twitter →', href: '#', description: 'Stay up-to-date with the latest announcements and jobs.' },
  { label: 'Why we’re building Tinicorn →', href: '#', description: 'Tinicorn is a new standard of design system and UI kit.' },
];

const onboard = (name: string) => [
  `Hi ${name},`,
  'We’re glad to have you onboard! You’re already on your way to creating beautiful visual products.',
  'Whether you’re here for your brand, for a cause, or just for fun — welcome! If there’s anything you need, we’ll be here every step of the way.',
];

/** Per-type layout config from the Figma "Email template" set. */
const config: Record<EmailTemplateType, { bg: string; header: Partial<EmailHeaderProps>; footer: Partial<EmailFooterProps> }> = {
  'simple-welcome-01': { bg: colors.white, header: { links: 'nav' }, footer: {} },
  'image-welcome': { bg: colors.gray[50], header: {}, footer: {} },
  'simple-verification': { bg: colors.white, header: {}, footer: {} },
  'simple-invite': { bg: colors.white, header: {}, footer: {} },
  'simple-welcome-02': { bg: colors.white, header: {}, footer: {} },
  'video-welcome-01': { bg: colors.gray[50], header: { align: 'center' }, footer: { type: 'center-aligned', actions: true } },
  'video-welcome-02': { bg: colors.gray[50], header: { links: 'social' }, footer: {} },
  'mockup-01': { bg: colors.gray[50], header: { links: 'social' }, footer: { actions: true } },
  'video-welcome-03': { bg: colors.gray[50], header: {}, footer: { type: 'center-aligned-divider' } },
  'mockup-02': { bg: colors.gray[50], header: { align: 'center' }, footer: { type: 'center-aligned-divider' } },
};

function Paragraphs({ items, style, gap = 16 }: { items: ReactNode[]; style?: CSSProperties; gap?: number }) {
  return (
    <>
      {items.map((t, i) => (
        <P key={i} style={{ ...style, marginTop: i === 0 ? 0 : gap }}>
          {t}
        </P>
      ))}
    </>
  );
}

function Heading({ children, size = 'dsm', center }: { children: ReactNode; size?: 'dsm' | 'dmd'; center?: boolean }) {
  return <h1 style={{ margin: 0, fontFamily: emailFont, fontWeight: 500, color: colors.gray[900], textAlign: center ? 'center' : 'left', ...type[size] }}>{children}</h1>;
}

/** Video thumbnail with a play button, linked to the video. */
function Video({ src, href = '#', label }: { src?: string; href?: string; label?: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
      <EmailImage src={src} width="100%" height={315} radius={8} placeholder={colors.gray[200]}>
        <span style={{ display: 'inline-block', width: 64, height: 64, lineHeight: '64px', borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.9)', color: colors.gray[900], fontSize: 24, textAlign: 'center' }}>▶</span>
        {label && <span style={{ display: 'block', marginTop: 12, color: colors.gray[600], fontSize: 14, fontWeight: 600 }}>{label}</span>}
      </EmailImage>
    </a>
  );
}

/** Verification code digits (Figma "Verification code input field", Size=sm). */
function Code({ code }: { code: string }) {
  return (
    <Row gap={8}>
      {code.split('').map((d, i) => (
        <span key={i} style={{ display: 'inline-block', width: 64, height: 64, lineHeight: '64px', boxSizing: 'border-box', textAlign: 'center', border: `2px solid ${colors.brand[600]}`, borderRadius: 8, fontFamily: emailFont, fontSize: 48, fontWeight: 500, color: colors.brand[600], letterSpacing: '-0.02em' }}>
          {d}
        </span>
      ))}
    </Row>
  );
}

/**
 * EmailTemplate — Figma "Email template" (Shared assets / Email templates), 10 types.
 * Built only from tables and inline styles (no Tailwind) so it survives e-mail clients.
 * Render to HTML with `renderEmailHtml()` from `templates/email/render`.
 */
export function EmailTemplate({
  type: t = 'simple-welcome-01',
  recipientName = 'Olivia',
  heading,
  body,
  ctaLabel,
  ctaHref = '#',
  secondaryLabel,
  secondaryHref = '#',
  signOff,
  imageSrc,
  imageSrc2,
  videoHref,
  code = '3660',
  inviterName = 'Alicia',
  links = defaultLinks,
  preheader,
  header,
  footer,
}: EmailTemplateProps) {
  const cfg = config[t];
  const sign = signOff ?? (
    <>
      Thanks,
      <br />
      The team
    </>
  );
  const lg = { ...type.lg };
  let content: ReactNode;

  switch (t) {
    case 'simple-welcome-01':
      content = (
        <>
          <Paragraphs items={body ?? [...onboard(recipientName), sign]} />
          <Spacer h={32} />
          <EmailButton href={ctaHref}>{ctaLabel ?? 'Log in'}</EmailButton>
        </>
      );
      break;
    case 'image-welcome':
      content = (
        <>
          <EmailImage src={imageSrc} width="100%" height={320} />
          <Spacer h={48} />
          <Heading size="dmd">{heading ?? `Hi ${recipientName},`}</Heading>
          <Spacer h={24} />
          <Paragraphs items={body ?? [...onboard(recipientName).slice(1), sign]} style={lg} />
          <Spacer h={48} />
          <EmailButton href={ctaHref}>{ctaLabel ?? 'Log in'}</EmailButton>
        </>
      );
      break;
    case 'simple-verification':
      content = (
        <>
          <Paragraphs items={[`Hi ${recipientName},`, 'This is your verification code:']} style={lg} gap={0} />
          <Spacer h={24} />
          <Code code={code} />
          <Spacer h={24} />
          <Paragraphs items={body ?? ['This code will only be valid for the next 5 minutes. If the code does not work, you can use this login verification link:']} style={lg} />
          <Spacer h={24} />
          <EmailButton href={ctaHref}>{ctaLabel ?? 'Verify email'}</EmailButton>
          <Spacer h={24} />
          <P style={lg}>{sign}</P>
        </>
      );
      break;
    case 'simple-invite':
      content = (
        <>
          <Paragraphs items={body ?? [`Hi ${recipientName},`, <>{inviterName} has invited you to join the team on <b>Tinicorn</b>.</>]} gap={16} />
          <Spacer h={24} />
          <EmailButton href={ctaHref}>{ctaLabel ?? 'Accept the invite'}</EmailButton>
          <Spacer h={24} />
          <P style={{ color: colors.gray[600] }}>{sign}</P>
        </>
      );
      break;
    case 'simple-welcome-02':
      content = (
        <>
          <EmailImage src={imageSrc} width="100%" height={320} />
          <Spacer h={48} />
          <Heading>{heading ?? 'Welcome to Tinicorn'}</Heading>
          <Spacer h={24} />
          <Paragraphs
            items={
              body ?? [
                'We’re excited to welcome you to Tinicorn and we’re even more excited about what we’ve got planned. You’re already on your way to creating beautiful visual products.',
                'Whether you’re here for your brand, for a cause, or just for fun — welcome! If there’s anything you need, we’ll be here every step of the way.',
              ]
            }
          />
          {links.map((l, i) => (
            <div key={i}>
              <Spacer h={24} />
              <div style={{ width: 80, borderTop: `1px solid ${colors.gray[200]}` }} />
              <Spacer h={24} />
              <P>
                <a href={l.href} style={{ color: colors.brand[700], fontWeight: 500, textDecoration: 'none' }}>
                  {l.label}
                </a>
              </P>
              {l.description && <P style={{ marginTop: 8 }}>{l.description}</P>}
            </div>
          ))}
          <Spacer h={24} />
          <div style={{ width: 80, borderTop: `1px solid ${colors.gray[200]}` }} />
          <Spacer h={24} />
          <P>
            Thanks for signing up. If you have any questions, send us a message at{' '}
            <a href="mailto:hi@untitledui.com" style={{ color: colors.brand[700], textDecoration: 'none' }}>
              hi@untitledui.com
            </a>{' '}
            or on{' '}
            <a href="#" style={{ color: colors.brand[700], textDecoration: 'none' }}>
              Twitter
            </a>
            . We’d love to hear from you.
            <br />— The team
          </P>
          <Spacer h={48} />
          <EmailButton href={ctaHref}>{ctaLabel ?? 'Get started'}</EmailButton>
        </>
      );
      break;
    case 'video-welcome-01':
      content = (
        <>
          <Paragraphs
            items={
              body ?? [
                `Hi ${recipientName},`,
                'Welcome to Tinicorn! You’re already on your way to creating beautiful visual products.',
                'We’ve created a quick intro video to get you up and running as soon as possible. If you have any questions, please get in touch.',
              ]
            }
          />
          <Spacer h={32} />
          <Video src={imageSrc} href={videoHref} label="The future of work" />
          <Spacer h={32} />
          <P>{sign}</P>
        </>
      );
      break;
    case 'video-welcome-02':
      content = (
        <Block align="center">
          <Heading center>{heading ?? 'How to get up and running as soon as possible'}</Heading>
          <Spacer h={24} />
          <Paragraphs items={body ?? ['We’ve created a quick intro video to get you up and running as soon as possible. Don’t hestitate to get in touch.']} style={{ textAlign: 'center' }} />
          <Spacer h={32} />
          <Video src={imageSrc} href={videoHref} />
          <Spacer h={32} />
          <Row align="center">{[<EmailButton key="b" href={ctaHref ?? videoHref}>{ctaLabel ?? 'Watch video'}</EmailButton>]}</Row>
        </Block>
      );
      break;
    case 'mockup-01':
      content = (
        <>
          <EmailImage src={imageSrc} width="100%" height={304} radius={8}>
            Product screenshot
          </EmailImage>
          <Spacer h={48} />
          <Heading>{heading ?? 'Meet Version 3.0: a clean, modern UI kit for beautiful interfaces'}</Heading>
          <Spacer h={24} />
          <Paragraphs items={body ?? onboard(recipientName).slice(1)} />
          <Spacer h={32} />
          <EmailButton href={ctaHref}>{ctaLabel ?? 'Download 3.0'}</EmailButton>
        </>
      );
      break;
    case 'video-welcome-03':
      content = (
        <Block align="center">
          <Video src={imageSrc} href={videoHref} />
          <Spacer h={48} />
          <Heading center>{heading ?? 'Welcome to Tinicorn!'}</Heading>
          <Spacer h={16} />
          <Paragraphs
            items={body ?? [`Hi ${recipientName}, thanks for checking out Tinicorn. Here are a few tips to help you get up and running as soon as possible. If you have any questions, just reply to this email — we’ll be happy to hear from you!`]}
            style={{ textAlign: 'center' }}
          />
          <Spacer h={48} />
          <Row align="center">
            {[
              <EmailButton key="s" href={secondaryHref} variant="secondary">
                {secondaryLabel ?? 'Watch intro'}
              </EmailButton>,
              <EmailButton key="p" href={ctaHref}>
                {ctaLabel ?? 'Log in'}
              </EmailButton>,
            ]}
          </Row>
        </Block>
      );
      break;
    case 'mockup-02':
    default:
      content = (
        <Block align="center">
          <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} border={0} style={tableReset}>
            <tbody>
              <tr>
                <td align="center" style={{ backgroundColor: colors.gray[100], padding: '40px 16px 0', height: 360, verticalAlign: 'bottom' }}>
                  <Row gap={16} align="center">
                    {[imageSrc, imageSrc2].map((s, i) => (
                      <div key={i} style={{ width: 160, height: 320, borderRadius: '28px 28px 0 0', border: '6px solid #1f2024', borderBottom: 0, overflow: 'hidden', backgroundColor: colors.white }}>
                        {s ? <img src={s} alt="" width={148} style={{ display: 'block', width: 148, border: 0 }} /> : null}
                      </div>
                    ))}
                  </Row>
                </td>
              </tr>
            </tbody>
          </table>
          <Spacer h={32} />
          <Heading center>{heading ?? 'Welcome to Tinicorn!'}</Heading>
          <Spacer h={16} />
          <Paragraphs items={body ?? [`Hi ${recipientName}, thanks for checking out Tinicorn. Get the most of Tinicorn by installing our new mobile app.`]} style={{ ...lg, textAlign: 'center' }} />
          <Spacer h={32} />
          <EmailAppStoreBadges align="center" />
          <Spacer h={32} />
          <P style={{ ...lg, textAlign: 'center' }}>{signOff ?? 'If you have any questions, just reply to this email — we’ll be happy to hear from you!'}</P>
        </Block>
      );
      break;
  }

  return (
    <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} border={0} style={{ ...tableReset, backgroundColor: cfg.bg }}>
      <tbody>
        <tr>
          <td align="center" style={{ padding: '32px 12px', fontFamily: emailFont }}>
            {preheader && <div style={{ display: 'none', maxHeight: 0, overflow: 'hidden', opacity: 0, fontSize: 1, lineHeight: '1px', color: cfg.bg }}>{preheader}</div>}
            <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} border={0} style={{ ...tableReset, maxWidth: WIDTH, width: '100%', margin: '0 auto' }}>
              <tbody>
                <tr>
                  <td>
                    <EmailHeader {...cfg.header} {...header} />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '32px 24px', backgroundColor: colors.white, textAlign: 'left' }}>{content}</td>
                </tr>
                <tr>
                  <td>
                    <EmailFooter {...cfg.footer} {...footer} />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
