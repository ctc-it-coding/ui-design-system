import { useState, type ComponentType } from 'react';
import * as Pages from '../../src/pages/dashboards';
import { dashboardPageList } from '../../src/pages/dashboards';

const reg = Pages as unknown as Record<string, ComponentType>;
const initial = () => {
  const m = /page=([A-Za-z0-9]+)/.exec(location.hash + location.search);
  return m && reg[m[1]] ? m[1] : dashboardPageList[0].name;
};

/** Browser for the dashboard example pages (Figma "❖ Dashboards 01 / 02"). Use #page=Dashboard01Page03 to deep-link. */
export default function PDashboards() {
  const [page, setPage] = useState(initial);
  const Page = reg[page];
  const cats = [...new Set(dashboardPageList.map((p) => p.category))];
  return (
    <div className="-mx-6 lg:-mx-10">
      <div className="sticky top-0 z-[60] flex flex-wrap items-center gap-3 border-b border-gray-200 bg-white/90 px-6 py-3 backdrop-blur" data-demo-bar>
        <span className="text-sm font-semibold text-gray-900">Dashboard example pages</span>
        <select
          value={page}
          onChange={(e) => {
            setPage(e.target.value);
            history.replaceState(null, '', `#page=${e.target.value}`);
          }}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-xs"
        >
          {cats.map((c) => (
            <optgroup key={c} label={c}>
              {dashboardPageList
                .filter((p) => p.category === c)
                .map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
        <span className="text-xs text-gray-500">{dashboardPageList.length} pages</span>
      </div>
      <Page key={page} />
    </div>
  );
}
