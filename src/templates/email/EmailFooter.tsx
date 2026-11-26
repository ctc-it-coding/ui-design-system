import type { ReactNode } from 'react';
import { colors } from '../../tokens';
import { A, EmailAppStoreBadges, Block, EmailLogo, EmailSocialIcons, P, Row, Spacer, emailFont, tableReset, type EmailSocialLink } from './_primitives';
import type { EmailNavLink } from './EmailHeader';

export type EmailFooterType = 'left-aligned' | 'center-aligned' | 'center-aligned-divider';

export interface EmailFooterProps {
  /** Figma: Type */
  type?: EmailFooterType;
  /** Figma: Actions — "Download the app" block with store badges. */
  actions?: boolean;
  /** Recipient shown in "This email was sent to …". */
  recipientEmail?: string;
  unsubscribeHref?: string;
  preferencesHref?: string;
  /** Postal address / copyright line. */
  address?: ReactNode;
  /** Replaces the default legal text. */
  text?: ReactNode;
  socialLinks?: EmailSocialLink[];
  links?: EmailNavLink[];
  logoSrc?: string;
  brandName?: string;
  appStoreHref?: string;
  googlePlayHref?: string;
  actionsTitle?: ReactNode;
  actionsText?: ReactNode;
}

const defaultLinks: EmailNavLink[] = [
  { label: 'Terms', href: '#' },
  { label: 'Privacy', href: '#' },
  { label: 'Cookies', href: '#' },
  { label: 'Contact us', href: '#' },
];

function Divider() {
  return (
    <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} border={0} style={tableReset}>
      <tbody>
        <tr>
          <td style={{ borderTop: `1px solid ${colors.gray[200]}`, fontSize: 0, lineHeight: 0, height: 1 }}>&nbsp;</td>
        </tr>
      </tbody>
    </table>
  );
}

/** EmailFooter — Figma "_Email template footer". Email-safe (tables + inline styles). */
export function EmailFooter({
  type = 'left-aligned',
  actions = false,
  recipientEmail = 'olivia@untitledui.com',
  unsubscribeHref = '#',
  preferencesHref = '#',
  address = '© 2077 Tinicorn, 100 Smith Street, Melbourne VIC 3000',
  text,
  socialLinks,
  links = defaultLinks,
  logoSrc,
  brandName,
  appStoreHref,
  googlePlayHref,
  actionsTitle = 'Download the app',
  actionsText = 'Get the most of Tinicorn by installing our new mobile app.',
}: EmailFooterProps) {
  const center = type !== 'left-aligned';
  const muted = { color: colors.gray[600], fontSize: 14, lineHeight: '20px' };
  const actionBlock = actions && (
    <>
      <P style={{ color: colors.gray[900], fontWeight: center ? 500 : 400, ...(center ? {} : { fontSize: 14, lineHeight: '20px' }), textAlign: center ? 'center' : 'left' }}>{actionsTitle}</P>
      <Spacer h={8} />
      <P style={{ ...muted, textAlign: center ? 'center' : 'left' }}>{actionsText}</P>
      <Spacer h={24} />
      <EmailAppStoreBadges appStoreHref={appStoreHref} googlePlayHref={googlePlayHref} align={center ? 'center' : 'left'} />
    </>
  );

  if (type === 'left-aligned') {
    return (
      <Block style={{ padding: '32px 24px', backgroundColor: colors.white }}>
        {actionBlock}
        {actions && <Spacer h={48} />}
        <P style={muted}>
          {text ?? (
            <>
              This email was sent to{' '}
              <A href={`mailto:${recipientEmail}`} style={{ color: colors.brand[700], textDecoration: 'none' }}>
                {recipientEmail}
              </A>
              . If you'd rather not receive this kind of email, you can <A href={unsubscribeHref} style={{ color: colors.brand[700], textDecoration: 'none' }}>unsubscribe</A> or{' '}
              <A href={preferencesHref} style={{ color: colors.brand[700], textDecoration: 'none' }}>manage your email preferences</A>.
            </>
          )}
          <br />
          <br />
          {address}
        </P>
        <Spacer h={48} />
        <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} border={0} style={tableReset}>
          <tbody>
            <tr>
              <td style={{ verticalAlign: 'middle' }}>
                <EmailLogo src={logoSrc} brandName={brandName} height={24} />
              </td>
              <td align="right" style={{ verticalAlign: 'middle' }}>
                <table role="presentation" cellPadding={0} cellSpacing={0} border={0} align="right" style={tableReset}>
                  <tbody>
                    <tr>
                      <td>
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

  if (type === 'center-aligned') {
    return (
      <Block align="center" style={{ padding: '32px 24px', backgroundColor: colors.white }}>
        {actionBlock}
        {actions && <Spacer h={32} />}
        <EmailSocialIcons links={socialLinks} gap={20} align="center" />
        <Spacer h={32} />
        <P style={{ ...muted, textAlign: 'center' }}>
          {text ?? (
            <>
              Tinicorn is committed to sustainable building. This email was sent with 200% carbon offset. If you’d prefer to not receive these emails, please{' '}
              <A href={unsubscribeHref}>unsubscribe</A>.
            </>
          )}
          <br />
          {address}
        </P>
      </Block>
    );
  }

  return (
    <Block align="center" style={{ padding: '32px 24px', backgroundColor: colors.white }}>
      <Divider />
      <Spacer h={32} />
      {actions && (
        <>
          {actionBlock}
          <Spacer h={32} />
          <Divider />
          <Spacer h={32} />
        </>
      )}
      <P style={{ ...muted, textAlign: 'center' }}>
        {text ?? (
          <>
            You’re receiving this email because you subscribed to receive marketing emails. If you’d prefer to not receive these emails, please <A href={unsubscribeHref}>unsubscribe</A>.
          </>
        )}
      </P>
      <Spacer h={32} />
      <Row gap={actions ? 24 : 16} align="center">
        {links.map((l, i) => (
          <a key={i} href={l.href} style={{ fontFamily: emailFont, ...muted, textDecoration: 'none' }}>
            {l.label}
          </a>
        ))}
      </Row>
      <Spacer h={32} />
      <P style={{ ...muted, textAlign: 'center' }}>{address}</P>
    </Block>
  );
}
