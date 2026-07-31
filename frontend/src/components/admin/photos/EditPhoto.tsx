import { useState } from "react";
import type { FormEvent } from "react";

import { updatePhoto } from "../../../services/photos.service";
import type { Photo } from "../../../types/photo";
import { getImageUrl } from "../../../services/api";

import usePhotoCategories from "../../../hooks/usePhotoCategories";

import PremiumInput from "../../ui/PremiumInput";
import PremiumSelect from "../../ui/PremiumSelect";
import PremiumField from "../../ui/PremiumField";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import CoverUploader from "../projects/CoverUploader";

interface EditPhotoProps {
    photo: Photo;
    onClose: () => void;
    onUpdated: (photo: Photo) => void;
}

export default function EditPhoto({ photo, onClose, onUpdated }: EditPhotoProps) {
    const [title, setTitle] = useState(photo.title);

    const getCategoryIdFromValue = (val: unknown): number | "" => {
        if (val === null || val === undefined || val === "") return "";
        if (typeof val === "number") return val;
        if (typeof val === "string") {
            if (/^\d+$/.test(val)) return Number(val);
            return "";
        }
        if (typeof val === "object") {
            const obj = val as Record<string, unknown>;
            const id = obj["id"];
            if (typeof id === "number") return id;
            if (typeof id === "string" && /^\d+$/.test(id)) return Number(id);
        }
        return "";
    };

    const [categoryId, setCategoryId] = useState<number | "">(getCategoryIdFromValue(photo.category));
    const [description, setDescription] = useState(photo.description ?? "");
    const [image, setImage] = useState<File | null>(null);
    const currentImage = getImageUrl(photo.image);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { categories, loading: loadingCategories } = usePhotoCategories();


    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", title.trim());
            formData.append("description", description.trim());
            if (categoryId !== "") formData.append("category_id", String(categoryId));
            if (image) formData.append("image", image);

            const updated = await updatePhoto(photo.id, formData);
            onUpdated(updated);
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur lors de la modification.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-surface p-4 shadow-shadow-soft sm:p-5">
            <header className="mb-5 border-b border-white/10 pb-4">
                <p className="text-[10px] uppercase tracking-[0.35em] text-accent">Edition</p>
                <h2 className="mt-2 font-title text-2xl">Modifier la photographie</h2>
                <p className="mt-1 truncate text-xs text-text-muted">{photo.title}</p>
            </header>

            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-6">
                <div className="space-y-4">
                    <PremiumInput label="Titre" value={title} onChange={setTitle} required />
                    <PremiumSelect label="Catégorie" value={categoryId} onChange={setCategoryId} options={categories} placeholder={loadingCategories ? "Chargement..." : "Choisir une catégorie"} />
                    <PremiumInput label="Description" value={description} onChange={setDescription} textarea rows={5} />
                </div>

                <PremiumField label="Image" active={Boolean(currentImage)} description="Modifier uniquement si nécessaire.">
                    <div className="space-y-3">
                        <CoverUploader cover={image} setCover={setImage} currentImage={currentImage} />
                    </div>
                </PremiumField>
            </div>

            {error && <div className="mt-5 rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">{error}</div>}

            <footer className="mt-5 flex justify-end gap-2 border-t border-white/10 pt-4">
                <Button type="button" onClick={onClose} className="h-auto border border-white/10 px-4 py-2 text-xs text-text-soft">Annuler</Button>
                <Button type="submit" disabled={loading}>{loading ? <div className="flex items-center justify-center"><Spinner size={16} /></div> : "Enregistrer"}</Button>
            </footer>
        </form>
    );
}
