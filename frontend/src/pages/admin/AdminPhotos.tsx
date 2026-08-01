import { useState } from "react";

import PhotoForm from "../../components/admin/projects/ProjectForm";
import PhotosList from "../../components/admin/photos/PhotosList";
import PhotoCategoriesManager from "../../components/admin/photos/PhotoCategoriesManager";

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm font-medium transition ${
        active ? "bg-accent text-black" : "bg-white/5 text-white/70 hover:bg-white/10"
      }`}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

export default function AdminPhotos() {
  const [view, setView] = useState<"categories" | "create">("categories");
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Page header removed per request */}

        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent">Organisation</p>
                <h2 className="mt-2 font-title text-3xl text-text">Catégories</h2>
                <p className="text-xs text-text-muted">Créez et organisez vos thèmes photographiques.</p>
              </div>

              <div className="flex gap-2">
                <TabButton label="Catégories" active={view === "categories"} onClick={() => setView("categories")} />
                <TabButton label="Ajouter" active={view === "create"} onClick={() => setView("create")} />
              </div>
            </div>

            <div>{view === "categories" ? <PhotoCategoriesManager /> : <PhotoForm />}</div>
          </section>

          <section className="space-y-6">
            <PhotosList />
          </section>
        </div>
      </div>
    </main>
  );
}
