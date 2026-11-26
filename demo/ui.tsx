import type { ReactNode } from 'react';

/** Showcase layout helpers (demo only). */
export function Section({ id, title, figma, children }: { id: string; title: string; figma?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-6 border-b border-gray-200 py-10" data-section={id}>
      <div className="mb-6">
        <h2 className="text-display-xs font-semibold text-gray-900">{title}</h2>
        {figma && <p className="mt-1 font-mono text-xs text-gray-500">Figma: {figma}</p>}
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  );
}
export function Row({ label, children, className }: { label?: string; children: ReactNode; className?: string }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <div className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</div>}
      <div className={className ?? 'flex flex-wrap items-center gap-4'}>{children}</div>
    </div>
  );
}
