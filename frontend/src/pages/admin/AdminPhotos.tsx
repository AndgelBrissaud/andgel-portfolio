import { useState } from "react";

import PhotoForm from "../../components/admin/photos/PhotoForm";
import PhotosList from "../../components/admin/photos/PhotosList";
import PhotoCategoriesManager from "../../components/admin/photos/PhotoCategoriesManager";

export default function AdminPhotos() {
  const [view, setView] = useState<"categories" | "create">("categories");

  function TabButton({ name, label }: { name: "categories" | "create"; label: string }) {
    const active = view === name;
    return (
      <button
        onClick={() => setView(name)}
        className={`px-4 py-2 rounded-md text-sm font-medium transition ${
          active ? "bg-accent text-black" : "bg-white/5 text-white/70 hover:bg-white/10"
        }`}
        aria-pressed={active}
      >
        {label}
      </button>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-12">
        <header>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Administration</p>
          <h1 className="mt-2 font-title text-5xl text-text">Photographies</h1>
          <p className="mt-3 max-w-2xl text-text-muted">Gestion complète de la galerie, des images et des catégories.</p>
        </header>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Organisation</p>
              <h2 className="mt-2 font-title text-3xl text-text">Catégories</h2>
              <p className="text-xs text-text-muted">Créez et organisez vos thèmes photographiques.</p>
            </div>

            <div className="flex gap-2">
              <TabButton name="categories" label="Catégories" />
              <TabButton name="create" label="Ajouter" />
            </div>
          </div>

          <div>
            {view === "categories" ? (
              <PhotoCategoriesManager />
            ) : (
              <PhotoForm />
            )}
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Galerie</p>
            <h2 className="mt-2 font-title text-3xl text-text">Photographies existantes</h2>
          </div>

          <PhotosList />
        </section>
      </div>
    </main>
  );
}
