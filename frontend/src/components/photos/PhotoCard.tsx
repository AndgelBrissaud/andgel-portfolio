import { getImageUrl } from "../../services/api";
import type { Photo, PhotoCategory } from "../../types/photo";

interface PhotoCardProps {
  photo: Photo;
  onEdit?: (photo: Photo) => void;
  onDelete?: (photo: Photo) => void;
}

export default function PhotoCard({ photo, onEdit, onDelete }: PhotoCardProps) {
  const categoryLabel = (() => {
    if (!photo.category) return null;
    if (typeof photo.category === "object") return (photo.category as PhotoCategory).name;
    return String(photo.category);
  })();

  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-shadow-soft">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={getImageUrl(photo.image)}
          alt={photo.title}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />

        {categoryLabel && (
          <span className="absolute left-3 top-3 rounded-full border border-accent/30 bg-black/50 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-accent backdrop-blur">
            {categoryLabel}
          </span>
        )}
      </div>

      <div className="space-y-3 p-5">
        <h3 className="font-title text-xl">{photo.title}</h3>

        {photo.description && <p className="text-sm text-text-muted">{photo.description}</p>}

        {(onEdit || onDelete) && (
          <div className="flex gap-3 pt-4">
            {onEdit && (
              <button
                onClick={() => onEdit(photo)}
                className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:text-white"
              >
                Modifier
              </button>
            )}

            {onDelete && (
              <button onClick={() => onDelete(photo)} className="rounded-xl bg-red-500/10 px-4 py-2 text-sm text-red-400">
                Supprimer
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
