import {
    getImageUrl
} from "../../../services/api";


import type {
    Photo,
    PhotoCategory,
} from "../../../types/photo";

import Button from "../../ui/Button";









interface PhotoCardProps {

    photo: Photo;

    onEdit?: (photo: Photo)=>void;

    onDelete?: (photo: Photo)=>void;
    onView?: (photo: Photo)=>void;

}









export default function PhotoCard({
    photo,
    onEdit,
    onDelete,
    onView,
}:PhotoCardProps){

    const categoryLabel = (() => {
        if (!photo.category) return null;
        if (typeof photo.category === "object") return (photo.category as PhotoCategory).name;
        return String(photo.category);
    })();



    return (

        <article
            className="admin-card group"
        >









            {/* IMAGE */}

            <div
                className="relative aspect-[4/3] overflow-hidden bg-black/20"
                onClick={() => (onView ? onView(photo) : undefined)}
                role={onView ? "button" : undefined}
                tabIndex={onView ? 0 : undefined}
                onKeyDown={(e) => {
                    if (onView && (e.key === "Enter" || e.key === " ")) onView(photo);
                }}
                style={{ cursor: onView ? "pointer" : undefined }}
            >
                <img
                    src={getImageUrl(photo.image)}
                    alt={photo.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />





                {categoryLabel && (
                    <span className="absolute left-3 top-3 border border-accent/30 bg-black/50 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-accent backdrop-blur">
                        {categoryLabel}
                    </span>
                )}



            </div>









            {/* CONTENT */}

            <div className="card-content flex flex-col gap-3">









                <div

                    className="
                        min-h-[48px]
                    "

                >

                    <h3

                        className="
                            line-clamp-2
                            font-title
                            text-lg
                            leading-tight
                            text-text
                        "

                    >

                        {photo.title}

                    </h3>


                </div>









                {

                    photo.description && (

                        <p

                            className="
                                line-clamp-3
                                text-xs
                                leading-relaxed
                                text-text-muted
                            "

                        >

                            {photo.description}

                        </p>

                    )

                }









                {/* ACTIONS */}

                {

                    (onEdit || onDelete) && (

                        <div

                            className="
                                mt-auto
                                grid
                                grid-cols-2
                                gap-2
                                border-t
                                border-white/10
                                pt-4
                            "

                        >









                            {onEdit && (
                                <Button type="button" compact onClick={() => onEdit(photo)} className="text-xs text-text-soft hover:border-accent/40 hover:text-white">
                                    Modifier
                                </Button>
                            )}









                            {onDelete && (
                                <Button type="button" compact onClick={() => onDelete(photo)} className="text-xs text-red-400 hover:text-red-300">
                                    Supprimer
                                </Button>
                            )}





                        </div>

                    )

                }





            </div>



        </article>

    );

}