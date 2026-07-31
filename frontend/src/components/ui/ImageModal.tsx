import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ImageModalProps {
  image: string;
  title?: string;
  onClose: () => void;
}

export default function ImageModal({ image, title, onClose }: ImageModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4">
      <button
        aria-label="Fermer"
        onClick={onClose}
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xl text-white/70 hover:text-white"
      >
        ×
      </button>

      <div className="max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg">
        <img src={image} alt={title} className="max-h-[90vh] max-w-[90vw] object-contain" />
      </div>
    </div>,
    document.body,
  );
}
