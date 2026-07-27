import {
    Link,
    useParams
} from "react-router-dom";


import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";
import ImageLightbox from "../components/ui/ImageLightbox";


import useProject from "../hooks/useProject";


import {
    getImageUrl
} from "../services/api";









export default function ProjectDetails(){


    const {
        slug
    } = useParams();



    const {
        project,
        loading,
        error
    } = useProject(slug);









    if(loading){

        return (

            <main
                className="
                    min-h-screen
                    flex
                    items-center
                    justify-center
                    bg-background
                    text-text-muted
                "
            >

                Chargement du projet...

            </main>

        );

    }









    if(error || !project){


        return (

            <main
                className="
                    min-h-screen
                    flex
                    items-center
                    justify-center
                    bg-background
                    text-text
                "
            >

                <h1
                    className="
                        font-title
                        text-4xl
                    "
                >

                    Projet introuvable

                </h1>

            </main>

        );

    }









    const cover = getImageUrl(

        project.image

    );









    return (

        <main
            className="
                min-h-screen
                bg-background
                text-text
            "
        >





            <section
                className="
                    pt-28
                    pb-8
                "
            >

                <div
                    className="
                        mx-auto
                        max-w-6xl
                        px-6
                    "
                >


                    <Link
                        to="/projects"
                        className="
                            text-sm
                            text-text-muted
                            transition
                            hover:text-accent
                        "
                    >

                        ← Retour aux projets

                    </Link>





                    <div className="mt-6">


                        <SectionTitle

                            eyebrow={
                                project.category ?? "Projet"
                            }

                            title={
                                project.title
                            }

                            description={
                                project.description
                            }

                        />


                    </div>


                </div>


            </section>









            {
                cover && (

                    <section
                        className="
                            pb-12
                        "
                    >

                        <div
                            className="
                                mx-auto
                                max-w-6xl
                                px-6
                            "
                        >

                            <img

                                src={cover}

                                alt={project.title}

                                className="
                                    aspect-[16/7]
                                    w-full
                                    rounded-radius-lg
                                    border
                                    border-white/10
                                    object-cover
                                    shadow-shadow-soft
                                "

                            />

                        </div>


                    </section>

                )
            }









            <section
                className="
                    pb-8
                "
            >

                <div
                    className="
                        mx-auto
                        max-w-6xl
                        px-6
                    "
                >

                    <div
                        className="
                            rounded-radius-lg
                            border
                            border-white/10
                            bg-surface
                            p-8
                        "
                    >


                        <h2
                            className="
                                mb-5
                                font-title
                                text-3xl
                            "
                        >

                            À propos du projet

                        </h2>




                        <p
                            className="
                                max-w-4xl
                                leading-relaxed
                                text-text-soft
                            "
                        >

                            {project.description}

                        </p>





                        <div
                            className="
                                mt-8
                                grid
                                gap-6
                                md:grid-cols-2
                            "
                        >

                            <Info

                                label="Année"

                                value={
                                    project.year ?? "-"
                                }

                            />



                            <Info

                                label="Catégorie"

                                value={
                                    project.category ?? "-"
                                }

                            />


                        </div>



                    </div>


                </div>


            </section>









            {
                project.design && (

                    <section
                        className="
                            pb-8
                        "
                    >

                        <div
                            className="
                                mx-auto
                                max-w-6xl
                                px-6
                            "
                        >

                            <div
                                className="
                                    rounded-radius-lg
                                    border
                                    border-white/10
                                    bg-surface
                                    p-8
                                "
                            >


                                <h2
                                    className="
                                        mb-6
                                        font-title
                                        text-3xl
                                    "
                                >

                                    Direction artistique

                                </h2>





                                {
                                    project.design.style && (

                                        <p className="text-text-soft">

                                            {
                                                project.design.style
                                            }

                                        </p>

                                    )
                                }





                                {
                                    project.design.experience && (

                                        <p
                                            className="
                                                mt-4
                                                text-text-soft
                                            "
                                        >

                                            {
                                                project.design.experience
                                            }

                                        </p>

                                    )
                                }





                                {
                                    project.design.colors && (

                                        <div
                                            className="
                                                mt-8
                                                flex
                                                flex-wrap
                                                gap-5
                                            "
                                        >

                                            {
                                                project.design.colors.map(

                                                    color => (

                                                        <div
                                                            key={
                                                                color.value
                                                            }
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-3
                                                            "
                                                        >

                                                            <div
                                                                className="
                                                                    h-8
                                                                    w-8
                                                                    rounded-full
                                                                    border
                                                                    border-white/10
                                                                "
                                                                style={{
                                                                    backgroundColor:
                                                                        color.value
                                                                }}
                                                            />


                                                            <div>

                                                                <p className="text-sm">

                                                                    {
                                                                        color.name
                                                                    }

                                                                </p>


                                                                <p className="text-xs text-text-muted">

                                                                    {
                                                                        color.value
                                                                    }

                                                                </p>


                                                            </div>


                                                        </div>

                                                    )

                                                )
                                            }


                                        </div>

                                    )
                                }



                            </div>


                        </div>


                    </section>

                )
            }









            {
                project.technical.length > 0 && (

                    <section
                        className="
                            pb-8
                        "
                    >

                        <div
                            className="
                                mx-auto
                                max-w-6xl
                                px-6
                            "
                        >

                            <div
                                className="
                                    rounded-radius-lg
                                    border
                                    border-white/10
                                    bg-surface
                                    p-8
                                "
                            >


                                <h2
                                    className="
                                        mb-6
                                        font-title
                                        text-3xl
                                    "
                                >

                                    Aspect technique

                                </h2>



                                <div
                                    className="
                                        flex
                                        flex-wrap
                                        gap-3
                                    "
                                >

                                    {
                                        project.technical.map(

                                            tech => (

                                                <span
                                                    key={tech}
                                                    className="
                                                        rounded-radius-full
                                                        border
                                                        border-white/10
                                                        px-4
                                                        py-2
                                                        text-sm
                                                        text-text-soft
                                                    "
                                                >

                                                    {tech}

                                                </span>

                                            )

                                        )
                                    }


                                </div>


                            </div>


                        </div>


                    </section>

                )
            }









            <section
                className="
                    pb-16
                "
            >

                <div
                    className="
                        mx-auto
                        max-w-6xl
                        px-6
                    "
                >


                    <h2
                        className="
                            mb-3
                            font-title
                            text-3xl
                        "
                    >

                        Galerie

                    </h2>





                    <ImageLightbox

                        images={
                            project.gallery.map(

                                image =>
                                    getImageUrl(image)

                            )
                        }

                        title={
                            project.title
                        }

                    />


                </div>


            </section>









            <section
                className="
                    border-t
                    border-white/10
                    py-16
                    text-center
                "
            >

                <div
                    className="
                        mx-auto
                        max-w-4xl
                        px-6
                    "
                >

                    <h2
                        className="
                            mb-5
                            font-title
                            text-3xl
                        "
                    >

                        Un projet similaire ?

                    </h2>



                    <p
                        className="
                            mb-8
                            text-text-soft
                        "
                    >

                        Vous avez une idée ou un projet numérique ?
                        Créons ensemble une expérience adaptée à vos besoins.

                    </p>




                    <Button href="/contact">

                        Me contacter

                    </Button>



                </div>


            </section>





        </main>

    );

}









function Info({

    label,

    value

}:{

    label:string;

    value:string;

}){


    return (

        <div
            className="
                border-l
                border-accent
                pl-4
            "
        >

            <p
                className="
                    text-xs
                    uppercase
                    tracking-widest
                    text-accent
                "
            >

                {label}

            </p>




            <p
                className="
                    mt-2
                    text-text-soft
                "
            >

                {value}

            </p>


        </div>

    );

}