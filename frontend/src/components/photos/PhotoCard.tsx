import { useState } from "react";
import { getImageUrl } from "../../services/api";
import type { Photo } from "../../types/photo";

interface PhotoCardProps {
  photo: Photo;
  onView?: (photo: Photo) => void;
  featured?: boolean;
  className?: string;
}

export default function PhotoCard({ photo, onView, featured = false, className = "" }: PhotoCardProps) {
  const [loaded, setLoaded] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!onView) return;
    if (e.key === "Enter" || e.key === " ") onView(photo);
  };

  return (
    <article
      className={`overflow-hidden bg-surface ${featured ? "shadow-md" : "shadow-sm"} ${className} transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.03] flex flex-col h-full focus-within:ring-2 focus-within:ring-accent`}
    >
      <div
        className={`relative group ${featured ? "aspect-[16/10]" : "aspect-[4/3]"} flex-shrink-0 overflow-hidden`}
        role={onView ? "button" : undefined}
        tabIndex={onView ? 0 : undefined}
        onClick={() => onView && onView(photo)}
        onKeyDown={handleKeyDown}
        aria-label={photo.title || "Voir la photo"}
        style={{ cursor: onView ? "pointer" : undefined }}
      >
        {/* placeholder while loading */}
        <div className={`absolute inset-0 transition-opacity ${loaded ? "opacity-0" : "opacity-100"}`}>
          <div className="w-full h-full bg-gradient-to-br from-gray-800/20 to-gray-800/10 animate-pulse" />
        </div>

        <img
          src={getImageUrl(photo.image)}
          alt={photo.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
        />

        {/* magnifier icon on hover (clean) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 p-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-5 h-5">
              <circle cx="11" cy="11" r="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-start">
        <h3 className={`font-title ${featured ? "text-2xl" : "text-lg"} mb-2 leading-tight`}>{photo.title}</h3>
        {photo.description && <p className="text-sm text-text-muted mb-4 line-clamp-3">{photo.description}</p>}
      </div>
    </article>
  );
}
