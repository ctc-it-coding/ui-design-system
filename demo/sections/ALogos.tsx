import { CompanyLogo, PressLogo, TinicornLogo, TinicornLogomark, companyLogoNames, pressLogoNames } from '../../src/components/logos';
import { AppStoreBadge, appStoreBadgeStores } from '../../src/components/buttons';
import { Section, Row } from '../ui';

export default function LogosDemo() {
  return (
    <Section id="logos" title="Logos" figma="Logo · Logomark · Fictional company logo · Press logo">
      <Row label="Tinicorn logo · light / dark / logomark">
        <TinicornLogo />
        <div className="rounded-lg bg-gray-950 p-3"><TinicornLogo dark /></div>
        <TinicornLogomark />
        <TinicornLogomark height={48} /><TinicornLogo height={48} /><TinicornLogo markOnly />
      </Row>
      <Row label="Fictional company logo · logotype" className="flex flex-wrap items-center gap-x-8 gap-y-4">
        {companyLogoNames.map((n) => <CompanyLogo key={n} name={n} />)}
      </Row>
      <Row label="logomark only" className="flex flex-wrap items-center gap-6">
        {companyLogoNames.map((n) => <CompanyLogo key={n} name={n} logotype={false} />)}
      </Row>
      <Row label="white (on brand-800)" className="flex flex-wrap items-center gap-x-8 gap-y-4 rounded-xl bg-brand-800 p-6">
        {companyLogoNames.map((n) => <CompanyLogo key={n} name={n} white height={32} />)}
        {companyLogoNames.slice(0, 8).map((n) => <CompanyLogo key={n + 'm'} name={n} white logotype={false} height={32} />)}
      </Row>
      <Row label="Press logo" className="flex flex-wrap items-center gap-x-10 gap-y-6">
        {pressLogoNames.map((n) => <PressLogo key={n} name={n} />)}
      </Row>
      <Row label="Press logo · height 24 · text-gray-400" className="flex flex-wrap items-center gap-x-8 gap-y-4">
        {pressLogoNames.map((n) => <PressLogo key={n} name={n} height={24} className="text-gray-400" />)}
      </Row>
      <Row label="Mobile app store badge · brand md / lg" className="flex flex-wrap items-center gap-3">
        {appStoreBadgeStores.map((s) => <AppStoreBadge key={s} store={s} href="#" />)}
        {appStoreBadgeStores.map((s) => <AppStoreBadge key={s + 'l'} store={s} size="lg" href="#" />)}
      </Row>
      <Row label="black outline" className="flex flex-wrap items-center gap-3">
        {appStoreBadgeStores.map((s) => <AppStoreBadge key={s} store={s} variant="black-outline" href="#" />)}
      </Row>
      <Row label="white outline (on gray-900)" className="flex flex-wrap items-center gap-3 rounded-xl bg-gray-900 p-4">
        {appStoreBadgeStores.map((s) => <AppStoreBadge key={s} store={s} variant="white-outline" href="#" />)}
      </Row>
    </Section>
  );
}
