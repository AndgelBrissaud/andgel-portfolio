import ProjectForm from "../../components/admin/projects/ProjectForm";

import ProjectsList from "../../components/admin/projects/ProjectsList";





export default function AdminProjects(){



    return (

        <section

            className="
                space-y-10
            "

        >





            <header>


                <p

                    className="
                        text-xs
                        uppercase
                        tracking-[0.3em]
                        text-accent
                    "

                >

                    Gestion

                </p>





                <h1

                    className="
                        mt-3
                        font-title
                        text-4xl
                    "

                >

                    Projets

                </h1>





                <p

                    className="
                        mt-3
                        max-w-2xl
                        text-text-muted
                    "

                >

                    Créez, modifiez et supprimez les projets
                    présents sur le portfolio.

                </p>


            </header>









            <div

                className="
                    grid
                    gap-10
                    xl:grid-cols-[420px_1fr]
                    items-start
                "

            >





                {/* CREATION */}


                <div>


                    <ProjectForm />


                </div>









                {/* LISTE */}


                <div

                    className="
                        min-w-0
                    "

                >


                    <ProjectsList />


                </div>




            </div>





        </section>

    );

}