import PhotoGallery from "./PhotoGallery";
interface Props {
  categoryId: number;
  categoryName: string;
  categories: { id: number; name: string }[];
  onBack: () => void;
}

export default function CategoryPhotos({ categoryId, categoryName, categories, onBack }: Props) {
  return (
    <section className="pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button onClick={onBack} className="text-sm text-text-muted hover:text-white mr-4">← Retour aux catégories</button>
            <h2 className="font-title text-3xl">{categoryName}</h2>
            <p className="text-text-muted mt-1 text-sm">Galerie — {categoryName}</p>
          </div>
        </div>

        <PhotoGallery categoryId={categoryId} categories={categories} />
      </div>
    </section>
  );
}
