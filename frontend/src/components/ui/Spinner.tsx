type SpinnerProps = {
  size?: number;
  label?: string;
};

export default function Spinner({ size = 48, label }: SpinnerProps) {
  const s = `${size}px`;
  return (
    <div className="flex flex-col items-center" aria-hidden>
      <div style={{ width: s, height: s }} className="relative rounded-full flex items-center justify-center">
        <div className="spinner-gold-glow absolute inset-0 rounded-full" />
        <svg className="-rotate-90 relative" viewBox="0 0 50 50" style={{ width: s, height: s }} xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <defs>
            <linearGradient id="g" x1="0%" x2="100%">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="1" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.12)" stopOpacity="1" />
            </linearGradient>
          </defs>
          <circle cx="25" cy="25" r="20" stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="none" />
            <path
            d="M25 5 a20 20 0 0 1 0 40"
            stroke="url(#g)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
              className="animate-spin origin-center"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs text-text-muted"> </span>
      </div>
      {label && <div className="mt-3 text-sm text-text-muted">{label}</div>}
    </div>
  );
}
