import { useMemo, useState } from "react";
import SectionTitle from "../components/ui/SectionTitle";

import PhotoGallery from "../components/photos/PhotoGallery";
import CategoryPhotos from "../components/photos/CategoryPhotos";
import usePhotoCategories from "../hooks/usePhotoCategories";
import usePhotos from "../hooks/usePhotos";
import Spinner from "../components/ui/Spinner";
import { Link } from "react-router-dom";
import { getImageUrl } from "../services/api";
import type { Photo } from "../types/photo";

export default function Photography() {
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = usePhotoCategories();
  const { photos, loading: photosLoading } = usePhotos();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [viewMode, setViewMode] = useState<"categories" | "gallery">(
    "categories",
  );

  // helper to extract numeric id from mixed category shapes
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

  const lastPhotoByCategory = useMemo(() => {
    const map: Record<number, Photo | null> = {};
    categories.forEach((cat) => {
      const photosInCat = photos.filter((p) => {
        const cid = getCategoryIdFromValue(p.category);
        if (cid !== null) return cid === Number(cat.id);

        if (p.category && typeof p.category === "string") return p.category === cat.name;

        if (p.category_id !== undefined && p.category_id !== null) return Number(p.category_id) === Number(cat.id);

        return false;
      });
      if (photosInCat.length === 0) {
        map[cat.id] = null;
        return;
      }
      photosInCat.sort((a, b) => {
        const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
        const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
        return tb - ta;
      });
      map[cat.id] = photosInCat[0];
    });

    // also compute last photo for uncategorized (id = 0)
    const uncategorized = photos.filter((p) => {
      const hasCategoryProp =
        p.category !== undefined && p.category !== null && p.category !== "";
      const hasCategoryId =
        p.category_id !== undefined && p.category_id !== null;
      return !hasCategoryProp && !hasCategoryId;
    });
    if (uncategorized.length > 0) {
      uncategorized.sort((a, b) => {
        const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
        const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
        return tb - ta;
      });
      map[0] = uncategorized[0];
    }

    return map;
  }, [categories, photos]);

  return (
    <main className="min-h-screen bg-background text-text">
      {/* HEADER */}
      <section className="pt-40 pb-16">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <SectionTitle
            eyebrow="Photographie"
            title="Capturer des instants"
            description={`Une sélection de photographies où
                            lumière, composition et émotion
                            racontent une histoire.`}
          />
        </div>
      </section>

      {/* CATÉGORIES */}
      {!(viewMode === "gallery" && selectedCategoryId !== null) && (
        <section className="pb-12">
          <div className="mx-auto max-w-7xl px-6">
            {categoriesLoading && (
              <div className="py-12 flex justify-center">
                <Spinner label="Chargement des catégories..." />
              </div>
            )}

            {categoriesError && (
              <p className="text-red-400">{categoriesError}</p>
            )}

            {!categoriesLoading &&
            !categoriesError &&
            categories.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">Aucune catégorie</h3>
                <p className="text-text-muted mb-4">
                  Aucune catégorie de photographies n'a été publiée pour
                  l'instant.
                </p>
                <Link
                  to="/contact"
                  className="text-accent hover:text-accent-light"
                >
                  Contactez‑moi pour en savoir plus →
                </Link>
              </div>
            ) : (
              <div className="mb-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* show uncategorized first if present */}
                  {lastPhotoByCategory[0] && (
                    <button
                      key="uncategorized"
                      onClick={() => {
                        setSelectedCategoryId(0);
                        setViewMode("gallery");
                      }}
                      className={`text-left overflow-hidden border transition-transform duration-300 hover:scale-[1.01] ${selectedCategoryId === 0 && viewMode === "gallery" ? "border-accent shadow-lg" : "border-white/10"} bg-surface`}
                    >
                      <div className="aspect-[16/9] bg-gray-800/30">
                        {photosLoading ? (
                          <div className="flex items-center justify-center h-full">
                            <Spinner size={36} />
                          </div>
                        ) : (
                          <img
                            src={getImageUrl(lastPhotoByCategory[0]!.image)}
                            alt={lastPhotoByCategory[0]!.title}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">Non catégorisée</h3>
                        <p className="text-sm text-text-muted mt-1">
                          {lastPhotoByCategory[0]
                            ? lastPhotoByCategory[0]!.title
                            : "Aucune photo"}
                        </p>
                      </div>
                    </button>
                  )}

                  {categories.map((cat) => {
                    const last = lastPhotoByCategory[cat.id];
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategoryId(cat.id);
                          setViewMode("gallery");
                        }}
                        className={`text-left overflow-hidden border transition-transform duration-300 hover:scale-[1.01] ${selectedCategoryId === cat.id && viewMode === "gallery" ? "border-accent shadow-lg" : "border-white/10"} bg-surface`}
                      >
                        <div className="aspect-[16/9] bg-gray-800/30">
                          {photosLoading ? (
                            <div className="flex items-center justify-center h-full">
                              <Spinner size={36} />
                            </div>
                          ) : last ? (
                            <img
                              src={getImageUrl(last.image)}
                              alt={last.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-text-muted">
                              Aucune photo
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium">{cat.name}</h3>
                          <p className="text-sm text-text-muted mt-1">
                            {last
                              ? last.title
                              : "Aucune photo dans cette catégorie"}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* GALERIE PHOTOS */}
      {viewMode === "gallery" &&
        (selectedCategoryId ? (
          <CategoryPhotos
            categoryId={selectedCategoryId}
            categoryName={
              categories.find((c) => c.id === selectedCategoryId)?.name ||
              "Catégorie"
            }
            categories={categories}
            onBack={() => {
              setSelectedCategoryId(null);
              setViewMode("categories");
            }}
          />
        ) : (
          <section className="pb-24">
            <div className="mx-auto max-w-7xl px-6">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="font-title text-3xl">Toutes les photos</h2>
                </div>
                <div className="text-text-muted text-sm">
                  Sélectionnez une image pour l'agrandir
                </div>
              </div>

              <PhotoGallery categoryId={null} categories={categories} />
            </div>
          </section>
        ))}

      {/* CTA */}
      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-6 font-title text-4xl md:text-5xl">
            Une vision, une histoire
          </h2>
          <p className="mx-auto max-w-2xl text-text-soft">
            Chaque image est pensée comme une expérience visuelle unique.
          </p>
        </div>
      </section>
    </main>
  );
}
