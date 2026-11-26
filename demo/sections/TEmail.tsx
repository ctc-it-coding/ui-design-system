import { Section, Row } from '../ui';
import { EmailTemplate, EmailHeader, EmailFooter, type EmailTemplateType } from '../../src/templates/email';
import { renderEmailHtml } from '../../src/templates/email/render';

const types: EmailTemplateType[] = [
  'simple-welcome-01', 'image-welcome', 'simple-verification', 'simple-invite', 'simple-welcome-02',
  'video-welcome-01', 'video-welcome-02', 'mockup-01', 'video-welcome-03', 'mockup-02',
];
const filter = typeof location !== 'undefined' ? location.hash.slice(1) : '';

export default function TEmail() {
  return (
    <>
      <Section id="email-templates" title="Email templates" figma="Shared assets / Email templates / Email template">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          {types.filter((t) => !filter || t.includes(filter)).map((t) => (
            <div key={t} className="flex flex-col gap-2">
              <div className="font-mono text-xs text-gray-500">{`<EmailTemplate type="${t}" />`}</div>
              <div className="overflow-hidden rounded-xl ring-1 ring-gray-200">
                <EmailTemplate type={t} />
              </div>
            </div>
          ))}
        </div>
      </Section>
      {!filter && (
        <Section id="email-parts" title="Email header & footer" figma="_Email template header / _Email template footer">
          <Row label="Headers" className="grid max-w-[600px] gap-4">
            <EmailHeader />
            <EmailHeader align="center" />
            <EmailHeader links="nav" />
            <EmailHeader links="nav" align="center" />
            <EmailHeader links="social" />
            <EmailHeader links="social" align="center" />
          </Row>
          <Row label="Footers" className="grid max-w-[600px] gap-4">
            <EmailFooter />
            <EmailFooter actions />
            <EmailFooter type="center-aligned" />
            <EmailFooter type="center-aligned-divider" actions />
          </Row>
          <Row label="renderEmailHtml(<EmailTemplate type='simple-verification' />) in an iframe" className="block">
            <iframe title="email" className="h-[900px] w-full max-w-[640px] rounded-xl ring-1 ring-gray-200" srcDoc={renderEmailHtml(<EmailTemplate type="simple-verification" />, { title: 'Verify your email' })} />
          </Row>
        </Section>
      )}
    </>
  );
}
