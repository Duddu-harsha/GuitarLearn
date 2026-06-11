import { useCallback } from 'react';

/**
 * Header — sticky app header with branding.
 */
export default function Header({
  isLoading,
}) {
  return (
    <header className="header">
      {/* ── Branding ─────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <h1>🎸 GuitarLearn</h1>

        {isLoading && (
          <span
            className="loading-spinner"
            style={{ width: 18, height: 18, borderWidth: 2 }}
            aria-label="Loading samples…"
          />
        )}
      </div>
    </header>
  );
}
