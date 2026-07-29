import { useEffect, useMemo, useState } from "react";

import {
    getPhotoCategories,
    deletePhotoCategory,
    createPhotoCategory
} from "../../../services/photos.service";
import Spinner from "../../ui/Spinner";

import type { PhotoCategory } from "../../../types/photo";

import PremiumInput from "../../ui/PremiumInput";
import Button from "../../ui/Button";
import { useToast } from "../../../context/ToastContext";

export default function PhotoCategoriesManager(){

    const [categories, setCategories] = useState<PhotoCategory[]>([]);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");
    const { success: toastSuccess, error: toastError } = useToast();

    const sortedCategories = useMemo(() => {
        return [...categories].sort((a,b) => a.name.localeCompare(b.name));
    }, [categories]);

    useEffect(() => {
        async function loadCategories(){
            try{
                const data = await getPhotoCategories();
                setCategories(data);
                setError("");
            } catch(err){
                setError(err instanceof Error ? err.message : "Erreur chargement catégories.");
            } finally{
                setLoading(false);
            }
        }

        loadCategories();
    }, []);

    async function handleCreate(){
        const value = name.trim();
        if(!value){
            setError("Veuillez saisir un nom de catégorie.");
            return;
        }

            try{
                setCreating(true);
                setError("");
                const category = await createPhotoCategory(value);
                setCategories(current => [...current, category]);
                setName("");
                try { console.debug("PhotoCategoriesManager: calling toastSuccess"); toastSuccess("Catégorie créée."); } catch (e) { console.error("toastSuccess failed", e); }
            } catch(err){
                const msg = err instanceof Error ? err.message : "Erreur création catégorie.";
                setError(msg);
                try { toastError(msg); } catch (e) { console.error("toastError failed", e); }
            } finally{
                setCreating(false);
            }
    }

    async function handleDelete(category: PhotoCategory){
        const confirmDelete = window.confirm(`Supprimer "${category.name}" ?`);
        if(!confirmDelete) return;

        try{
            await deletePhotoCategory(category.id);
            setCategories(current => current.filter(item => item.id !== category.id));
            try { console.debug("PhotoCategoriesManager: calling toastSuccess delete"); toastSuccess("Catégorie supprimée."); } catch (e) { console.error("toastSuccess failed", e); }
        } catch(err){
            const msg = err instanceof Error ? err.message : "Erreur suppression catégorie.";
            setError(msg);
            try { toastError(msg); } catch (e) { console.error("toastError failed", e); }
        }
    }

    if(loading){
        return (
            <section className="rounded-2xl border border-white/10 bg-surface p-5 text-center text-sm text-text-muted">
                <div className="py-6 flex justify-center">
                    <Spinner label="Chargement des catégories..." />
                </div>
            </section>
        );
    }

    return (
        <section className="space-y-6 rounded-2xl border border-white/10 bg-surface p-4 shadow-shadow-soft sm:p-5">

            <header className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.35em] text-accent">Organisation</p>
                <h2 className="font-title text-2xl">Catégories photos</h2>
                <p className="text-xs text-text-muted">Créez et organisez vos thèmes photographiques.</p>
            </header>

            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                    <PremiumInput label="Nouvelle catégorie" value={name} onChange={setName} placeholder="Ex : Architecture, Portrait..." />
                    <Button type="button" compact onClick={handleCreate} disabled={creating} className="h-10 bg-accent px-5 text-xs font-medium text-black">
                        {creating ? <div className="flex items-center justify-center"><Spinner size={14} /></div> : "Ajouter"}
                    </Button>
                </div>
            </div>

            {error && (
                <div className="rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">{error}</div>
            )}

            {sortedCategories.length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-black/20 p-6 text-center text-sm text-text-muted">Aucune catégorie.</div>
            ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedCategories.map(category => (
                        <article key={category.id} className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 transition hover:border-accent/40">
                            <span className="truncate text-sm text-white">{category.name}</span>
                            <Button type="button" compact onClick={() => handleDelete(category)} className="shrink-0 text-[10px] uppercase tracking-wide text-red-400 hover:text-red-300">Supprimer</Button>
                        </article>
                    ))}
                </div>
            )}

        </section>
    );
}
