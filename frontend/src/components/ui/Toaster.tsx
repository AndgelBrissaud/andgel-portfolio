import { useToast } from "../../context/ToastContext";

function Icon({ type }: { type: string }) {
  if (type === "success")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );

  if (type === "error")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function Toaster() {
  const { toasts, remove } = useToast();

  return (
    <div className="fixed right-6 top-6 z-50 flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          aria-live="polite"
          onClick={() => remove(t.id)}
          className={
            `max-w-sm w-full rounded-xl p-3 shadow-lg text-sm cursor-pointer transform transition-all duration-300 ease-out hover:scale-[1.02] flex items-start gap-3 select-none ` +
            (t.type === "success"
              ? "bg-green-600 text-white"
              : t.type === "error"
              ? "bg-red-600 text-white"
              : "bg-gray-800 text-white")
          }
          style={{
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            willChange: "transform, opacity",
          }}
        >
          <div className="flex-none mt-0.5" aria-hidden>
            <Icon type={t.type} />
          </div>
          <div className="flex-1">
            <div className="font-medium">{t.type === "success" ? "Succès" : t.type === "error" ? "Erreur" : "Info"}</div>
            <div className="mt-1 text-sm leading-snug">{t.message}</div>
          </div>
          <div className="flex-none ml-3 opacity-80 hover:opacity-100">✕</div>
        </div>
      ))}
    </div>
  );
}
