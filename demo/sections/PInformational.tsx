import { useEffect, useState } from 'react';
import { informationalPages } from '../../src/pages/informational';

const readHash = () => {
  const h = typeof window === 'undefined' ? '' : decodeURIComponent(window.location.hash.replace(/^#/, ''));
  const name = h.replace(/^page=/, '');
  return informationalPages.some((p) => p.name === name) ? name : informationalPages[0]!.name;
};

/** Informational example pages: page picker + the chosen page at full width. `#Informational01Page03` selects a page. */
export default function PInformationalDemo() {
  const [name, setName] = useState(readHash);
  useEffect(() => {
    const on = () => setName(readHash());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const page = informationalPages.find((p) => p.name === name)!;
  const Page = page.component;
  const choose = (n: string) => {
    window.location.hash = n;
    setName(n);
  };
  return (
    <div className="-mx-6 lg:-mx-10">
      <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-3 md:px-8">
        <h2 className="text-md font-semibold text-gray-900">Informational pages</h2>
        <select
          aria-label="Choose page"
          value={name}
          onChange={(e) => choose(e.target.value)}
          className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 shadow-xs"
        >
          {['Informational pages 01', 'Informational pages 02'].map((cat) => (
            <optgroup key={cat} label={cat}>
              {informationalPages
                .filter((p) => p.category === cat)
                .map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name.replace('Informational', '').replace('Page', ' · ')} — {p.title}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
        <span className="font-mono text-xs text-gray-500">{page.name}</span>
      </div>
      <div key={name} data-page={name}>
        <Page />
      </div>
    </div>
  );
}
