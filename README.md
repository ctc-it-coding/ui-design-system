# @tinicorn/ui

React + TypeScript + Tailwind CSS v4 component library converted from the Tinicorn Figma design system
(`ui-design-system.fig`, "PRO STYLES v4.0").

> ไลบรารี React ที่แปลงมาจาก Figma design system ของ Tinicorn — Foundations (สี, ตัวอักษร, เงา, spacing),
> ไอคอน 1,172 ตัว และ component ทั้งหมดในหมวด Shared components + Application components

## Quick start

```bash
npm install
npm run dev        # showcase: every component, section and the 213 example pages at http://localhost:5173
npm run build      # library build → dist/ (ESM + .d.ts)
npm run typecheck
```

### Use in an app (Tailwind v4)

```css
/* app.css */
@import "tailwindcss";
@import "@tinicorn/ui/theme.css";
@source "../node_modules/@tinicorn/ui/src";
```

```tsx
import { Button, Input, Badge, Modal } from '@tinicorn/ui';
import { Plus, Mail01 } from '@tinicorn/ui/icons';

<Button hierarchy="primary" size="md" iconLeading={Plus}>New project</Button>
<Input label="Email" iconLeading={Mail01} hint="We'll never share it." />
<Badge color="success" type="pill-color" dot>Active</Badge>
```

Load the **Inter** font (e.g. `https://rsms.me/inter/inter.css`) — the theme uses it as `font-sans`.

## What's inside

| Area | Contents |
|---|---|
| **Theme** `src/styles/theme.css` | 29 color palettes (25–950) incl. `brand` (#7f56d9), semantic colors, type scale `text-xs…text-xl`, `text-display-xs…2xl`, shadows `xs…3xl`, focus-ring utilities |
| **Tokens** `src/tokens` | the same values as JS objects (`colors`, `fontSize`, `shadows`, `spacing`, `radius`) |
| **Icons** `src/icons` | 1,172 line icons (24×24, 2px stroke, `currentColor`) — PascalCase of the Figma name: `chevron-down` → `ChevronDown`; `size`, `strokeWidth`, `title` props |
| **Shared components** | Button, CloseButton, SocialButton, ButtonGroup, Badge, BadgeGroup, Tag, Input, Textarea, TagInput, VerificationCodeInput, Select, MultiSelect, DropdownMenu, Toggle, Checkbox, Radio, CheckboxGroup, RadioGroup, ChoiceCard, Avatar, AvatarGroup, AvatarLabelGroup, AvatarProfilePhoto, Tooltip, HelpIcon, ProgressBar, ProgressCircle, Slider, FeaturedIcon, SocialIcon, PaymentIcon, FileTypeIcon, Flag, StarIcon/RatingStars, CheckIcon |
| **Application components** | PageHeader, CardHeader, SectionHeader, SectionLabel, SectionFooter, SidebarNavigation, HeaderNavigation, NavItem…, Modal (+ConfirmModal), CommandMenu, LineChart, BarChart, PieChart/DonutChart, ActivityGauge, RadarChart, MetricItem, SlideoutMenu, InlineCTA, Pagination, PaginationDots, CarouselImage, progress steps, ActivityFeed, Message, Tabs, VerticalTabs, Table/DataTable/TableCard, Breadcrumbs, Alert, Notification + `toast()`, Calendar, DatePicker, DateRangePicker, FileUpload, ContentDivider, LoadingIndicator, EmptyState, CodeSnippet |

### Conventions
* Props mirror Figma variant properties in kebab-case: `Hierarchy=Secondary gray` → `hierarchy="secondary-gray"`.
  Where Figma uses "Style", the prop is `variant` (because `style` is reserved).
* Hover / focus / disabled are CSS states, never props. Focus rings follow Figma: `ring-4 ring-brand-500/24`.
* Stateful components support controlled and uncontrolled use (`value`/`defaultValue`/`onChange`, `open`/`defaultOpen`/`onOpenChange`).
* No runtime dependencies besides `react`, `clsx`, `tailwind-merge`. Menus, modals, tabs, sliders etc. implement keyboard + ARIA themselves.
* Breakpoint=Mobile variants are responsive classes on the same component.

## Marketing sections — `@tinicorn/ui/marketing`

Every set on the Figma "MARKETING WEBSITE COMPONENTS" pages, with **every Figma `Type`/`Theme` as a prop**. Every section renders the Figma copy when called with no props; pass your own content through props.

```tsx
import { MarketingHeaderNav, HeroHeaderSection, FeaturesSection, CTASection, MarketingFooter } from '@tinicorn/ui/marketing';

<HeroHeaderSection type="split-image-03" nav={<MarketingHeaderNav variant="dropdown" />} title="Ship faster" />
<FeaturesSection type="tabs-mockup-06" />
<CTASection type="card-horizontal" theme="gray-light" />
<MarketingFooter type="large-12" />
```

MarketingHeaderNav (14 menu types), MarketingBanner, SectionDivider, HeroHeaderSection (45 types), HeaderSection, FeaturesSection (42), MetricsSection, SocialProofSection, PressMentionsSection, PricingSection, PricingPageHeader, PricingTierCard, PricingTable, CTASection (24), NewsletterCTASection, TestimonialSection, BlogSection, BlogPageHeader, BlogPostCard, BlogPostPageHeader (with article body + TOC), ContentSection, ContentItem, ContactSection (20), ContactPageHeader, TeamSection, CareersSection, FAQSection, MarketingFooter (20 types) and their sub-parts.

## Templates — `@tinicorn/ui/templates`
* `LogIn` (17 layouts), `SignUp` (21 layouts incl. multi-step), `ForgotPassword`, `EmailVerification` — full screens with working forms.
* `NotFoundSection` (14 types).
* `EmailTemplate` (10 types) + `EmailHeader`/`EmailFooter` — table layout with inline styles so they work in email clients;
  `renderEmailHtml()` from `@tinicorn/ui/templates/email/render` turns one into an HTML string.

## Example pages — `@tinicorn/ui/pages` (213 pages)
| Figma page | Components |
|---|---|
| Landing, Pricing, Blogs, Blog posts, About, Contact, Team, Legal, FAQ, Log in, Sign up, 404 | `LandingPage01…`, `PricingPage01…` … (113 pages, generated from the Figma composition) |
| Dashboards 01 / 02 | `Dashboard01Page01…15`, `Dashboard02Page01…15` |
| Settings pages 01 / 02 | `Settings01Page01…20`, `Settings02Page01…20` |
| Informational pages 01 / 02 | `Informational01Page01…15`, `Informational02Page01…15` |

Each entry also exports a list (`marketingPageList`, `dashboardPageList`, `settingsPageList`, `informationalPageList`) for building navigation.

## Assets
Logos (`TinicornLogo`, 24 `CompanyLogo`s, 11 `PressLogo`s), device mockups (`ScreenMockup`, `IPhoneMockup`, `MacbookMockup`),
backgrounds (`SectionBackgroundPattern`, `BackgroundPatternDecorative`, `BackgroundMask`, `BackgroundOverlay`, `LinePattern`),
hand-drawn decorations (arrows, underlines, accents, scribbles), `VideoPlayer`, `PlayButton`, `CreditCardMockup`, `AppStoreBadge`,
`RichTextEditor` + `WysiwygToolbar` — all vector art exported from the Figma file.

## Known simplifications
* Photos/screenshots are bitmaps inside the `.fig` and aren't bundled: every image slot takes a `src` prop and shows a gradient placeholder by default; avatars fall back to initials.
* Some vector illustrations (maps, abstract shapes, empty-state illustrations) are simplified redraws. Chart data on the example pages is generated to match the Figma shapes.
* Where Figma copy was hidden inside instances, sensible placeholder text was used. "Untitled" placeholder brand text was replaced with "Tinicorn"; the `TinicornLogo` wordmark defaults to `TINICORN` — pass `wordmark` to change it.
* Popovers (Select, DatePicker, Tooltip) don't do collision detection. Values that were inconsistent between Figma variants were normalised.
* Icons live in a separate entry (`@tinicorn/ui/icons`) because some icon names match component names (`Calendar`, `Table`).

## Regenerating from Figma
The `scripts/figma/` folder contains the decoder used to read the `.fig` file (kiwi format), dump component specs and
export icons — see `scripts/figma/README.md`.
