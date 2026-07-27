import {
    useEffect,
    useState
} from "react";


import type {
    ChangeEvent,
    FormEvent
} from "react";


import {
    updatePhoto
} from "../../../services/photos.service";


import type {
    Photo
} from "../../../types/photo";


import {
    getImageUrl
} from "../../../services/api";


import usePhotoCategories from "../../../hooks/usePhotoCategories";


import PremiumInput from "../../ui/PremiumInput";

import PremiumSelect from "../../ui/PremiumSelect";

import PremiumField from "../../ui/PremiumField";









interface EditPhotoProps {

    photo: Photo;

    onClose: () => void;

    onUpdated: (photo: Photo) => void;

}









export default function EditPhoto({

    photo,

    onClose,

    onUpdated

}: EditPhotoProps) {



    const [title,setTitle] =
        useState(photo.title);



    const [categoryId,setCategoryId] =
        useState<number | "">(
            photo.category?.id ?? ""
        );



    const [description,setDescription] =
        useState(
            photo.description ?? ""
        );



    const [image,setImage] =
        useState<File | null>(null);



    const [preview,setPreview] =
        useState(
            getImageUrl(photo.image)
        );



    const [loading,setLoading] =
        useState(false);



    const [error,setError] =
        useState("");









    const {

        categories,

        loading:loadingCategories

    } = usePhotoCategories();









    useEffect(()=>{


        return ()=>{


            if(

                preview.startsWith("blob:")

            ){

                URL.revokeObjectURL(preview);

            }


        };


    },[preview]);









    function handleImageChange(

        event:ChangeEvent<HTMLInputElement>

    ){


        const file =
            event.target.files?.[0];



        if(!file){

            return;

        }



        const url =
            URL.createObjectURL(file);



        setImage(file);

        setPreview(url);


    }









    async function handleSubmit(

        event:FormEvent<HTMLFormElement>

    ){


        event.preventDefault();


        setError("");

        setLoading(true);





        try{


            const formData =
                new FormData();



            formData.append(

                "title",

                title.trim()

            );



            formData.append(

                "description",

                description.trim()

            );



            if(categoryId !== ""){


                formData.append(

                    "category_id",

                    String(categoryId)

                );


            }



            if(image){


                formData.append(

                    "image",

                    image

                );


            }





            const updated =
                await updatePhoto(

                    photo.id,

                    formData

                );





            onUpdated(updated);

            onClose();



        }

        catch(error){


            setError(

                error instanceof Error

                ?

                error.message

                :

                "Erreur lors de la modification."

            );


        }

        finally{


            setLoading(false);


        }


    }









    return (

        <form

            onSubmit={handleSubmit}

            className="
                w-full
                max-h-[90vh]
                overflow-y-auto
                rounded-2xl
                border
                border-white/10
                bg-surface
                p-4
                shadow-shadow-soft
                sm:p-5
            "

        >









            <header

                className="
                    mb-5
                    border-b
                    border-white/10
                    pb-4
                "

            >

                <p

                    className="
                        text-[10px]
                        uppercase
                        tracking-[0.35em]
                        text-accent
                    "

                >

                    Edition

                </p>





                <h2

                    className="
                        mt-2
                        font-title
                        text-2xl
                    "

                >

                    Modifier la photographie

                </h2>



                <p

                    className="
                        mt-1
                        truncate
                        text-xs
                        text-text-muted
                    "

                >

                    {photo.title}

                </p>


            </header>









            <div

                className="
                    grid
                    gap-5
                    lg:grid-cols-[minmax(0,1fr)_280px]
                    lg:gap-6
                "

            >









                <div

                    className="
                        space-y-4
                    "

                >



                    <PremiumInput

                        label="Titre"

                        value={title}

                        onChange={setTitle}

                        required

                    />





                    <PremiumSelect

                        label="Catégorie"

                        value={categoryId}

                        onChange={setCategoryId}

                        options={categories}

                        placeholder={

                            loadingCategories

                            ?

                            "Chargement..."

                            :

                            "Choisir une catégorie"

                        }

                    />





                    <PremiumInput

                        label="Description"

                        value={description}

                        onChange={setDescription}

                        textarea

                        rows={5}

                    />



                </div>









                <PremiumField

                    label="Image"

                    active={Boolean(preview)}

                    description="Modifier uniquement si nécessaire."

                >



                    <div

                        className="
                            space-y-3
                        "

                    >



                        <img

                            src={preview}

                            alt={title}

                            className="
                                aspect-[4/3]
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                object-cover
                            "

                        />





                        <label

                            className="
                                flex
                                cursor-pointer
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-white/10
                                px-3
                                py-2
                                text-xs
                                text-text-soft
                                transition
                                hover:border-accent/40
                                hover:text-white
                            "

                        >

                            Changer l'image



                            <input

                                type="file"

                                accept="image/*"

                                onChange={handleImageChange}

                                className="hidden"

                            />


                        </label>



                    </div>



                </PremiumField>









            </div>









            {

                error && (

                    <div

                        className="
                            mt-5
                            rounded-lg
                            border
                            border-red-400/20
                            bg-red-500/10
                            px-3
                            py-2
                            text-xs
                            text-red-400
                        "

                    >

                        {error}

                    </div>

                )

            }









            <footer

                className="
                    mt-5
                    flex
                    justify-end
                    gap-2
                    border-t
                    border-white/10
                    pt-4
                "

            >



                <button

                    type="button"

                    onClick={onClose}

                    className="
                        rounded-lg
                        border
                        border-white/10
                        px-4
                        py-2
                        text-xs
                        text-text-soft
                        transition
                        hover:border-white/20
                        hover:text-white
                    "

                >

                    Annuler

                </button>





                <button

                    type="submit"

                    disabled={loading}

                    className="
                        rounded-lg
                        bg-accent
                        px-5
                        py-2
                        text-xs
                        font-medium
                        text-black
                        transition
                        hover:opacity-90
                        disabled:opacity-50
                    "

                >

                    {

                        loading

                        ?

                        "Sauvegarde..."

                        :

                        "Enregistrer"

                    }


                </button>




            </footer>



        </form>

    );

}