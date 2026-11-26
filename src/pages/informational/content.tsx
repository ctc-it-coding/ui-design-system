/* Content fragments (profiles, listings, messaging, project overview, activity) for the Informational pages. */
import { Fragment, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import {
  Attachment01,
  Calendar,
  CurrencyDollar,
  FaceSmile,
  FilterLines,
  Grid01,
  Heart,
  Home02,
  Copy01,
  List,
  Mail01,
  MarkerPin02,
  Phone,
  Plus,
  SearchLg,
  Send01,
  Star01,
  UserPlus01,
  Wifi,
  Zap,
} from '../../icons';
import { Button } from '../../components/buttons';
import { Badge } from '../../components/badges';
import { Avatar, AvatarLabelGroup, AvatarProfilePhoto } from '../../components/avatars';
import { Input, Textarea } from '../../components/inputs';
import { Select } from '../../components/dropdowns';
import { ButtonGroup, ButtonGroupItem } from '../../components/button-groups';
import { ContentDivider } from '../../components/content-divider';
import { Message, type MessageReactionItem } from '../../components/messaging';
import { CardHeader } from '../../components/headers';
import { Flag, RatingStars, type FlagCode } from '../../components/misc-icons';
import { ActivityFeed, type FeedItemProps } from '../../components/activity-feed';
import { FeaturedIcon } from '../../components/featured-icons';
import { FileUploadDropzone } from '../../components/file-upload';
import { ImagePlaceholder } from '../../marketing/_shared';
import { ContactMapMockup, MapLocationMarker } from '../../marketing/contact/Maps';
import { initialsOf } from './parts';

/* ------------------------------------------------------------------------------------------------
 * Copy
 * ---------------------------------------------------------------------------------------------- */

export const ABOUT_ME = [
  "I'm a Product Designer based in Melbourne, Australia. I enjoy working on product design, design systems, and Webflow projects, but I don't take myself too seriously.",
  'I’ve worked with some of the world’s most exciting companies, including Coinbase, Stripe, and Linear. I’m passionate about helping startups grow, improve their UX and customer experience, and to raise venture capital through good design.',
  'My work has been featured on Typewolf, Mindsparkle Magazine, Webflow, Fonts In Use, CSS Winner, httpster, Siteinspire, and Best Website Gallery.',
];

export const PROJECT_COPY = {
  callout: 'Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.',
  about: [
    'Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla. Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus.',
    'Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci.',
    'Non pellentesque congue eget consectetur turpis.',
    'Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci.',
  ],
  audience: [
    'Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci.',
    'Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.',
    'Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.',
  ],
  success: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque tellus vel pretium posuere. Id maecenas a tristique in fusce hendrerit. Amet, mattis in vitae, est urna, diam. Ante fringilla nulla at sed tincidunt. Et aliquam neque cras mauris non bibendum. Hac ut ridiculus enim urna felis amet. Dolor aliquam diam suspendisse non elit faucibus id orci, mi.',
    'Pharetra nam gravida commodo accumsan sapien aliquet bibendum purus nunc. Quam cursus at eu, aliquam integer. Accumsan, nisi ultricies ut pulvinar fames neque risus. Eu et, elementum leo amet bibendum gravida vitae ridiculus.',
  ],
};

function Paragraphs({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={cx('flex flex-col gap-4 text-md text-gray-600', className)}>
      {items.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Profile
 * ---------------------------------------------------------------------------------------------- */

export interface ProfileInfo {
  name: string;
  location?: string;
  flag?: FlagCode;
  website: string;
  portfolio: string;
  email: string;
}

export function DetailItem({ label, children, labelClassName, className }: { label: ReactNode; children?: ReactNode; labelClassName?: string; className?: string }) {
  return (
    <div className={cx('flex min-w-0 flex-col gap-2', className)}>
      <p className={cx('text-sm font-medium text-gray-600', labelClassName)}>{label}</p>
      {children}
    </div>
  );
}

const linkValue = (text: string, href = '#') => (
  <Button as="a" href={href} size="lg" hierarchy="link-color" className="w-fit max-w-full justify-start truncate">
    {text}
  </Button>
);

/** "Location / Website / Portfolio / Email" detail list. */
export function ProfileDetails({ info, className, itemClassName, labelClassName }: { info: ProfileInfo; className?: string; itemClassName?: string; labelClassName?: string }) {
  return (
    <div className={className}>
      <DetailItem label="Location" className={itemClassName} labelClassName={labelClassName}>
        <div className="flex items-center gap-2">
          <Flag code={info.flag ?? 'AU'} size={20} title="" />
          <span className="text-md font-medium text-gray-700">{info.location ?? 'Melbourne, Australia'}</span>
        </div>
      </DetailItem>
      <DetailItem label="Website" className={itemClassName} labelClassName={labelClassName}>
        {linkValue(info.website)}
      </DetailItem>
      <DetailItem label="Portfolio" className={itemClassName} labelClassName={labelClassName}>
        {linkValue(info.portfolio)}
      </DetailItem>
      <DetailItem label="Email" className={itemClassName} labelClassName={labelClassName}>
        {linkValue(info.email, `mailto:${info.email}`)}
      </DetailItem>
    </div>
  );
}

export function AboutMe({ title = 'About me', titleClassName = 'text-md', paragraphs = ABOUT_ME, className }: { title?: ReactNode; titleClassName?: string; paragraphs?: string[]; className?: string }) {
  return (
    <div className={cx('flex flex-col gap-5', className)}>
      <div className="flex flex-col gap-2">
        {title != null && <h3 className={cx('font-medium text-gray-900', titleClassName)}>{title}</h3>}
        <Paragraphs items={paragraphs} />
      </div>
      <Button size="md" hierarchy="link-color" className="w-fit">
        Read more
      </Button>
    </div>
  );
}

export interface Job {
  title: string;
  company: string;
  dates: string;
}

export const JOBS: Job[] = [
  { title: 'Lead Product Designer', company: 'Layers', dates: 'May 2020 – Present' },
  { title: 'Product Designer', company: 'Spherule', dates: 'Jan 2018 – May 2020' },
  { title: 'UX Designer', company: 'Acme Group', dates: 'Mar 2017 – Jan 2018' },
  { title: 'Visual Designer', company: 'CloudWatch', dates: 'Apr 2015 – Mar 2017' },
];

/** Figma "_Job card desktop" / "_Job card mobile". */
export function JobCard({ job, className }: { job: Job; className?: string }) {
  return (
    <div className={cx('flex flex-col rounded-xl border border-gray-200 bg-white shadow-xs', className)}>
      <div className="flex flex-1 flex-col gap-6 p-5 md:p-6">
        <div className="flex items-center gap-3">
          <Avatar size="lg" initials={initialsOf(job.company)} alt={job.company} />
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="truncate text-md font-medium text-gray-900">{job.title}</p>
            <p className="truncate text-sm text-gray-600">{job.company}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600">{job.dates}</p>
      </div>
      <div className="flex flex-col gap-4 pb-4">
        <div className="h-px bg-gray-200" />
        <div className="flex justify-end px-4 md:px-6">
          <Button size="sm" hierarchy="secondary-gray">
            View project
          </Button>
        </div>
      </div>
    </div>
  );
}

export function JobGrid({ jobs = JOBS, className }: { jobs?: Job[]; className?: string }) {
  return (
    <div className={cx('grid grid-cols-1 gap-5 md:gap-6', className)}>
      {jobs.map((j) => (
        <JobCard key={j.title + j.company} job={j} />
      ))}
    </div>
  );
}

const tones = ['gray', 'cool', 'warm', 'brand'] as const;

/** Grid of project / gallery images (gradient placeholders). */
export function ImageGrid({ count = 4, className, itemClassName, rounded = 'rounded-xl' }: { count?: number; className?: string; itemClassName?: string; rounded?: string }) {
  return (
    <div className={cx('grid gap-5 md:gap-6', className)}>
      {Array.from({ length: count }, (_, i) => (
        <ImagePlaceholder key={i} tone={tones[i % tones.length]} className={cx(rounded, itemClassName)} />
      ))}
    </div>
  );
}

export const SOCIALS = ['x', 'linkedin', 'github', 'dribbble', 'figma'] as const;

/* ------------------------------------------------------------------------------------------------
 * Listings (Figma "_Listing search result desktop / mobile")
 * ---------------------------------------------------------------------------------------------- */

export interface Listing {
  category: string;
  title: string;
  location: string;
  rating: number;
  reviews: string;
  price: string;
}

export const LISTINGS: Listing[] = [
  { category: 'Entire apartment rental in Collingwood', title: 'A Stylish Apt, 5 min walk to Queen Victoria Market', location: 'Collingwood VIC', rating: 4.9, reviews: '202 reviews', price: '$540' },
  { category: 'Entire loft in central business district', title: 'Designer NY style loft', location: 'Melbourne VIC', rating: 4.8, reviews: '44 reviews', price: '$620' },
  { category: 'Entire rental unit in Carlton', title: '5 minute walk from University of Melbourne', location: 'Carlton VIC', rating: 4.7, reviews: '82 reviews', price: '$490' },
  { category: 'Entire apartment rental in Collingwood', title: 'Magnificent apartment next to public transport', location: 'Collingwood VIC', rating: 4.8, reviews: '12 reviews', price: '$600' },
];

function IconText({ icon: I, children }: { icon: typeof MarkerPin02; children: ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-md font-medium whitespace-nowrap text-gray-600">
      <I className="size-5 text-gray-400" aria-hidden />
      {children}
    </span>
  );
}

export function ListingResult({ listing, index = 0 }: { listing: Listing; index?: number }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs md:flex-row md:gap-5 md:p-4">
      <ImagePlaceholder tone={tones[index % tones.length]} className="h-44 shrink-0 md:h-36 md:w-50 md:rounded-lg">
        <div className="absolute inset-0 bg-linear-to-b from-black/0 to-black/30 md:hidden" aria-hidden />
        <Badge size="sm" type="pill-color" color="brand" iconLeading={Zap} className="absolute top-3 left-3 md:top-2 md:left-2">
          Rare find
        </Badge>
        <Button
          size="lg"
          hierarchy="secondary-gray"
          iconLeading={Heart}
          aria-label="Save"
          className="absolute top-3 right-3 border-white/60 bg-white/50 text-white backdrop-blur-md md:hidden"
        />
      </ImagePlaceholder>
      <div className="flex min-w-0 flex-1 flex-col gap-4 px-4 pt-5 pb-4 md:p-0">
        <div className="flex gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="text-sm font-semibold text-brand-700">{listing.category}</p>
            <h3 className="text-lg font-medium text-gray-900">{listing.title}</h3>
          </div>
          <Button size="lg" hierarchy="secondary-color" iconLeading={Heart} aria-label="Save" className="max-md:hidden" />
        </div>
        <div className="flex items-center gap-2">
          <RatingStars value={listing.rating} />
          <span className="flex items-center gap-2 text-md font-medium">
            <span className="text-gray-900">{listing.rating}</span>
            <span className="text-gray-600">{listing.reviews}</span>
          </span>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <IconText icon={MarkerPin02}>{listing.location}</IconText>
            <IconText icon={Home02}>1 bed</IconText>
            <IconText icon={Wifi}>Wi-Fi</IconText>
          </div>
          <p className="flex items-end gap-2 max-md:order-first">
            <span className="text-xl font-medium text-gray-900 md:text-lg">{listing.price}</span>
            <span className="pb-0.5 text-md text-gray-600">AUD total</span>
          </p>
        </div>
      </div>
    </article>
  );
}

export function ListingResults({ listings = LISTINGS }: { listings?: Listing[] }) {
  return (
    <div className="flex flex-col gap-4">
      {listings.map((l, i) => (
        <ListingResult key={i} listing={l} index={i} />
      ))}
    </div>
  );
}

/** Two-row listing filters bar (Figma "Filters bar" with Input dropdowns). Mobile: search + filters button. */
export function ListingFilters() {
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <div className="flex items-center justify-between gap-3 max-md:hidden">
        <div className="flex flex-wrap gap-3">
          <Select
            className="w-50"
            iconLeading={MarkerPin02}
            defaultValue="mel"
            items={[
              { value: 'mel', label: 'Melbourne, AU' },
              { value: 'syd', label: 'Sydney, AU' },
            ]}
          />
          <Select
            className="w-50"
            iconLeading={Calendar}
            defaultValue="jan"
            items={[
              { value: 'jan', label: 'Jan 6 – Jan 13' },
              { value: 'feb', label: 'Feb 6 – Feb 13' },
            ]}
          />
          <Select
            className="w-42"
            iconLeading={CurrencyDollar}
            placeholder="Any price"
            items={[
              { value: 'lt500', label: 'Under $500' },
              { value: 'gt500', label: '$500+' },
            ]}
          />
        </div>
        <Button hierarchy="secondary-gray" iconLeading={FilterLines}>
          More filters
        </Button>
      </div>
      <div className="flex flex-col gap-3 md:flex-row">
        <Input className="flex-1" iconLeading={SearchLg} placeholder="Search" aria-label="Search" />
        <div className="flex gap-3 max-md:hidden">
          <Button size="lg" hierarchy="secondary-gray">
            Clear
          </Button>
          <Button size="lg">Search</Button>
        </div>
        <Button hierarchy="secondary-gray" iconLeading={FilterLines} className="md:hidden">
          2 filters applied
        </Button>
      </div>
    </div>
  );
}

export function ListingSortBar() {
  return (
    <div className="flex items-center justify-between gap-3">
      <ButtonGroup defaultValue="price">
        <ButtonGroupItem value="price">Sort by price</ButtonGroupItem>
        <ButtonGroupItem value="date">Sort by date</ButtonGroupItem>
      </ButtonGroup>
      <ButtonGroup defaultValue="list">
        <ButtonGroupItem value="grid" iconLeading={Grid01} aria-label="Grid view" />
        <ButtonGroupItem value="list" iconLeading={List} aria-label="List view" />
      </ButtonGroup>
    </div>
  );
}

const MARKERS: [number, number][] = [
  [18, 22], [34, 14], [52, 30], [70, 18], [26, 48], [46, 56], [64, 46], [82, 38], [38, 76], [60, 72], [78, 64], [14, 70],
];

/** Figma "_Google maps mockup" with "_Map location marker"s. */
export function ListingMap({ className, markers = 10 }: { className?: string; markers?: number }) {
  return (
    <div className={cx('relative overflow-hidden', className)}>
      <ContactMapMockup className="absolute inset-0 min-h-0" />
      {MARKERS.slice(0, markers).map(([x, y], i) => (
        <MapLocationMarker
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${x}%`, top: `${y}%` }}
          label={LISTINGS[i % LISTINGS.length]!.location}
          supportingText={LISTINGS[i % LISTINGS.length]!.price + ' AUD total'}
          flag="AU"
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Messaging
 * ---------------------------------------------------------------------------------------------- */

export type ChatEntry =
  | { divider: string }
  | {
      sent?: boolean;
      name?: string;
      time?: string;
      text?: ReactNode;
      attachment?: { name: string; size: string };
      reactions?: MessageReactionItem[];
      writing?: boolean;
    };

const REACTIONS: MessageReactionItem[] = [{ emoji: '❤️' }, { emoji: '👌', count: 1 }];

/** Standard conversation from the Figma examples (Thursday / Today). */
export function conversation(contact: string, variant: 'received-reactions' | 'sent-reactions' = 'received-reactions'): ChatEntry[] {
  return [
    { divider: 'Thursday' },
    { name: contact, time: 'Thursday 10:16am', text: 'Thanks Olivia! Almost there. I’ll work on making those changes you suggested and will shoot it over.' },
    { name: contact, time: 'Thursday 11:40am', text: 'Hey Olivia, I’ve finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.' },
    { name: contact, time: 'Thursday 11:40am', attachment: { name: 'Tech requirements.pdf', size: '1.2 MB' } },
    { sent: true, name: 'You', time: 'Thursday 11:41am', text: 'Awesome! Thanks. I’ll look at this today.' },
    { name: contact, time: 'Thursday 11:44am', text: 'No rush though — we still have to wait for Lana’s designs.', reactions: variant === 'received-reactions' ? REACTIONS : undefined },
    { divider: 'Today' },
    { name: contact, time: 'Today 2:20pm', text: 'Hey Olivia, can you please review the latest design when you can?' },
    { sent: true, name: 'You', time: 'Just now', text: 'Sure thing, I’ll have a look today. They’re looking great!', reactions: variant === 'sent-reactions' ? REACTIONS : undefined },
    { name: contact, writing: true },
  ];
}

/** Message list grouped by day dividers. `narrow` = side-panel widths (312px bubbles). */
export function ChatMessages({ entries, narrow, className }: { entries: ChatEntry[]; narrow?: boolean; className?: string }) {
  const groups: { label?: string; items: Exclude<ChatEntry, { divider: string }>[] }[] = [];
  for (const e of entries) {
    if ('divider' in e) groups.push({ label: e.divider, items: [] });
    else {
      if (!groups.length) groups.push({ items: [] });
      groups[groups.length - 1]!.items.push(e);
    }
  }
  return (
    <div className={cx('flex flex-col gap-6', className)}>
      {groups.map((g, gi) => (
        <Fragment key={gi}>
          {g.label && (
            <ContentDivider type="text" variant="single-line">
              {g.label}
            </ContentDivider>
          )}
          <div className="flex flex-col gap-4">
            {g.items.map((m, i) => (
              <div key={i} className={cx('flex w-full', m.sent && 'justify-end')}>
                <Message
                  type={m.sent ? 'sent' : 'received'}
                  name={m.name}
                  time={m.time}
                  avatarInitials={m.sent ? undefined : initialsOf(m.name ?? '')}
                  attachment={m.attachment}
                  writing={m.writing}
                  reactions={m.reactions}
                  className={cx(m.sent ? (narrow ? 'max-w-[272px]' : 'max-w-[442px]') : narrow ? 'max-w-[312px]' : 'max-w-[560px]', 'w-auto min-w-0 flex-1 md:flex-none', !m.sent && 'md:w-full')}
                >
                  {m.text}
                </Message>
              </div>
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

/** Figma "Message input" — textarea with attachment / emoji icon buttons and Send. */
export function MessageComposer({ className }: { className?: string }) {
  return (
    <div className={cx('relative', className)}>
      <Textarea placeholder="Send a message" aria-label="Message" rows={3} textareaClassName="h-[104px] resize-none pb-14" />
      <div className="absolute right-3 bottom-3 flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          <Button size="sm" hierarchy="tertiary-gray" iconLeading={Attachment01} aria-label="Attach file" />
          <Button size="sm" hierarchy="tertiary-gray" iconLeading={FaceSmile} aria-label="Add emoji" />
        </div>
        <Button size="md">Send</Button>
      </div>
    </div>
  );
}

/** Compact single-line message input (side panel). */
export function MessageInputInline({ className }: { className?: string }) {
  return (
    <div className={cx('flex gap-3', className)}>
      <Input className="flex-1" placeholder="Message" aria-label="Message" />
      <Button size="lg" iconLeading={Send01} aria-label="Send" />
    </div>
  );
}

export interface Conversation {
  name: string;
  handle: string;
  time: string;
  preview: string;
  unread?: boolean;
}

export const CONVERSATIONS: Conversation[] = [
  { name: 'Phoenix Baker', handle: '@phoenix', time: '5min ago', preview: 'Hey Olivia, Katherine sent me over the latest doc. I just have a quick question about the...', unread: true },
  { name: 'Katherine Moss', handle: '@kathy', time: '20min ago', preview: 'You: Sure thing, I’ll have a look today. They’re looking great!' },
  { name: 'Mollie Hall', handle: '@mollie', time: '1hr ago', preview: 'I’ve just published the site again. Looks like it fixed it. How weird! I’ll keep an eye on it...', unread: true },
  { name: 'Rosalee Melvin', handle: '@rosalee', time: '2hr ago', preview: 'Hey Liv — just wanted to say thanks for chasing up the release for me. Really...', unread: true },
  { name: 'Anaiah Whitten', handle: '@analah', time: '2hr ago', preview: 'Good news!! Jack accepted the offer. I’ve sent over a contract for him to review but...' },
  { name: 'Koray Okumus', handle: '@koray', time: '4hr ago', preview: 'Thanks! Looks great!' },
  { name: 'Eva Bond', handle: '@eva', time: '4hr ago', preview: 'The press release went out! It’s been picked up by a few people... Here’s the link if you...' },
];

/** Figma "_Message" — conversation list row. */
export function ConversationItem({ c, selected }: { c: Conversation; selected?: boolean }) {
  return (
    <button
      type="button"
      aria-current={selected || undefined}
      className={cx(
        'flex w-full cursor-pointer flex-col gap-4 border-b border-gray-200 p-4 text-left outline-none transition-colors hover:bg-gray-50 focus-visible:bg-gray-50',
        selected && 'bg-gray-50',
      )}
    >
      <div className="flex w-full items-start gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className={cx('size-2 shrink-0 rounded-full', c.unread ? 'bg-brand-500' : 'bg-transparent')} aria-label={c.unread ? 'Unread' : undefined} />
          <AvatarLabelGroup size="md" initials={initialsOf(c.name)} title={c.name} subtitle={c.handle} status="online" />
        </div>
        <span className="shrink-0 text-sm text-gray-600">{c.time}</span>
      </div>
      <p className="line-clamp-2 pl-5 text-sm text-gray-600">{c.preview}</p>
    </button>
  );
}

/** Left column of the inbox: "Messages 40" card header, search and conversation list. */
export function ConversationList({ conversations = CONVERSATIONS, selected = 1, className }: { conversations?: Conversation[]; selected?: number; className?: string }) {
  return (
    <div className={cx('flex flex-col bg-white', className)}>
      <CardHeader
        title="Messages"
        badge={
          <Badge size="sm" type="pill-outline" color="gray">
            40
          </Badge>
        }
        actions={<Button size="md" hierarchy="secondary-gray" iconLeading={Plus} aria-label="New message" />}
        divider={false}
      />
      <div className="px-4 pb-3">
        <Input iconLeading={SearchLg} placeholder="Search" aria-label="Search messages" />
      </div>
      <div className="border-t border-gray-200">
        {conversations.map((c, i) => (
          <ConversationItem key={c.handle} c={c} selected={i === selected} />
        ))}
      </div>
    </div>
  );
}

/** Figma "Card header" Avatar=True used above a conversation. */
export function ChatHeader({ name, handle }: { name: string; handle: string }) {
  return (
    <CardHeader
      title={name}
      avatarInitials={initialsOf(name)}
      badge={
        <Badge size="sm" type="pill-color" color="success" dot>
          Online
        </Badge>
      }
      supportingText={handle}
      actions={
        <>
          <Button size="md" hierarchy="tertiary-gray" iconLeading={Phone} className="max-md:hidden">
            Call
          </Button>
          <Button size="md" hierarchy="secondary-gray" className="max-md:hidden">
            Archive
          </Button>
          <Button size="md">View profile</Button>
        </>
      }
      onMenuClick={() => {}}
    />
  );
}

/** Conversation column: messages bottom-aligned above the composer. */
export function ChatColumn({ entries, header, className, scroll = true }: { entries: ChatEntry[]; header?: ReactNode; className?: string; scroll?: boolean }) {
  return (
    <div className={cx('flex min-w-0 flex-col bg-white', className)}>
      {header}
      <div className={cx('flex flex-1 flex-col px-4 pt-6 pb-8 md:px-6', scroll && 'lg:min-h-0 lg:overflow-y-auto')}>
        <ChatMessages entries={entries} className="mt-auto" />
      </div>
      <div className="px-4 pb-4 md:px-6 md:pb-6">
        <MessageComposer />
      </div>
    </div>
  );
}

export function WorkExperience({ jobs = JOBS.slice(0, 3), title = 'Work experience' }: { jobs?: Job[]; title?: string }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium text-gray-700">{title}</p>
      {jobs.map((j) => (
        <div key={j.title} className="flex gap-3">
          <Avatar size="lg" initials={initialsOf(j.company)} alt={j.company} />
          <div className="flex min-w-0 flex-1 flex-col gap-2 text-sm">
            <div className="flex flex-col">
              <p className="font-medium text-gray-700">{j.title}</p>
              <p className="text-gray-600">{j.company}</p>
            </div>
            <p className="text-gray-600">{j.dates}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Contact profile side panel (cover, avatar, actions, about, work experience). */
export function ContactPanel({ name, email, nameWeight = 'font-medium', badges = true, iconActions = 3, className }: { name: string; email: string; nameWeight?: string; badges?: boolean; iconActions?: number; className?: string }) {
  const icons = [Mail01, Phone, Star01].slice(0, iconActions);
  return (
    <aside className={cx('flex flex-col gap-6 bg-white pb-6', className)}>
      <div className="flex flex-col">
        <div className="h-30 w-full bg-linear-to-br from-brand-200 via-pink-200 to-orange-200" aria-hidden />
        <div className="-mt-8 flex flex-col gap-4 px-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-end justify-between gap-6">
              <AvatarProfilePhoto size="md" initials={initialsOf(name)} alt={name} />
              <div className="flex items-center gap-3">
                {icons.map((I, i) => (
                  <Button key={i} size="sm" hierarchy="secondary-gray" iconLeading={I} aria-label={['Email', 'Call', 'Favourite'][i]} />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h2 className={cx('text-display-xs text-gray-900', nameWeight)}>{name}</h2>
                <span className="size-2.5 rounded-full bg-success-500 ring-[1.5px] ring-white" aria-label="Online" />
              </div>
              <p className="text-md text-gray-600">{email}</p>
            </div>
          </div>
          {badges && (
            <div className="flex flex-wrap gap-1">
              {['UX Design', 'Product Design', 'Webflow'].map((b) => (
                <Badge key={b} size="sm" type="badge-modern" color="gray">
                  {b}
                </Badge>
              ))}
              <Badge size="sm" type="badge-modern" color="gray" iconLeading={Plus} aria-label="Add tag" />
            </div>
          )}
          <div className="flex items-center gap-3">
            <Button size="md" hierarchy="secondary-gray">
              Add to project
            </Button>
            <Button size="md">View projects</Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 px-6">
        <div className="flex flex-col gap-1 text-sm">
          <p className="font-medium text-gray-700">About</p>
          <p className="text-gray-600">I&apos;m a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development.</p>
        </div>
        <WorkExperience />
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Project overview article
 * ---------------------------------------------------------------------------------------------- */

export type ArticleBlock = 'callout' | 'callout-bordered' | 'about' | 'about-lg' | 'images-add' | 'images-3' | 'images-upload' | 'audience' | 'success';

function ArticleSection({ title, paragraphs, titleClassName = 'text-md' }: { title: string; paragraphs: string[]; titleClassName?: string }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className={cx('font-medium text-gray-900', titleClassName)}>{title}</h3>
      <Paragraphs items={paragraphs} />
    </section>
  );
}

/** Figma project overview content: callout, "About the company", images, "Target audience", "What does success look like?". */
export function ProjectArticle({ blocks, className }: { blocks: ArticleBlock[]; className?: string }) {
  return (
    <div className={cx('flex max-w-[720px] flex-col gap-8', className)}>
      {blocks.map((b) => {
        switch (b) {
          case 'callout':
          case 'callout-bordered':
            return (
              <div key={b} className={cx('rounded-lg bg-gray-50 p-4 text-md font-medium text-gray-700', b === 'callout-bordered' && 'border border-gray-200')}>
                {PROJECT_COPY.callout}
              </div>
            );
          case 'about':
          case 'about-lg':
            return <ArticleSection key={b} title="About the company" paragraphs={PROJECT_COPY.about} titleClassName={b === 'about-lg' ? 'text-lg' : 'text-md'} />;
          case 'audience':
            return <ArticleSection key={b} title="Target audience" paragraphs={PROJECT_COPY.audience} />;
          case 'success':
            return <ArticleSection key={b} title="What does success look like?" paragraphs={PROJECT_COPY.success} />;
          case 'images-3':
            return (
              <div key={b} className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
                {[0, 1, 2].map((i) => (
                  <ImagePlaceholder key={i} tone={tones[i]} className="h-44 rounded-2xl md:h-36" />
                ))}
              </div>
            );
          default:
            return (
              <div key={b} className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                {[0, 1, 2].map((i) => (
                  <ImagePlaceholder key={i} tone={tones[i]} className="h-44 rounded-2xl" />
                ))}
                {b === 'images-add' ? (
                  <div className="flex h-44 items-center justify-center rounded-2xl border-2 border-gray-200 max-md:hidden">
                    <Button size="lg" hierarchy="secondary-gray" iconLeading={Plus}>
                      Add
                    </Button>
                  </div>
                ) : (
                  <FileUploadDropzone className="h-44 max-md:hidden" />
                )}
              </div>
            );
        }
      })}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Activity feed (Figma "Activity feed" Divider=Line, Type=Notifications)
 * ---------------------------------------------------------------------------------------------- */

const feed = (name: string, time: string, extra: Partial<FeedItemProps> = {}): FeedItemProps & { id: string } => ({
  id: name + time + (typeof extra.action === 'string' ? extra.action : ''),
  name,
  time,
  avatarInitials: initialsOf(name),
  ...extra,
});

export const ACTIVITY: (FeedItemProps & { id: string })[] = [
  feed('Phoenix Baker', 'Just now', { action: 'Added a file to Marketing site redesign', file: { name: 'Tech requirements.pdf', size: '720 KB' }, unread: true }),
  feed('Lana Steiner', '2 mins ago', { action: 'Invited Alisa Hester to the team', unread: true }),
  feed('Demi Wikinson', '2 mins ago', { action: 'Invited Alisa Hester to the team', unread: true }),
  feed('Candice Wu', '3 hours ago', { action: 'Commented in Marketing site redesign' }),
  feed('Candice Wu', '3 hours ago', { action: 'Was added to Marketing site redesign' }),
  feed('Natali Craig', '6 hours ago', {
    action: 'Added 3 labels to the project Marketing site redesign',
    labels: [
      { label: 'Design', color: 'brand' },
      { label: 'Product', color: 'blue' },
      { label: 'Marketing', color: 'indigo' },
    ],
  }),
  feed('Natali Craig', '6 hours ago', { action: 'Invited Lana Steiner to the team' }),
  feed('Orlando Diggs', '11 hours ago', { action: 'Created 7 tasks in Marketing site redesign' }),
  feed('Drew Cano', '12 hours ago', { action: 'Added a file to Marketing site redesign', file: { name: 'Design brief and ideas.txt', size: '2.2 MB' } }),
  feed('Drew Cano', '12 hours ago', { action: 'Created the project Marketing site redesign' }),
  feed('Kate Morrison', '5:20pm 20 Jan 2022', { action: 'Sent you a message', message: '“We should ask Oli about this today.”' }),
  feed('Koray Okumus', '4:16pm 20 Jan 2022', { action: 'Sent you a file', file: { name: 'Prototype draft 03.mp4', size: '6.6 MB' } }),
  feed('Koray Okumus', '4:16pm 20 Jan 2022', { action: 'Sent you a message', message: '@olivia This is starting to look really good! I’ll polish it up a bit and send it.' }),
  feed('Ava Wright', '3:12pm 20 Jan 2022', { action: 'Invited Alisa Hester to the team' }),
  feed('Eva Leroy', '3:10pm 20 Jan 2022', { action: 'Invited Ava Wright to the team' }),
];

export function RecentActivity({ className, limit }: { className?: string; limit?: number }) {
  return (
    <div className={cx('flex flex-col gap-6', className)}>
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-medium text-gray-900">Recent activity</h2>
          <Button size="sm" hierarchy="link-color">
            View all
          </Button>
        </div>
        <div className="h-px bg-gray-200" />
      </div>
      <ActivityFeed divider="line" items={limit ? ACTIVITY.slice(0, limit) : ACTIVITY} />
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Sidebar cards (project page 02)
 * ---------------------------------------------------------------------------------------------- */

export function ShareProjectCard() {
  return (
    <div className="flex flex-col gap-5 rounded-xl bg-gray-50 p-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium text-gray-900">Share this project</h3>
        <p className="text-sm text-gray-600">Your new project has been created. Invite colleagues to collaborate on this project.</p>
      </div>
      <div className="flex items-end gap-1">
        <Input className="flex-1" label="Share link" defaultValue="join.yourcompany.io/project" readOnly />
        <Button size="lg" hierarchy="tertiary-gray" iconLeading={Copy01} aria-label="Copy link" />
      </div>
    </div>
  );
}

export function InviteCollaboratorsCard() {
  return (
    <div className="flex flex-col gap-8 rounded-xl bg-gray-50 p-6">
      <div className="flex flex-col gap-5">
        <FeaturedIcon icon={UserPlus01} size="lg" color="brand" theme="modern" />
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-medium text-gray-900">Invite collaborators</h3>
          <p className="text-sm text-gray-600">Your new project has been created. Invite colleagues to collaborate on this project.</p>
        </div>
        <div className="flex flex-col gap-3">
          <Input label="Email address" iconLeading={Mail01} placeholder="you@yourcompany.io" type="email" />
          <Input iconLeading={Mail01} placeholder="you@yourcompany.io" type="email" aria-label="Email address" />
          <Button size="md" hierarchy="link-color" iconLeading={Plus} className="w-fit">
            Add another
          </Button>
        </div>
      </div>
      <div className="flex gap-3">
        <Button size="lg" hierarchy="secondary-gray" className="flex-1">
          Cancel
        </Button>
        <Button size="lg" className="flex-1">
          Confirm
        </Button>
      </div>
    </div>
  );
}
