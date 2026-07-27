import SectionTitle from "../ui/SectionTitle";

import ExpertiseCard from "../ui/ExpertiseCard";





export default function ExpertiseSection(){


    return (

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
                    max-w-7xl
                    px-6
                "

            >



                <SectionTitle

                    eyebrow="Expertise"

                    title="Ce que je crée"

                    description="
                        Des solutions digitales avec une attention
                        particulière portée au détail.
                    "

                />







                <div

                    className="
                        mt-12

                        grid

                        grid-cols-1

                        lg:grid-cols-3

                        gap-8
                    "

                >



                    <ExpertiseCard

                        index="01"

                        title="Développement"

                        text="
                            Sites vitrines, applications web
                            et interfaces modernes avec React,
                            TypeScript et des architectures solides.
                        "

                    />




                    <ExpertiseCard

                        index="02"

                        title="Direction artistique"

                        text="
                            Création d'univers visuels cohérents,
                            choix des couleurs, typographies
                            et expérience utilisateur.
                        "

                    />




                    <ExpertiseCard

                        index="03"

                        title="Photographie"

                        text="
                            Images pensées pour transmettre
                            une émotion, une identité
                            et une histoire.
                        "

                    />



                </div>



            </div>


        </section>

    );

}