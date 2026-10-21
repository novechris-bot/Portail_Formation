import React from 'react';

/**
 * TPG Official-styled vehicle badges
 * - TRAM: Tramway certified badge with tram silhouette & pantograph
 * - AB/TB: Autobus / Trolleybus certified badge with bus silhouette
 */

export const TramLogoBadge: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span
    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#FD5312] text-white font-black text-[10.5px] tracking-wide uppercase shadow-xs border border-orange-700/20 select-none shrink-0 ${className}`}
    title="Habilité TRAM (Tramway - 11 formateurs certifiés)"
  >
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {/* Tramway silhouette with roof pantograph */}
      <path d="M11 1.5h2v2h-2zM9 3.5h6v1.5H9zM7 6h10a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-1v1.5a1 1 0 0 1-2 0V19h-4v1.5a1 1 0 0 1-2 0V19H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm0 2v4.5h10V8H7zm1 6.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm8 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
    </svg>
    <span>TRAM</span>
  </span>
);

export const AbtbLogoBadge: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span
    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#008CBE] text-white font-black text-[10.5px] tracking-wide uppercase shadow-xs border border-sky-700/20 select-none shrink-0 ${className}`}
    title="Habilité AB/TB (Autobus & Trolleybus)"
  >
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {/* Autobus / Trolleybus silhouette */}
      <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 11V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v5H5z" />
    </svg>
    <span>AB/TB</span>
  </span>
);

export const FormateurVehicleLogos: React.FC<{ isTramway?: boolean; className?: string }> = ({
  isTramway,
  className = ''
}) => {
  return (
    <div className={`inline-flex items-center gap-1.5 flex-wrap ${className}`}>
      {isTramway ? (
        <>
          <TramLogoBadge />
          <AbtbLogoBadge />
        </>
      ) : (
        <AbtbLogoBadge />
      )}
    </div>
  );
};
