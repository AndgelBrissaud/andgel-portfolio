import { useEffect, useState } from "react";
import { getPhotos } from "../../services/photos.service";
import type { Photo } from "../../types/photo";
import PhotoCard from "./PhotoCard";
import Spinner from "../ui/Spinner";

interface PhotoGalleryProps {
    categoryId?: number | null;
    categories?: { id: number; name: string }[];
}

export default function PhotoGallery({ categoryId, categories }: PhotoGalleryProps) {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);

    // Helper: extract numeric id from various shapes
    const getCategoryIdFromValue = (val: unknown): number | null => {
        if (val === null || val === undefined) return null;
        if (typeof val === "number") return val;
        if (typeof val === "string") {
            if (/^\d+$/.test(val)) return Number(val);
            return null;
        }
        if (typeof val === "object") {
            const obj = val as Record<string, unknown>;
            if ("id" in obj) {
                const id = obj["id"];
                if (typeof id === "number") return id;
                if (typeof id === "string" && /^\d+$/.test(id)) return Number(id);
            }
        }
        return null;
    };

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                setLoading(true);
                const data = await getPhotos();
                if (!cancelled) setPhotos(data);
            } catch (e) {
                console.error("getPhotos failed", e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => {
            cancelled = true;
        };
    }, []);

    const filteredPhotos = categoryId !== null && categoryId !== undefined
        ? photos.filter((photo) => {
              // special case: categoryId === 0 means uncategorized
              if (Number(categoryId) === 0) {
                  const hasCategoryProp = photo.category !== undefined && photo.category !== null && photo.category !== "";
                  const hasCategoryId = photo.category_id !== undefined && photo.category_id !== null;
                  return !hasCategoryProp && !hasCategoryId;
              }

              const cid = getCategoryIdFromValue(photo.category);
              if (cid !== null) return cid === Number(categoryId);

              if (photo.category && typeof photo.category === "string") {
                  if (!categories) return false;
                  const cat = categories.find((c) => c.id === categoryId);
                  return Boolean(cat && cat.name === photo.category);
              }

              if (photo.category_id !== undefined && photo.category_id !== null) {
                  return Number(photo.category_id) === Number(categoryId);
              }

              return false;
          })
        : photos;

    if (loading) {
        return (
            <div className="py-8 flex justify-center">
                <Spinner label="Chargement des photographies..." />
            </div>
        );
    }

    if (!loading && filteredPhotos.length === 0) {
        return (
            <div className="text-center text-text-muted">
                {categoryId ? (
                    <>
                        <h3 className="text-lg font-medium mb-2">Aucune photo dans cette catégorie</h3>
                        <p>Cette catégorie ne contient pas encore de photographie.</p>
                    </>
                ) : (
                    <>
                        <h3 className="text-lg font-medium mb-2">Aucune photographie disponible</h3>
                        <p>Les photographies sont en cours d'ajout. Revenez bientôt.</p>
                    </>
                )}
            </div>
        );
    }

    return (
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {filteredPhotos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
            ))}
        </div>
    );
}