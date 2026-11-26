import { StrictMode, useEffect, useState, type ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Foundations from './sections/Foundations';
import ALogos from './sections/ALogos';
import AMockups from './sections/AMockups';
import ABackgrounds from './sections/ABackgrounds';
import ADecorations from './sections/ADecorations';
import AMedia from './sections/AMedia';
import MiscIcons from './sections/MiscIcons';
import Buttons from './sections/Buttons';
import SocialButtons from './sections/SocialButtons';
import ButtonGroups from './sections/ButtonGroups';
import Badges from './sections/Badges';
import Tags from './sections/Tags';
import Dropdowns from './sections/Dropdowns';
import Inputs from './sections/Inputs';
import AWysiwyg from './sections/AWysiwyg';
import Toggles from './sections/Toggles';
import Checkboxes from './sections/Checkboxes';
import CheckboxGroups from './sections/CheckboxGroups';
import Avatars from './sections/Avatars';
import Tooltips from './sections/Tooltips';
import ProgressIndicators from './sections/ProgressIndicators';
import Sliders from './sections/Sliders';
import FeaturedIcons from './sections/FeaturedIcons';
import PageHeaders from './sections/PageHeaders';
import ApplicationNavigation from './sections/ApplicationNavigation';
import Modals from './sections/Modals';
import CommandMenus from './sections/CommandMenus';
import Charts from './sections/Charts';
import Metrics from './sections/Metrics';
import SlideoutMenus from './sections/SlideoutMenus';
import InlineCTAs from './sections/InlineCTAs';
import Pagination from './sections/Pagination';
import ProgressSteps from './sections/ProgressSteps';
import ActivityFeeds from './sections/ActivityFeeds';
import Messaging from './sections/Messaging';
import Tabs from './sections/Tabs';
import Tables from './sections/Tables';
import Breadcrumbs from './sections/Breadcrumbs';
import Alerts from './sections/Alerts';
import DatePickers from './sections/DatePickers';
import FileUpload from './sections/FileUpload';
import ContentDividers from './sections/ContentDividers';
import LoadingIndicators from './sections/LoadingIndicators';
import EmptyStates from './sections/EmptyStates';
import CodeSnippets from './sections/CodeSnippets';
import MHeaderNavigation from './sections/MHeaderNavigation';
import MHero from './sections/MHero';
import MHeaderSection from './sections/MHeaderSection';
import MFeatures from './sections/MFeatures';
import MPricing from './sections/MPricing';
import MCTA from './sections/MCTA';
import MMetrics from './sections/MMetrics';
import MNewsletter from './sections/MNewsletter';
import MTestimonials from './sections/MTestimonials';
import MSocialProof from './sections/MSocialProof';
import MBlog from './sections/MBlog';
import MContent from './sections/MContent';
import MContact from './sections/MContact';
import MTeam from './sections/MTeam';
import MCareers from './sections/MCareers';
import MFAQ from './sections/MFAQ';
import MFooters from './sections/MFooters';
import MBanners from './sections/MBanners';
import TAuth from './sections/TAuth';
import TNotFound from './sections/TNotFound';
import TEmail from './sections/TEmail';
import PMarketing from './sections/PMarketing';
import PDashboards from './sections/PDashboards';
import PSettings from './sections/PSettings';
import PInformational from './sections/PInformational';

const sections: Record<string, ComponentType> = { Foundations, ALogos, AMockups, ABackgrounds, ADecorations, AMedia, MiscIcons, Buttons, SocialButtons, ButtonGroups, Badges, Tags, Dropdowns, Inputs, AWysiwyg, Toggles, Checkboxes, CheckboxGroups, Avatars, Tooltips, ProgressIndicators, Sliders, FeaturedIcons, PageHeaders, ApplicationNavigation, Modals, CommandMenus, Charts, Metrics, SlideoutMenus, InlineCTAs, Pagination, ProgressSteps, ActivityFeeds, Messaging, Tabs, Tables, Breadcrumbs, Alerts, DatePickers, FileUpload, ContentDividers, LoadingIndicators, EmptyStates, CodeSnippets, MHeaderNavigation, MHero, MHeaderSection, MFeatures, MPricing, MCTA, MMetrics, MNewsletter, MTestimonials, MSocialProof, MBlog, MContent, MContact, MTeam, MCareers, MFAQ, MFooters, MBanners, TAuth, TNotFound, TEmail, PMarketing, PDashboards, PSettings, PInformational };
const nav = [
  { group: 'Foundations', items: ['Foundations'] },
  { group: 'Assets', items: ['ALogos', 'AMockups', 'ABackgrounds', 'ADecorations', 'AMedia', 'MiscIcons'] },
  { group: 'Shared components', items: ['Buttons', 'SocialButtons', 'ButtonGroups', 'Badges', 'Tags', 'Dropdowns', 'Inputs', 'AWysiwyg', 'Toggles', 'Checkboxes', 'CheckboxGroups', 'Avatars', 'Tooltips', 'ProgressIndicators', 'Sliders', 'FeaturedIcons'] },
  { group: 'Application components', items: ['PageHeaders', 'ApplicationNavigation', 'Modals', 'CommandMenus', 'Charts', 'Metrics', 'SlideoutMenus', 'InlineCTAs', 'Pagination', 'ProgressSteps', 'ActivityFeeds', 'Messaging', 'Tabs', 'Tables', 'Breadcrumbs', 'Alerts', 'DatePickers', 'FileUpload', 'ContentDividers', 'LoadingIndicators', 'EmptyStates', 'CodeSnippets'] },
  { group: 'Marketing sections', items: ['MHeaderNavigation', 'MHero', 'MHeaderSection', 'MFeatures', 'MPricing', 'MCTA', 'MMetrics', 'MNewsletter', 'MTestimonials', 'MSocialProof', 'MBlog', 'MContent', 'MContact', 'MTeam', 'MCareers', 'MFAQ', 'MFooters', 'MBanners'] },
  { group: 'Templates', items: ['TAuth', 'TNotFound', 'TEmail'] },
  { group: 'Example pages', items: ['PMarketing', 'PDashboards', 'PSettings', 'PInformational'] },
];
const labels: Record<string, string> = { ALogos: 'Logos', AMockups: 'Device mockups', ABackgrounds: 'Backgrounds', ADecorations: 'Hand-drawn', AMedia: 'Media & cards', AWysiwyg: 'Rich text editor', MHeaderNavigation: 'Header navigation', MHero: 'Hero headers', MHeaderSection: 'Header sections', MFeatures: 'Features', MPricing: 'Pricing', MCTA: 'CTA', MMetrics: 'Metrics', MNewsletter: 'Newsletter CTA', MTestimonials: 'Testimonials', MSocialProof: 'Social proof', MBlog: 'Blog', MContent: 'Content', MContact: 'Contact', MTeam: 'Team', MCareers: 'Careers', MFAQ: 'FAQ', MFooters: 'Footers', MBanners: 'Banners & divider', TAuth: 'Log in & sign up', TNotFound: '404 pages', TEmail: 'Email templates', PMarketing: 'Marketing pages (113)', PDashboards: 'Dashboards (30)', PSettings: 'Settings (40)', PInformational: 'Informational (30)' };
const label = (s: string) => labels[s] ?? s.replace(/([a-z])([A-Z])/g, '$1 $2');
const read = () => new URLSearchParams(location.search).get('section') ?? 'Foundations';

function App() {
  const [current, setCurrent] = useState(read);
  useEffect(() => { const on = () => setCurrent(read()); window.addEventListener('popstate', on); return () => window.removeEventListener('popstate', on); }, []);
  const go = (s: string) => { history.pushState(null, '', `?section=${s}`); setCurrent(s); window.scrollTo(0, 0); };
  const Current = sections[current] ?? sections.Foundations;
  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 overflow-y-auto border-r border-gray-200 px-4 py-6 lg:block">
        <div className="mb-6 flex items-center gap-2 px-2">
          <div className="size-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700" />
          <div><div className="text-md font-semibold">Tinicorn UI</div><div className="text-xs text-gray-500">React · Tailwind v4</div></div>
        </div>
        {nav.map((g) => (
          <div key={g.group} className="mb-5">
            <div className="mb-1 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">{g.group}</div>
            {g.items.map((i) => (
              <a key={i} href={`?section=${i}`} onClick={(e) => { e.preventDefault(); go(i); }} className={`block rounded-md px-2 py-1.5 text-sm font-medium ${current === i ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>{label(i)}</a>
            ))}
          </div>
        ))}
      </aside>
      <main className="min-w-0 flex-1 px-6 lg:px-10">
        <select className="mt-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm lg:hidden" value={current} onChange={(e) => go(e.target.value)}>
          {nav.map((g) => (<optgroup key={g.group} label={g.group}>{g.items.map((i) => <option key={i} value={i}>{label(i)}</option>)}</optgroup>))}
        </select>
        <Current key={current} />
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
