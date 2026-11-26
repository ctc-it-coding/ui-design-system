import { forwardRef, useEffect, useRef, useState, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Check, Copy01 } from '../../icons';

export type CodeSnippetColor = 'gray' | 'primary';
export type CodeSnippetTheme = 'dark' | 'light';

export interface CodeSnippetTab {
  /** Tab label, e.g. a file name or language. */
  label: ReactNode;
  code: string;
}

export interface CodeSnippetProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** The code to show (ignored when `tabs` is given). */
  code?: string;
  /** Several snippets switchable with tabs in the header. */
  tabs?: CodeSnippetTab[];
  /** Initially selected tab index (uncontrolled). */
  defaultTab?: number;
  /** Selected tab index (controlled). */
  tab?: number;
  onTabChange?: (index: number) => void;
  /** File name shown in the header (when there are no tabs). */
  filename?: ReactNode;
  /** Figma: Color */
  color?: CodeSnippetColor;
  /** Figma: Theme */
  theme?: CodeSnippetTheme;
  /** Shows the line-number sidebar (Figma "Sidebar"). */
  lineNumbers?: boolean;
  /** Shows the copy button. */
  copyable?: boolean;
  /** Called after the code was copied. */
  onCopied?: (code: string) => void;
}

interface ThemeCls {
  root: string;
  sidebar: string;
  nums: string;
  code: string;
  header: string;
  tab: string;
  tabActive: string;
  copy: string;
}

const themes: Record<`${CodeSnippetColor}-${CodeSnippetTheme}`, ThemeCls> = {
  'gray-dark': {
    root: 'bg-gray-950',
    sidebar: 'bg-gray-800',
    nums: 'text-gray-300',
    code: 'text-gray-50',
    header: 'border-gray-800 text-gray-300',
    tab: 'text-gray-400 hover:text-gray-200 focus-visible:ring-gray-400/14',
    tabActive: 'bg-gray-800 text-white',
    copy: 'text-gray-400 hover:bg-gray-800 hover:text-gray-200 focus-visible:ring-gray-400/14',
  },
  'gray-light': {
    root: 'bg-white ring-1 ring-inset ring-gray-200',
    sidebar: 'border-r border-gray-200 bg-gray-25',
    nums: 'text-gray-500',
    code: 'text-gray-700',
    header: 'border-gray-200 text-gray-700',
    tab: 'text-gray-500 hover:text-gray-700 focus-visible:ring-gray-400/14',
    tabActive: 'bg-gray-50 text-gray-700',
    copy: 'text-gray-400 hover:bg-gray-50 hover:text-gray-500 focus-visible:ring-gray-400/14',
  },
  'primary-dark': {
    root: 'bg-brand-900',
    sidebar: 'bg-brand-800',
    nums: 'text-brand-300',
    code: 'text-brand-50',
    header: 'border-brand-800 text-brand-200',
    tab: 'text-brand-300 hover:text-white focus-visible:ring-brand-500/24',
    tabActive: 'bg-brand-800 text-white',
    copy: 'text-brand-300 hover:bg-brand-800 hover:text-white focus-visible:ring-brand-500/24',
  },
  'primary-light': {
    root: 'bg-brand-25 ring-1 ring-inset ring-brand-200',
    sidebar: 'bg-brand-50',
    nums: 'text-brand-600',
    code: 'text-gray-700',
    header: 'border-brand-200 text-brand-700',
    tab: 'text-brand-600 hover:text-brand-700 focus-visible:ring-brand-500/24',
    tabActive: 'bg-brand-50 text-brand-700',
    copy: 'text-brand-500 hover:bg-brand-50 hover:text-brand-600 focus-visible:ring-brand-500/24',
  },
};

async function copyText(text: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through */
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  ta.remove();
  return ok;
}

/** CodeSnippet — Figma "Code snippets/Code snippet": monospaced code with line numbers, copy button, optional tabs. */
export const CodeSnippet = forwardRef<HTMLDivElement, CodeSnippetProps>(function CodeSnippet(
  {
    code = '',
    tabs,
    defaultTab = 0,
    tab,
    onTabChange,
    filename,
    color = 'gray',
    theme = 'dark',
    lineNumbers = true,
    copyable = true,
    onCopied,
    className,
    ...props
  },
  ref,
) {
  const t = themes[`${color}-${theme}`];
  const [innerTab, setInnerTab] = useState(defaultTab);
  const active = tab ?? innerTab;
  const selectTab = (i: number) => {
    if (tab === undefined) setInnerTab(i);
    onTabChange?.(i);
  };
  const current = tabs ? (tabs[active]?.code ?? '') : code;
  const lines = current.replace(/\n$/, '').split('\n');
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const doCopy = async () => {
    if (await copyText(current)) {
      setCopied(true);
      onCopied?.(current);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    }
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (!tabs) return;
    let next = -1;
    if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    if (next >= 0) {
      e.preventDefault();
      selectTab(next);
      tabRefs.current[next]?.focus();
    }
  };

  const copyButton = copyable && (
    <button
      type="button"
      onClick={doCopy}
      aria-label={copied ? 'Copied' : 'Copy code'}
      className={cx(
        'inline-flex shrink-0 items-center gap-1 rounded-md p-2 text-sm font-semibold outline-none transition-colors focus-visible:ring-4',
        t.copy,
      )}
    >
      {copied ? <Check className="size-4" aria-hidden /> : <Copy01 className="size-4" aria-hidden />}
      {copied && <span>Copied</span>}
    </button>
  );
  const hasHeader = !!(tabs?.length || filename != null);

  return (
    <div ref={ref} className={cx('relative flex w-full flex-col overflow-hidden rounded-xl', t.root, className)} {...props}>
      {hasHeader && (
        <div className={cx('flex items-center gap-2 border-b py-2 pr-2 pl-4 md:pl-6', t.header)}>
          {tabs ? (
            <div role="tablist" aria-label="Code files" className="-ml-2 flex min-w-0 flex-1 gap-1 overflow-x-auto">
              {tabs.map((tb, i) => (
                <button
                  key={i}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => selectTab(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={cx(
                    'shrink-0 rounded-md px-2.5 py-1.5 text-sm font-semibold whitespace-nowrap outline-none transition-colors focus-visible:ring-4',
                    t.tab,
                    i === active && t.tabActive,
                  )}
                >
                  {tb.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="min-w-0 flex-1 truncate text-sm font-semibold">{filename}</div>
          )}
          {copyButton}
        </div>
      )}
      <div className="flex min-w-0" role={tabs ? 'tabpanel' : undefined}>
        {lineNumbers && (
          <div
            aria-hidden
            className={cx('shrink-0 select-none px-4 pt-4 pb-6 text-right font-mono text-md leading-[22px] font-bold md:p-6', t.sidebar, t.nums)}
          >
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
        )}
        <pre
          className={cx(
            'min-w-0 flex-1 overflow-x-auto px-4 pt-4 pb-6 font-mono text-md leading-[22px] font-bold md:px-6 md:pt-6 md:pb-8',
            t.code,
            !hasHeader && copyable && 'pr-14 md:pr-14',
          )}
        >
          <code>{lines.join('\n')}</code>
        </pre>
      </div>
      {!hasHeader && copyButton && <div className="absolute top-3 right-3">{copyButton}</div>}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </div>
  );
});
