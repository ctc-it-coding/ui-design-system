import { ChangePlanCTA, EmailCTA, InlineCTA, PaymentMethodCTA, ReceiptCTA, UpgradePlanCTA } from '../../src/components/inline-cta';
import { Section, Row } from '../ui';

const text = 'Check out the all new dashboard view. Pages and now load faster.';

export default function InlineCTAsDemo() {
  return (
    <Section id="inline-ctas" title="Inline CTAs" figma="Inline CTAs/Inline CTA">
      <Row label="Image / Actions / Email field" className="flex max-w-[768px] flex-col gap-6">
        <InlineCTA
          title="We’ve just released a new update!"
          description={text}
          media={<div className="size-full bg-gradient-to-br from-brand-500 via-brand-300 to-gray-300" />}
          playButton
          secondaryAction={{ label: 'Dismiss' }}
          primaryAction={{ label: 'Changelog' }}
        />
        <InlineCTA title="We’ve just released a new update!" description={text} secondaryAction={{ label: 'Dismiss' }} primaryAction={{ label: 'Changelog' }} />
        <EmailCTA title="We’ve just released a new update!" description={text} />
      </Row>
      <Row label="Change plan / Upgrade plan" className="flex max-w-[768px] flex-col gap-6">
        <ChangePlanCTA
          title="Change your plan"
          description="Flexible pricing that grows with you."
          planName="Basic plan"
          price="$10"
          planDescription="Includes up to 10 users, 20GB individual data and access to all features."
          secondaryAction={{ label: 'Learn more' }}
          primaryAction={{ label: 'Change plan' }}
        />
        <UpgradePlanCTA
          title="Upgrade your plan"
          description="Need more space? Upgrade your plan today."
          features={[
            { title: '10 users', description: 'Add up to 10 team members.' },
            { title: '20GB data', description: 'Up to 20GB individual data.' },
            { title: 'All features', description: 'Access to advanced features and analytics.' },
          ]}
          secondaryAction={{ label: 'Dismiss' }}
          primaryAction={{ label: 'Upgrade plan' }}
        />
      </Row>
      <Row label="Payment method / Receipt" className="flex max-w-[768px] flex-col gap-6">
        <PaymentMethodCTA
          title="Payment method"
          description="Change how you pay for your plan."
          methodIcon={
            <div className="flex h-6 w-[34px] shrink-0 items-center justify-center rounded-sm border border-gray-100 bg-white text-[10px] font-bold text-blue-700 italic sm:h-10 sm:w-[58px] sm:rounded-md sm:text-sm">
              VISA
            </div>
          }
          cardLabel="Visa ending in 1234"
          expiry="Expiry 06/2026"
          email="billing@tinicorn.com"
        />
        <ReceiptCTA
          title="Your latest receipt is available to download"
          description="Download receipt for January 2026."
          fileName="Receipt_January_2026.pdf"
          fileSize="200 KB"
          secondaryAction={{ label: 'Dismiss' }}
          primaryAction={{ label: 'Download' }}
        />
      </Row>
    </Section>
  );
}
