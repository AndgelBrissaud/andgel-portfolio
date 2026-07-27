import {
    useEffect,
    useState
} from "react";

import type {
    FormEvent
} from "react";


import {

    updateProject,
    type Project

} from "../../../services/api";

import {
    getProject
} from "../../../services/api";


import TechnologyInput from "./TechnologyInput";


import ColorEditor, {

    type ProjectColor

} from "./ColorEditor";


import CoverUploader from "./CoverUploader";


import GalleryUploader from "./GalleryUploader";







interface EditProjectProps {


    project: Project;


    onClose:()=>void;


}









export default function EditProject({

    project: initialProject,

    onClose

}:EditProjectProps){



    const [

        project,

        setProject

    ] = useState<Project>(initialProject);







    const [

        title,

        setTitle

    ] = useState(initialProject.title);





    const [

        description,

        setDescription

    ] = useState(

        initialProject.description ?? ""

    );





    const [

        category,

        setCategory

    ] = useState(

        initialProject.category ?? ""

    );





    const [

        technologies,

        setTechnologies

    ] = useState<string[]>(

        initialProject.technical ?? []

    );





    const [

        colors,

        setColors

    ] = useState<ProjectColor[]>(

        (initialProject.design?.colors as ProjectColor[])

        ?? []

    );





    const [

        cover,

        setCover

    ] = useState<File | null>(null);





    const [

        gallery,

        setGallery

    ] = useState<File[]>([]);





    const [

        existingImages,

        setExistingImages

    ] = useState<string[]>(

        initialProject.gallery ?? []

    );





    const [

        loading,

        setLoading

    ] = useState(false);





    const [

        message,

        setMessage

    ] = useState("");









    useEffect(()=>{


        async function refresh(){


            try{


                const updated = await getProject(

                    initialProject.slug

                );


                setProject(updated);


            }

            catch(error){


                console.error(error);


            }


        }



        refresh();


    },[initialProject.slug]);









    async function handleSubmit(

        event:FormEvent<HTMLFormElement>

    ){


        event.preventDefault();





        try{


            setLoading(true);

            setMessage("");







            const formData = new FormData();







            formData.append(

                "title",

                title

            );





            formData.append(

                "description",

                description

            );





            formData.append(

                "category",

                category

            );





            formData.append(

                "technical",

                JSON.stringify(

                    technologies

                )

            );





            formData.append(

                "design",

                JSON.stringify({

                    colors

                })

            );









            if(cover){


                formData.append(

                    "cover",

                    cover

                );


            }









            gallery.forEach(

                image=>{


                    formData.append(

                        "gallery",

                        image

                    );


                }

            );









            formData.append(

                "existingImages",

                JSON.stringify(

                    existingImages

                )

            );









            await updateProject(

                project.id,

                formData

            );









            setMessage(

                "Projet modifié avec succès."

            );



        }

        catch(error){


            console.error(error);


            setMessage(

                "Erreur lors de la modification."

            );


        }

        finally{


            setLoading(false);


        }


    }









    return (

        <section

            className="
                rounded-3xl
                border
                border-white/10
                bg-surface
                p-8
                shadow-shadow-soft
            "

        >





            <header

                className="
                    mb-8
                    flex
                    items-start
                    justify-between
                "

            >



                <div>


                    <p

                        className="
                            text-xs
                            uppercase
                            tracking-[0.3em]
                            text-accent
                        "

                    >

                        Projet

                    </p>




                    <h2

                        className="
                            mt-2
                            font-title
                            text-3xl
                        "

                    >

                        Modifier {project.title}

                    </h2>


                </div>





                <button

                    type="button"

                    onClick={onClose}

                    className="
                        rounded-xl
                        border
                        border-white/10
                        px-4
                        py-2
                        text-sm
                        text-white/60
                        transition
                        hover:text-white
                    "

                >

                    Fermer

                </button>



            </header>









            <form

                onSubmit={handleSubmit}

                className="
                    space-y-8
                "

            >





                <input

                    value={title}

                    onChange={e=>

                        setTitle(

                            e.target.value

                        )

                    }

                    placeholder="Titre"

                    className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-black/20
                        px-4
                        py-3
                        text-white
                    "

                />









                <textarea

                    value={description}

                    onChange={e=>

                        setDescription(

                            e.target.value

                        )

                    }

                    rows={6}

                    placeholder="Description"

                    className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-black/20
                        px-4
                        py-3
                        text-white
                    "

                />









                <input

                    value={category}

                    onChange={e=>

                        setCategory(

                            e.target.value

                        )

                    }

                    placeholder="Catégorie"

                    className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-black/20
                        px-4
                        py-3
                        text-white
                    "

                />









                <TechnologyInput

                    technologies={technologies}

                    setTechnologies={setTechnologies}

                />









                <ColorEditor

                    colors={colors}

                    setColors={setColors}

                />









                <CoverUploader

                    cover={cover}

                    setCover={setCover}

                    currentImage={project.image}

                />









                <GalleryUploader

                    gallery={gallery}

                    setGallery={setGallery}

                    existingImages={existingImages}

                    setExistingImages={setExistingImages}

                />









                <footer

                    className="
                        flex
                        justify-end
                        gap-4
                        border-t
                        border-white/10
                        pt-6
                    "

                >



                    <button

                        type="button"

                        onClick={onClose}

                        className="
                            rounded-xl
                            border
                            border-white/10
                            px-6
                            py-3
                            text-white/70
                        "

                    >

                        Annuler

                    </button>





                    <button

                        type="submit"

                        disabled={loading}

                        className="
                            rounded-xl
                            bg-accent
                            px-8
                            py-3
                            font-medium
                            text-black
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









                {
                    message && (

                        <p

                            className="
                                text-sm
                                text-accent
                            "

                        >

                            {message}

                        </p>

                    )
                }








            </form>



        </section>

    );

}