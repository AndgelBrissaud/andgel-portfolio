import PremiumField from "../../ui/PremiumField";

import DeleteButton from "../../ui/DeleteButton";



interface GalleryUploaderProps {


    gallery: File[];


    setGallery:(

        files:File[]

    )=>void;



    existingImages?:string[];



    setExistingImages?:(

        images:string[]

    )=>void;


}







export default function GalleryUploader({


    gallery,


    setGallery,


    existingImages = [],


    setExistingImages



}:GalleryUploaderProps){







    function handleChange(

        event:React.ChangeEvent<HTMLInputElement>

    ){


        const files = Array.from(

            event.target.files ?? []

        );



        if(!files.length){

            return;

        }



        setGallery([

            ...gallery,

            ...files

        ]);


    }









    function removeNewImage(

        index:number

    ){


        setGallery(

            gallery.filter(

                (_,i)=>

                    i !== index

            )

        );


    }









    function removeExistingImage(

        index:number

    ){


        if(!setExistingImages){

            return;

        }



        setExistingImages(

            existingImages.filter(

                (_,i)=>

                    i !== index

            )

        );


    }









    return (

        <PremiumField

            label="Galerie"

            active={

                existingImages.length > 0 ||

                gallery.length > 0

            }

        >



            <div

                className="
                    space-y-4
                "

            >







                {

                    (

                        existingImages.length > 0 ||

                        gallery.length > 0

                    )

                    &&

                    (

                        <div

                            className="
                                grid
                                grid-cols-3
                                gap-3
                            "

                        >







                            {

                                existingImages.map(

                                    (

                                        image,

                                        index

                                    )=>(


                                        <div

                                            key={

                                                `existing-${index}`

                                            }

                                            className="
                                                group
                                                relative
                                                overflow-hidden
                                                rounded-xl
                                                border
                                                border-white/10
                                                bg-black/20
                                            "

                                        >



                                            <img

                                                src={image}

                                                alt="Image galerie"

                                                className="
                                                    aspect-square
                                                    w-full
                                                    object-cover
                                                    transition-transform
                                                    duration-500
                                                    group-hover:scale-105
                                                "

                                            />



                                            <DeleteButton

                                                onClick={()=>


                                                    removeExistingImage(index)


                                                }

                                                label="Supprimer l'image"

                                            />



                                        </div>


                                    )

                                )

                            }









                            {

                                gallery.map(

                                    (

                                        image,

                                        index

                                    )=>(


                                        <div

                                            key={

                                                `new-${index}`

                                            }

                                            className="
                                                group
                                                relative
                                                overflow-hidden
                                                rounded-xl
                                                border
                                                border-accent/30
                                                bg-black/20
                                            "

                                        >



                                            <img

                                                src={

                                                    URL.createObjectURL(

                                                        image

                                                    )

                                                }

                                                alt={image.name}

                                                className="
                                                    aspect-square
                                                    w-full
                                                    object-cover
                                                    transition-transform
                                                    duration-500
                                                    group-hover:scale-105
                                                "

                                            />



                                            <DeleteButton

                                                onClick={()=>


                                                    removeNewImage(index)


                                                }

                                                label="Supprimer l'image"

                                            />



                                        </div>


                                    )

                                )

                            }



                        </div>

                    )

                }









                <div

                    className="
                        flex
                        items-center
                        justify-between
                    "

                >



                    <label

                        className="
                            cursor-pointer
                            text-sm
                            font-medium
                            text-accent
                            transition-colors
                            hover:text-accent-light
                        "

                    >

                        + Ajouter des images



                        <input

                            type="file"

                            multiple

                            accept="image/*"

                            onChange={handleChange}

                            className="hidden"

                        />


                    </label>









                    {

                        (

                            existingImages.length +

                            gallery.length

                        ) > 0 &&


                        (

                            <span

                                className="
                                    text-xs
                                    text-text-muted
                                "

                            >

                                {existingImages.length + gallery.length}

                                {" "}

                                image

                                {

                                    existingImages.length + gallery.length > 1

                                    ? "s"

                                    : ""

                                }


                            </span>


                        )

                    }



                </div>



            </div>



        </PremiumField>

    );

}