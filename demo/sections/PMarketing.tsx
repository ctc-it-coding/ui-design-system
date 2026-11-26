import { useState, type ComponentType } from 'react';
import * as Pages from '../../src/pages/marketing';
import { marketingPageList } from '../../src/pages/marketing';

const reg = Pages as unknown as Record<string, ComponentType>;
const initial = () => { const m = /page=([A-Za-z0-9]+)/.exec(location.hash); return m && reg[m[1]] ? m[1] : marketingPageList[0].name; };

/** Browser for the 113 generated marketing example pages. */
export default function PMarketing() {
  const [page, setPage] = useState(initial);
  const Page = reg[page];
  const cats = [...new Set(marketingPageList.map((p) => p.category))];
  return (
    <div className="-mx-6 lg:-mx-10">
      <div className="sticky top-0 z-50 flex flex-wrap items-center gap-3 border-b border-gray-200 bg-white/90 px-6 py-3 backdrop-blur lg:px-10">
        <span className="text-sm font-semibold text-gray-900">Marketing example pages</span>
        <select value={page} onChange={(e) => setPage(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-xs">
          {cats.map((c) => (
            <optgroup key={c} label={c}>
              {marketingPageList.filter((p) => p.category === c).map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
            </optgroup>
          ))}
        </select>
        <span className="text-xs text-gray-500">{marketingPageList.length} pages generated from the Figma example pages</span>
      </div>
      <Page key={page} />
    </div>
  );
}
