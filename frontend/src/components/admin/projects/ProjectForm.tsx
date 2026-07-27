import {
    useState
} from "react";


import type {
    FormEvent
} from "react";


import {
    createPhoto
} from "../../../services/photos.service";


import type {
    Photo
} from "../../../types/photo";


import PremiumInput from "../../ui/PremiumInput";

import PremiumSelect from "../../ui/PremiumSelect";

import PhotoUploader from "../photos/PhotoUploader";


import usePhotoCategories from "../../../hooks/usePhotoCategories";









interface PhotoFormProps {


    onCreated?: (

        photo:Photo

    ) => void;


}









export default function PhotoForm({

    onCreated

}:PhotoFormProps){



    const [

        title,

        setTitle

    ] = useState("");





    const [

        categoryId,

        setCategoryId

    ] = useState<number | "">("");





    const [

        description,

        setDescription

    ] = useState("");





    const [

        file,

        setFile

    ] = useState<File | null>(null);





    const [

        loading,

        setLoading

    ] = useState(false);





    const [

        message,

        setMessage

    ] = useState("");









    const {

        categories,

        loading:loadingCategories

    } = usePhotoCategories();









    async function handleSubmit(

        event:FormEvent<HTMLFormElement>

    ){


        event.preventDefault();



        setMessage("");









        if(!title.trim()){


            setMessage(

                "Le titre est obligatoire."

            );


            return;

        }









        if(!categoryId){


            setMessage(

                "La catégorie est obligatoire."

            );


            return;

        }









        if(!file){


            setMessage(

                "L'image est obligatoire."

            );


            return;

        }









        try{


            setLoading(true);





            const formData = new FormData();









            formData.append(

                "title",

                title.trim()

            );









            formData.append(

                "description",

                description.trim()

            );









            formData.append(

                "category_id",

                String(categoryId)

            );









            formData.append(

                "image",

                file

            );









            const photo = await createPhoto(

                formData

            );









            onCreated?.(

                photo

            );









            setMessage(

                "Photo créée avec succès."

            );









            setTitle("");

            setCategoryId("");

            setDescription("");

            setFile(null);


        }


        catch(error){


            console.error(error);



            setMessage(

                error instanceof Error

                ?

                error.message

                :

                "Erreur lors de la création."

            );


        }


        finally{


            setLoading(false);


        }


    }
        return (

        <section

            className="
                rounded-radius-lg
                border
                border-white/10
                bg-surface/70
                backdrop-blur-xl
                p-10
                shadow-shadow-soft
            "

        >



            <header

                className="
                    mb-10
                "

            >


                <p

                    className="
                        text-xs
                        uppercase
                        tracking-[0.35em]
                        text-accent
                        mb-3
                    "

                >

                    Administration

                </p>





                <h2

                    className="
                        font-title
                        text-4xl
                        text-text
                    "

                >

                    Nouvelle photographie

                </h2>





                <p

                    className="
                        mt-3
                        text-sm
                        text-text-soft
                    "

                >

                    Ajoutez une nouvelle image à votre galerie.

                </p>


            </header>









            <form

                onSubmit={handleSubmit}

                className="
                    space-y-10
                "

            >





                <PremiumInput

                    label="Titre de la photographie"

                    value={title}

                    onChange={setTitle}

                    placeholder="Nom de la photographie"

                    required

                />









                <PremiumSelect

                    label="Catégorie"

                    value={categoryId}

                    onChange={setCategoryId}

                    options={categories}

                    required

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

                    placeholder="Description de la photographie"

                    textarea

                    rows={6}

                />









                <PhotoUploader

                    file={file}

                    setFile={setFile}

                />









                {

                    message && (

                        <p

                            className="
                                text-center
                                text-sm
                                text-accent
                            "

                        >

                            {message}

                        </p>

                    )

                }
                <button

                    type="submit"

                    disabled={loading}

                    className="
                        w-full
                        rounded-radius-full
                        bg-accent
                        px-8
                        py-4
                        text-background
                        font-medium
                        transition-all
                        duration-duration-base
                        hover:bg-accent-light
                        hover:-translate-y-1
                        disabled:opacity-50
                    "

                >


                    {

                        loading

                        ?

                        "Création..."

                        :

                        "Créer la photographie"

                    }


                </button>









            </form>



        </section>

    );

}