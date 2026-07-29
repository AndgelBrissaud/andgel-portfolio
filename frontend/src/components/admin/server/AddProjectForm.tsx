import { useState } from "react";
import serverManagementApi from "../../../services/serverManagement.api";

interface Props {
  onAdded?: () => void;
}

export default function AddProjectForm({ onAdded }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();

    setError(null);

    if (!name.trim()) {
      setError("Le nom du projet est requis.");
      return;
    }

    if (!path.trim()) {
      setError("Le chemin du projet est requis.");
      return;
    }

    setLoading(true);

    try {
      await serverManagementApi.addProject(name.trim(), path.trim());

      setName("");
      setPath("");
      setOpen(false);

      if (onAdded) await onAdded();

      alert("Projet ajouté");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Erreur lors de l'ajout");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {!open ? (
        <button
          type="button"
          className="btn-primary w-full"
          onClick={() => setOpen(true)}
        >
          ➕ Ajouter un projet
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="text-xs text-text-muted">Nom du projet</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded px-3 py-2 bg-transparent border border-white/10"
              placeholder="ex: mon-projet"
            />
          </div>

          <div>
            <label className="text-xs text-text-muted">Chemin sur le serveur</label>
            <input
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="w-full rounded px-3 py-2 bg-transparent border border-white/10"
              placeholder="ex: /opt/docker/mon-projet"
            />
          </div>

          {error && <div className="text-sm text-red-400">{error}</div>}

          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? "Ajout..." : "Ajouter"}
            </button>

            <button
              type="button"
              className="btn-outline"
              onClick={() => {
                setOpen(false);
                setError(null);
              }}
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
