import { useEffect, useState } from 'react';
import { settingsPageList } from '../../src/pages/settings';

const readHash = () => {
  if (typeof window === 'undefined') return undefined;
  const m = window.location.hash.match(/page=([A-Za-z0-9]+)/);
  return m?.[1];
};

/** Settings example pages (Figma "❖ Settings pages 01 / 02"): pick a page, it renders full width. `#page=Settings01Page03` selects one. */
export default function PSettingsDemo() {
  const [name, setName] = useState<string>(() => readHash() ?? settingsPageList[0].name);
  useEffect(() => {
    const on = () => {
      const h = readHash();
      if (h) setName(h);
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const entry = settingsPageList.find((p) => p.name === name) ?? settingsPageList[0];
  const Page = entry.component;
  return (
    <div className="-mx-6 lg:-mx-10" id="settings-pages" data-section="settings-pages">
      <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-3" data-picker>
        <label htmlFor="settings-page-picker" className="text-sm font-medium text-gray-700">
          Settings page
        </label>
        <select
          id="settings-page-picker"
          value={entry.name}
          onChange={(e) => {
            setName(e.target.value);
            window.location.hash = `page=${e.target.value}`;
          }}
          className="h-9 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 shadow-xs"
        >
          {['Settings pages 01', 'Settings pages 02'].map((cat) => (
            <optgroup key={cat} label={cat}>
              {settingsPageList
                .filter((p) => p.category === cat)
                .map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </div>
      <div data-page={entry.name}>
        <Page key={entry.name} />
      </div>
    </div>
  );
}
