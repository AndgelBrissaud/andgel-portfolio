import { useEffect, useState } from "react";
import { getPhotos, deletePhoto } from "../../../services/photos.service";
import { getImageUrl } from "../../../services/api";
import type { Photo } from "../../../types/photo";
import PhotoCard from "./PhotoCard";
import EditPhoto from "./EditPhoto";
import ImageModal from "../../ui/ImageModal";

export default function PhotosList() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Photo | null>(null);
  const [viewing, setViewing] = useState<Photo | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getPhotos();
        if (cancelled) return;
        setPhotos(data);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Impossible de charger les photographies.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDelete(photo: Photo) {
    const confirmed = window.confirm(`Supprimer "${photo.title}" ?`);
    if (!confirmed) return;

    try {
      await deletePhoto(photo.id);
      setPhotos((current) => current.filter((item) => item.id !== photo.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erreur suppression photo.");
    }
  }

  function handleUpdated(updated: Photo) {
    setPhotos((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    setEditing(null);
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-white/10 bg-surface px-4 py-5 text-center text-sm text-text-muted">Chargement des photographies...</div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-5 text-center text-sm text-red-300">{error}</div>
    );
  }

  return (
    <section className="space-y-4">
      <header className="flex flex-col gap-1">
        <p className="text-[10px] uppercase tracking-[0.35em] text-accent">Administration</p>
        <h2 className="font-title text-2xl sm:text-3xl">Photographies</h2>
        <p className="text-xs text-text-muted">{photos.length} photographie(s) dans le portfolio.</p>
      </header>

      {photos.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-surface px-4 py-8 text-center text-sm text-text-muted">Aucune photographie disponible.</div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {photos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} onEdit={setEditing} onDelete={handleDelete} onView={(p) => setViewing(p)} />
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm">
          <div className="max-h-[95vh] w-full max-w-lg overflow-y-auto">
            <EditPhoto photo={editing} onClose={() => setEditing(null)} onUpdated={handleUpdated} />
          </div>
        </div>
      )}

      {viewing && <ImageModal image={getImageUrl(viewing.image)} title={viewing.title} onClose={() => setViewing(null)} />}
    </section>
  );
}
