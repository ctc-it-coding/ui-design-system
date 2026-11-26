import { useEffect, useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Check, Copy01 } from '../../icons';
import { AvatarLabelGroup } from '../../components/avatars/Avatar';
import { Badge } from '../../components/badges/Badge';
import { Button } from '../../components/buttons/Button';
import { SocialIcon } from '../../components/misc-icons/SocialIcon';
import type { SocialPlatform } from '../../components/misc-icons/data/social.data';
import { initialsOf } from '../testimonials/_parts';
import type { BlogPostTag } from '../blog/defaults';

/** "Copy link" + social share icon buttons (Figma "Social links"). */
export function ShareButtons({ copy = true, platforms = ['x', 'facebook', 'linkedin'], url, className }: { copy?: boolean; platforms?: SocialPlatform[]; url?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);
  const href = () => url ?? (typeof window !== 'undefined' ? window.location.href : '');
  const shareUrl = (p: SocialPlatform) => {
    const u = encodeURIComponent(href());
    return p === 'facebook' ? `https://www.facebook.com/sharer/sharer.php?u=${u}` : p === 'linkedin' ? `https://www.linkedin.com/sharing/share-offsite/?url=${u}` : `https://x.com/intent/post?url=${u}`;
  };
  return (
    <div className={cx('flex gap-3', className)}>
      {copy && (
        <Button
          size="md"
          hierarchy="secondary-gray"
          iconLeading={copied ? Check : Copy01}
          onClick={() => {
            void navigator.clipboard?.writeText(href()).catch(() => undefined);
            setCopied(true);
          }}
        >
          {copied ? 'Copied' : 'Copy link'}
        </Button>
      )}
      {platforms.map((p) => (
        <a
          key={p}
          href={shareUrl(p)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Share on ${p === 'x' ? 'X' : p[0]!.toUpperCase() + p.slice(1)}`}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-gray-300 bg-white shadow-xs outline-none hover:bg-gray-50 focus-visible:ring-4 focus-visible:ring-gray-400/14"
        >
          <SocialIcon platform={p} variant="gray" size={20} title="" />
        </a>
      ))}
    </div>
  );
}

export function TagList({ tags, className }: { tags: BlogPostTag[]; className?: string }) {
  return (
    <div className={cx('flex flex-wrap gap-2', className)}>
      {tags.map((t) => (
        <Badge key={t.label} size="md" type="pill-color" color={t.color ?? 'gray'}>
          {t.label}
        </Badge>
      ))}
    </div>
  );
}

/** Bottom row of an article: author (or tags) on the left, share buttons on the right. */
export function ArticleFooter({ left, share = true, className }: { left?: ReactNode; share?: boolean; className?: string }) {
  return (
    <div className={cx('flex flex-col gap-6 border-t border-gray-200 py-6 md:flex-row md:items-center md:justify-between', className)}>
      {left}
      {share && <ShareButtons />}
    </div>
  );
}

export function AuthorBlock({ name, title, avatarSrc, size = 'xl' }: { name: string; title?: string; avatarSrc?: string; size?: 'lg' | 'xl' }) {
  return <AvatarLabelGroup size={size} src={avatarSrc} initials={initialsOf(name)} title={<span className="text-gray-900">{name}</span>} subtitle={title} />;
}

export interface TocItem {
  id: string;
  label: ReactNode;
}

/**
 * Table of contents with scroll-spy: highlights the section currently in view and smooth-scrolls on click.
 * Figma "Table of contents" (Link gray lg buttons).
 */
export function TableOfContents({ items, title = 'Table of contents', className }: { items: TocItem[]; title?: ReactNode; className?: string }) {
  const [active, setActive] = useState<string | undefined>(items[0]?.id);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '0px 0px -70% 0px' },
    );
    els.forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, [items]);
  return (
    <nav aria-label="Table of contents" className={cx('flex flex-col gap-4', className)}>
      <p className="text-md font-semibold text-brand-600">{title}</p>
      <ul className="flex flex-col gap-3">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? 'location' : undefined}
              onClick={(e) => {
                const el = document.getElementById(i.id);
                if (!el) return;
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setActive(i.id);
              }}
              className="rounded-sm text-md font-medium text-gray-600 outline-none hover:text-gray-700 focus-visible:ring-4 focus-visible:ring-gray-400/14 aria-[current=location]:font-semibold aria-[current=location]:text-gray-900"
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
