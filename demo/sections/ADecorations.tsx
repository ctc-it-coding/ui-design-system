import type { ReactNode } from 'react';
import {
  HandDrawnAccent,
  HandDrawnArrow,
  HandDrawnLine,
  HandDrawnUnderline,
  PenScribble,
  handDrawnAccentVariants,
  handDrawnArrowVariants,
  handDrawnUnderlineVariants,
  penScribbleVariants,
} from '../../src/components/decorations';
import { Section, Row } from '../ui';

const Cell = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="flex h-24 items-center justify-center">{children}</div>
    <span className="text-xs text-gray-400">{label}</span>
  </div>
);

export default function DecorationsDemo() {
  return (
    <Section id="decorations" title="Hand-drawn decorations" figma="Hand-drawn arrow · underlines · accents · pen scribble · line">
      <Row label="HandDrawnArrow (height 80)" className="flex flex-wrap items-end gap-4">
        {handDrawnArrowVariants.map((v) => <Cell key={v} label={v}><HandDrawnArrow variant={v} height={80} /></Cell>)}
      </Row>
      <Row label="HandDrawnUnderline (width 240, brand-600)" className="grid grid-cols-5 gap-6">
        {handDrawnUnderlineVariants.map((v) => <Cell key={v} label={v}><HandDrawnUnderline variant={v} width={240} className="text-brand-600" /></Cell>)}
      </Row>
      <Row label="HandDrawnAccent (height 56)" className="flex flex-wrap items-end gap-6">
        {handDrawnAccentVariants.map((v) => <Cell key={v} label={v}><HandDrawnAccent variant={v} height={56} /></Cell>)}
      </Row>
      <Row label="PenScribble" className="grid grid-cols-4 gap-6">
        {penScribbleVariants.map((v) => <Cell key={v} label={v}><PenScribble variant={v} width={220} className="text-error-500" /></Cell>)}
      </Row>
      <Row label="HandDrawnLine circle / squiggle" className="flex items-center gap-10">
        <HandDrawnLine variant="circle" height={160} />
        <HandDrawnLine variant="squiggle" width={480} className="text-brand-600" />
      </Row>
      <Row label="In context">
        <h3 className="relative text-display-md font-semibold text-gray-900">
          Ship <span className="relative inline-block">faster<HandDrawnUnderline variant="03" width="100%" className="absolute -bottom-3 left-0 text-brand-500" /></span> today
          <HandDrawnArrow variant="02" height={64} className="absolute -right-24 -top-6 text-gray-500" />
        </h3>
      </Row>
    </Section>
  );
}
