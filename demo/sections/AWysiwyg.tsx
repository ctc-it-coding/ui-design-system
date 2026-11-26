import { useState } from 'react';
import { RichTextEditor, WysiwygIconButton, WysiwygToolbar, WysiwygTooltip, wysiwygCommands } from '../../src/components/wysiwyg';
import { Section, Row } from '../ui';

const initial = '<h2>Release notes</h2><p>We shipped a <b>new editor</b> with <i>inline formatting</i> and <a href="#">links</a>.</p><ul><li>Bold, italic, headings</li><li>Quotes &amp; lists</li></ul>';

export default function WysiwygDemo() {
  const [html, setHtml] = useState(initial);
  return (
    <Section id="wysiwyg" title="WYSIWYG editor" figma="WYSIWYG toolbar · _WYSIWYG editor icon · WYSIWYG tooltip">
      <Row label="_WYSIWYG editor icon · light inactive / active · dark inactive / active" className="flex flex-col gap-3">
        <div className="flex gap-1">{wysiwygCommands.map((c) => <WysiwygIconButton key={c} command={c} size="md" />)}</div>
        <div className="flex gap-1">{wysiwygCommands.map((c) => <WysiwygIconButton key={c} command={c} size="md" active />)}</div>
        <div className="flex w-fit gap-1 rounded-lg bg-gray-900 p-2">{wysiwygCommands.map((c) => <WysiwygIconButton key={c} command={c} theme="dark" size="md" />)}</div>
        <div className="flex w-fit gap-1 rounded-lg bg-gray-900 p-2">{wysiwygCommands.map((c) => <WysiwygIconButton key={c} command={c} theme="dark" size="md" active />)}</div>
      </Row>
      <Row label="WysiwygToolbar (desktop)">
        <WysiwygToolbar active={{ bold: true, 'list-bullet': true }} />
      </Row>
      <Row label="WysiwygTooltip · center / left / right" className="flex flex-wrap gap-6 pb-4">
        <WysiwygTooltip active={{ italic: true }} />
        <WysiwygTooltip arrow="left" />
        <WysiwygTooltip arrow="right" />
      </Row>
      <Row label="RichTextEditor · top toolbar" className="grid max-w-3xl gap-4">
        <RichTextEditor label="Description" hint="Select text and use the toolbar or ⌘B / ⌘I / ⌘K." defaultValue={initial} onChange={setHtml} />
        <pre className="max-h-32 overflow-auto rounded-lg bg-gray-50 p-3 text-xs text-gray-600">{html}</pre>
      </Row>
      <Row label="RichTextEditor · floating toolbar (select text) · no font select" className="grid max-w-3xl gap-4 pt-12">
        <RichTextEditor toolbar="floating" fonts={false} placeholder="Select some text to format it…" />
      </Row>
    </Section>
  );
}
