import SectionTitle from "../components/ui/SectionTitle";

import PhotoGallery from "../components/photos/PhotoGallery";









export default function Photography(){



    return (

        <main

            className="
                min-h-screen
                bg-background
                text-text
            "

        >



            {/* HEADER */}



            <section

                className="
                    pt-40
                    pb-16
                "

            >



                <div

                    className="
                        mx-auto
                        max-w-5xl
                        px-6
                        text-center
                    "

                >



                    <SectionTitle

                        eyebrow="Photographie"

                        title="Capturer des instants"

                        description="
                            Une sélection de photographies où
                            lumière, composition et émotion
                            racontent une histoire.
                        "

                    />



                </div>



            </section>









            {/* GALERIE PHOTOS */}



            <section

                className="
                    pb-24
                "

            >



                <div

                    className="
                        mx-auto
                        max-w-7xl
                        px-6
                    "

                >



                    <PhotoGallery />



                </div>



            </section>









            {/* CTA */}



            <section

                className="
                    border-t
                    border-white/10
                    py-24
                "

            >



                <div

                    className="
                        mx-auto
                        max-w-4xl
                        px-6
                        text-center
                    "

                >



                    <h2

                        className="
                            mb-6
                            font-title
                            text-4xl
                            md:text-5xl
                        "

                    >

                        Une vision, une histoire

                    </h2>









                    <p

                        className="
                            mx-auto
                            max-w-2xl
                            text-text-soft
                        "

                    >

                        Chaque image est pensée comme une
                        expérience visuelle unique.

                    </p>



                </div>



            </section>





        </main>

    );

}