import { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import { setToastHandler, clearToastHandler } from "../services/toastService";

type ToastType = "info" | "success" | "error";

type ToastItem = {
  id: number;
  type: ToastType;
  message: string;
  duration: number;
};

type ToastContextValue = {
  toasts: ToastItem[];
  show: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  remove: (id: number) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(1);

  const remove = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const show = useCallback((message: string, type: ToastType = "info", duration = 4000) => {
    const id = idRef.current++;
    const item: ToastItem = { id, type, message, duration };
    console.debug("ToastProvider: show", { id, message, type, duration });
    setToasts((t) => [item, ...t]);
    if (duration > 0) {
      window.setTimeout(() => remove(id), duration);
    }
  }, [remove]);

  const success = useCallback((message: string, duration?: number) => show(message, "success", duration), [show]);
  const error = useCallback((message: string, duration?: number) => show(message, "error", duration), [show]);
  // register global handler for non-React modules
  useEffect(() => {
    setToastHandler(show);
    return () => {
      clearToastHandler();
    };
  }, [show]);

  return (
    <ToastContext.Provider value={{ toasts, show, success, error, remove }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
