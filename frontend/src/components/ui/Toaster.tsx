import { useToast } from "../../context/ToastContext";

export default function Toaster() {
  const { toasts, remove } = useToast();

  return (
    <div className="fixed right-6 top-6 z-[60] flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          aria-live="polite"
          onClick={() => remove(t.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') remove(t.id); }}
          className={
            `max-w-sm w-full rounded-none p-4 shadow-lg text-sm cursor-pointer transform transition-all duration-300 ease-out hover:translate-x-0.5 flex items-start gap-4 select-none border border-white/5 bg-gradient-to-r from-black/90 to-black/80 `
          }
          style={{
            boxShadow: "0 12px 40px rgba(0,0,0,0.28), 0 0 40px rgba(176,141,87,0.08)",
            willChange: "transform, opacity",
            pointerEvents: 'auto',
            animation: 'toast-in 320ms cubic-bezier(.22,1,.36,1)'
          }}
        >
          <div className="flex-none w-1 h-full bg-gradient-to-b from-[var(--color-accent)] to-transparent mr-3" aria-hidden />
          <div className="flex-1">
            <div className="text-[11px] uppercase tracking-[0.25em] text-accent-light font-medium">{t.type === "success" ? "Succès" : t.type === "error" ? "Erreur" : "Info"}</div>
            <div className="mt-2 text-sm leading-snug text-text">{t.message}</div>
          </div>
          <button aria-label="Fermer" className="flex-none ml-4 text-white/70 hover:text-white text-lg">✕</button>
        </div>
      ))}
    </div>
  );
}
