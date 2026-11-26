import { forwardRef, useCallback, useEffect, useId, useImperativeHandle, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { WysiwygToolbar, WysiwygTooltip, wysiwygCommands, type WysiwygCommand } from './WysiwygToolbar';

export interface RichTextEditorProps {
  /** Initial HTML (uncontrolled). */
  defaultValue?: string;
  /** HTML (controlled). The editor only rewrites its DOM when this differs from its current content. */
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  label?: ReactNode;
  hint?: ReactNode;
  /** `top` = WysiwygToolbar above the field; `floating` = dark WysiwygTooltip above the text selection. */
  toolbar?: 'top' | 'floating';
  /** Commands to offer (default all 9). */
  commands?: WysiwygCommand[];
  /** Fonts for the font dropdown (`false` hides it). */
  fonts?: string[] | false;
  disabled?: boolean;
  /** Min height of the editable area (CSS), default 160px. */
  minHeight?: string | number;
  className?: string;
}

export interface RichTextEditorHandle {
  focus: () => void;
  getHTML: () => string;
  exec: (command: WysiwygCommand) => void;
  element: HTMLDivElement | null;
}

const content =
  'outline-none [&_a]:font-medium [&_a]:text-brand-700 [&_a]:underline [&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-brand-600 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-700 ' +
  '[&_h1]:mb-2 [&_h1]:text-display-xs [&_h1]:font-semibold [&_h1]:text-gray-900 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_img]:my-2 [&_img]:max-w-full [&_img]:rounded-lg ' +
  '[&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-0.5 [&_p]:my-1 [&_b]:font-semibold [&_strong]:font-semibold';

/**
 * RichTextEditor — contentEditable editor with the Figma WYSIWYG toolbar (bold, italic, H1, H2, quote, link,
 * image URL, bullet & numbered lists, font). Uses `document.execCommand`. Link / image ask for a URL in an inline field.
 */
export const RichTextEditor = forwardRef<RichTextEditorHandle, RichTextEditorProps>(function RichTextEditor(
  { defaultValue = '', value, onChange, placeholder = 'Write something…', label, hint, toolbar = 'top', commands = wysiwygCommands, fonts, disabled = false, minHeight = 160, className },
  ref,
) {
  const el = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const savedRange = useRef<Range | null>(null);
  const [active, setActive] = useState<Partial<Record<WysiwygCommand, boolean>>>({});
  const [empty, setEmpty] = useState(!(value ?? defaultValue));
  const [font, setFont] = useState<string | undefined>(fonts ? fonts[0] : undefined);
  const [prompt, setPrompt] = useState<null | 'link' | 'photo'>(null);
  const [url, setUrl] = useState('');
  const [floatPos, setFloatPos] = useState<{ left: number; top: number } | null>(null);
  const id = useId();

  // initial / controlled content
  useEffect(() => {
    const n = el.current; if (!n) return;
    const html = value ?? defaultValue;
    if (n.innerHTML !== html && (value !== undefined || n.innerHTML === '')) { n.innerHTML = html; setEmpty(!n.textContent && !n.querySelector('img')); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const inEditor = (node: Node | null) => !!node && !!el.current && el.current.contains(node);

  const refresh = useCallback(() => {
    const sel = document.getSelection();
    if (!sel || !sel.rangeCount || !inEditor(sel.anchorNode)) { setFloatPos(null); return; }
    const block = String(document.queryCommandValue('formatBlock') || '').toLowerCase();
    let a: Node | null = sel.anchorNode; let link = false;
    while (a && a !== el.current) { if ((a as Element).nodeName === 'A') { link = true; break; } a = a.parentNode; }
    setActive({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      h1: block === 'h1', h2: block === 'h2', quote: block === 'blockquote',
      'list-bullet': document.queryCommandState('insertUnorderedList'),
      'list-numbers': document.queryCommandState('insertOrderedList'),
      link,
    });
    if (toolbar === 'floating' && wrap.current) {
      const r = sel.getRangeAt(0);
      if (sel.isCollapsed) { setFloatPos(null); return; }
      const rect = r.getBoundingClientRect(); const w = wrap.current.getBoundingClientRect();
      const half = Math.min(170, w.width / 2);
      setFloatPos({ left: Math.max(half, Math.min(w.width - half, rect.left + rect.width / 2 - w.left)), top: rect.top - w.top });
    }
  }, [toolbar]);

  useEffect(() => {
    document.addEventListener('selectionchange', refresh);
    return () => document.removeEventListener('selectionchange', refresh);
  }, [refresh]);

  const emit = () => {
    const n = el.current; if (!n) return;
    setEmpty(!n.textContent && !n.querySelector('img,li'));
    onChange?.(n.innerHTML);
  };

  const restore = () => {
    el.current?.focus();
    const r = savedRange.current; const sel = document.getSelection();
    if (r && sel) { sel.removeAllRanges(); sel.addRange(r); }
  };

  const exec = (cmd: WysiwygCommand) => {
    if (disabled) return;
    el.current?.focus();
    const block = String(document.queryCommandValue('formatBlock') || '').toLowerCase();
    const fb = (tag: string) => document.execCommand('formatBlock', false, block === tag ? 'p' : tag);
    switch (cmd) {
      case 'bold': document.execCommand('bold'); break;
      case 'italic': document.execCommand('italic'); break;
      case 'h1': fb('h1'); break;
      case 'h2': fb('h2'); break;
      case 'quote': fb('blockquote'); break;
      case 'list-bullet': document.execCommand('insertUnorderedList'); break;
      case 'list-numbers': document.execCommand('insertOrderedList'); break;
      case 'link':
        if (active.link) { document.execCommand('unlink'); break; }
      // fallthrough
      case 'photo': {
        const sel = document.getSelection();
        savedRange.current = sel && sel.rangeCount ? sel.getRangeAt(0).cloneRange() : null;
        setUrl(cmd === 'link' ? 'https://' : '');
        setPrompt(cmd);
        return;
      }
    }
    emit(); refresh();
  };

  const applyUrl = (e?: FormEvent) => {
    e?.preventDefault();
    const u = url.trim(); const kind = prompt; setPrompt(null);
    restore();
    if (!u || u === 'https://') return;
    if (kind === 'link') {
      const sel = document.getSelection();
      if (sel && sel.isCollapsed) document.execCommand('insertHTML', false, `<a href="${u.replace(/"/g, '&quot;')}">${u.replace(/</g, '&lt;')}</a>`);
      else document.execCommand('createLink', false, u);
    } else document.execCommand('insertImage', false, u);
    emit(); refresh();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!(e.metaKey || e.ctrlKey)) return;
    const k = e.key.toLowerCase();
    if (k === 'b') { e.preventDefault(); exec('bold'); }
    else if (k === 'i') { e.preventDefault(); exec('italic'); }
    else if (k === 'k') { e.preventDefault(); exec('link'); }
  };

  useImperativeHandle(ref, () => ({ focus: () => el.current?.focus(), getHTML: () => el.current?.innerHTML ?? '', exec, element: el.current }));

  const urlField = prompt && (
    <form onSubmit={applyUrl} className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-1 pl-3 shadow-xs">
      <input
        autoFocus
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Escape') { setPrompt(null); restore(); } }}
        placeholder={prompt === 'link' ? 'Paste a link' : 'Image URL'}
        aria-label={prompt === 'link' ? 'Link URL' : 'Image URL'}
        className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-500"
      />
      <button type="button" onClick={() => { setPrompt(null); restore(); }} className="rounded-md px-2.5 py-1.5 text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
      <button type="submit" className="rounded-md bg-brand-600 px-2.5 py-1.5 text-sm font-semibold text-white hover:bg-brand-700">{prompt === 'link' ? 'Add link' : 'Insert'}</button>
    </form>
  );

  return (
    <div ref={wrap} className={cx('relative flex w-full flex-col gap-1.5', className)}>
      {label != null && <label htmlFor={id} className="text-sm font-medium text-gray-700" onClick={() => el.current?.focus()}>{label}</label>}
      {toolbar === 'top' && (
        <WysiwygToolbar
          active={active}
          commands={commands}
          fonts={fonts}
          font={font}
          onFontChange={(f) => { setFont(f); el.current?.focus(); document.execCommand('fontName', false, f); emit(); }}
          onCommand={exec}
          className="mb-1.5"
        />
      )}
      {urlField}
      <div className="relative">
        {empty && <div className="pointer-events-none absolute left-3.5 top-3 text-md text-gray-500">{placeholder}</div>}
        <div
          id={id}
          ref={el}
          role="textbox"
          aria-multiline
          aria-disabled={disabled || undefined}
          contentEditable={!disabled}
          suppressContentEditableWarning
          onInput={emit}
          onKeyDown={onKeyDown}
          onBlur={() => toolbar === 'floating' && setTimeout(() => !prompt && setFloatPos(null), 150)}
          className={cx(
            'w-full overflow-auto rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-md text-gray-900 shadow-xs transition focus:border-brand-300 focus:ring-4 focus:ring-brand-500/24',
            disabled && 'cursor-not-allowed bg-gray-50 text-gray-500',
            content,
          )}
          style={{ minHeight }}
        />
      </div>
      {hint != null && <p className="text-sm text-gray-600">{hint}</p>}
      {toolbar === 'floating' && floatPos && !prompt && (
        <div className="absolute z-10 -translate-x-1/2 -translate-y-full pb-2.5" style={{ left: floatPos.left, top: floatPos.top }}>
          <WysiwygTooltip active={active} commands={commands} onCommand={exec} />
        </div>
      )}
    </div>
  );
});
