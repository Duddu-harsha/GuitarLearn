import { useCallback } from 'react';

const TABS = [
  { key: 'scales', label: 'SCALES' },
  { key: 'exercises', label: 'EXERCISES' },
];

/**
 * ContentTabs — tab switcher bar for Scales / Exercises sections.
 *
 * Renders two tab buttons with an accent-colored underline on the
 * active tab. Only the tab bar itself is rendered; content below
 * is handled by the parent component.
 */
export default function ContentTabs({ activeTab, onTabChange }) {
  const handleClick = useCallback(
    (key) => {
      if (key !== activeTab) onTabChange(key);
    },
    [activeTab, onTabChange],
  );

  return (
    <nav className="content-tabs" role="tablist" aria-label="Content sections">
      {TABS.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          role="tab"
          aria-selected={activeTab === key}
          className={`tab-btn${activeTab === key ? ' active' : ''}`}
          onClick={() => handleClick(key)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
