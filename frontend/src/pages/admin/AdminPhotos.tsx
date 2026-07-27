import PhotoForm from "../../components/admin/photos/PhotoForm";

import PhotosList from "../../components/admin/photos/PhotosList";

import PhotoCategoriesManager from "../../components/admin/photos/PhotoCategoriesManager";





export default function AdminPhotos(){


    return (

        <main

            className="
                min-h-screen
                bg-background
                px-6
                py-10
            "

        >



            <div

                className="
                    mx-auto
                    max-w-7xl
                    space-y-12
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

                        Administration

                    </p>





                    <h1

                        className="
                            mt-2
                            font-title
                            text-5xl
                            text-text
                        "

                    >

                        Photographies

                    </h1>





                    <p

                        className="
                            mt-3
                            max-w-2xl
                            text-text-muted
                        "

                    >

                        Gestion complète de la galerie,
                        des images et des catégories.

                    </p>


                </header>









                <section

                    className="
                        space-y-6
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

                            Organisation

                        </p>


                        <h2

                            className="
                                mt-2
                                font-title
                                text-3xl
                                text-text
                            "

                        >

                            Catégories

                        </h2>


                    </div>



                    <PhotoCategoriesManager />


                </section>









                <section

                    className="
                        space-y-6
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

                            Création

                        </p>


                        <h2

                            className="
                                mt-2
                                font-title
                                text-3xl
                                text-text
                            "

                        >

                            Ajouter une photographie

                        </h2>


                    </div>



                    <PhotoForm />


                </section>









                <section

                    className="
                        space-y-6
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

                            Galerie

                        </p>


                        <h2

                            className="
                                mt-2
                                font-title
                                text-3xl
                                text-text
                            "

                        >

                            Photographies existantes

                        </h2>


                    </div>



                    <PhotosList />


                </section>





            </div>


        </main>

    );

}