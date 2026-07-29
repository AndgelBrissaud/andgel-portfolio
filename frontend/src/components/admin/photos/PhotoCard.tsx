import {
    getImageUrl
} from "../../../services/api";


import type {
    Photo
} from "../../../types/photo";

import Button from "../../ui/Button";









interface PhotoCardProps {

    photo: Photo;

    onEdit?: (photo: Photo)=>void;

    onDelete?: (photo: Photo)=>void;

}









export default function PhotoCard({

    photo,

    onEdit,

    onDelete

}:PhotoCardProps){



    return (

        <article

            className="
                group
                flex
                h-full
                flex-col
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-surface
                transition-all
                duration-500
                hover:border-accent/30
            "

        >









            {/* IMAGE */}

            <div

                className="
                    relative
                    aspect-[4/3]
                    overflow-hidden
                    bg-black/20
                "

            >



                <img

                    src={getImageUrl(photo.image)}

                    alt={photo.title}

                    loading="lazy"

                    className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                    "

                />





                {

                    photo.category && (

                        <span

                            className="
                                absolute
                                left-3
                                top-3
                                rounded-full
                                border
                                border-accent/30
                                bg-black/50
                                px-2.5
                                py-1
                                text-[10px]
                                uppercase
                                tracking-[0.15em]
                                text-accent
                                backdrop-blur
                            "

                        >

                            {photo.category.name}

                        </span>

                    )

                }



            </div>









            {/* CONTENT */}

            <div

                className="
                    flex
                    flex-1
                    flex-col
                    gap-3
                    p-4
                "

            >









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









                            {

                                onEdit && (

                                    <Button type="button" compact onClick={()=>onEdit(photo)} className="rounded-lg px-3 py-2 text-xs text-text-soft hover:border-accent/40 hover:text-white">

                                        Modifier

                                    </Button>

                                )

                            }









                            {

                                onDelete && (

                                    <Button type="button" compact onClick={()=>onDelete(photo)} className="rounded-lg px-3 py-2 text-xs text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-400/20">

                                        Supprimer

                                    </Button>

                                )

                            }





                        </div>

                    )

                }





            </div>



        </article>

    );

}