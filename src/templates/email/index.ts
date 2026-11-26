// Note: `renderEmailHtml` lives in './render' (imports react-dom/server) and is intentionally not re-exported here.
export * from './EmailTemplate';
export * from './EmailHeader';
export * from './EmailFooter';
export { EmailButton, EmailLogo, EmailSocialIcons, EmailAppStoreBadges, type EmailSocialLink, type EmailSocialPlatform } from './_primitives';
