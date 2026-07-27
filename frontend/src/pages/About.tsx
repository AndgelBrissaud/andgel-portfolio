import SectionTitle from "../components/ui/SectionTitle";
import ValueCard from "../components/ui/ValueCard";





export default function About() {


    return (


        <main

            className="
                relative

                overflow-hidden

                bg-background

                text-text

                min-h-screen
            "

        >





            {/* lumière générale */}

            <div

                className="
                    absolute

                    top-0

                    left-1/2

                    -translate-x-1/2

                    h-[500px]

                    w-[500px]

                    rounded-full

                    bg-accent/10

                    blur-[160px]

                    pointer-events-none
                "

            />









            {/* INTRO */}

            <section

                className="
                    relative

                    pt-36

                    pb-20
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

                        eyebrow="À propos"

                        title="Entre technologie, design et image."

                        description="
                            Développeur Full Stack et photographe,
                            je crée des expériences numériques où
                            chaque détail possède une intention.
                        "

                    />


                </div>


            </section>









            {/* PRESENTATION */}

            <section

                className="
                    relative

                    py-20
                "

            >


                <div

                    className="
                        mx-auto

                        max-w-7xl

                        px-6

                        grid

                        grid-cols-1

                        lg:grid-cols-12

                        gap-12

                        items-center
                    "

                >









                    {/* TEXTE */}

                    <div

                        className="
                            lg:col-span-6

                            max-w-xl
                        "

                    >



                        <p

                            className="
                                text-xs

                                uppercase

                                tracking-[0.45em]

                                text-accent

                                mb-4
                            "

                        >

                            Mon approche

                        </p>







                        <h2

                            className="
                                font-title

                                text-4xl

                                md:text-5xl

                                leading-[1.05]
                            "

                        >

                            Je transforme des idées
                            en expériences digitales.

                        </h2>







                        <div

                            className="
                                mt-6

                                space-y-4

                                text-text-soft

                                leading-relaxed
                            "

                        >



                            <p>

                                Je crée des interfaces où le développement,
                                le design et l'image travaillent ensemble.

                            </p>




                            <p>

                                Chaque projet recherche l'équilibre entre
                                technologie solide, esthétique maîtrisée
                                et expérience intuitive.

                            </p>



                        </div>







                    </div>









                    {/* IDENTITE VISUELLE */}

                    <div

                        className="
                            lg:col-span-6

                            flex

                            justify-center
                        "

                    >




                        <div

                            className="
                                group

                                relative

                                h-[420px]

                                w-full

                                max-w-[420px]

                                overflow-hidden

                                border

                                border-white/10

                                bg-[#0b0d10]
                            "

                        >






                            {/* halo */}

                            <div

                                className="
                                    absolute

                                    -right-20

                                    -bottom-20

                                    h-64

                                    w-64

                                    rounded-full

                                    bg-accent/20

                                    blur-[100px]

                                    transition-all

                                    duration-700

                                    group-hover:scale-125
                                "

                            />








                            {/* reflet */}

                            <div

                                className="
                                    absolute

                                    inset-0

                                    bg-gradient-to-br

                                    from-white/[0.08]

                                    via-transparent

                                    to-transparent
                                "

                            />









                            <div

                                className="
                                    relative

                                    z-10

                                    flex

                                    h-full

                                    flex-col

                                    justify-end

                                    p-8
                                "

                            >





                                <p

                                    className="
                                        text-xs

                                        uppercase

                                        tracking-[0.45em]

                                        text-accent
                                    "

                                >

                                    Andgel Brissaud

                                </p>







                                <h3

                                    className="
                                        mt-4

                                        font-title

                                        text-5xl

                                        leading-none
                                    "

                                >

                                    Créateur
                                    <br />
                                    digital

                                </h3>







                                <p

                                    className="
                                        mt-5

                                        text-sm

                                        text-text-soft

                                    "

                                >

                                    Full Stack Developer
                                    <br />
                                    Photographer

                                </p>





                            </div>









                            {/* ligne */}

                            <div

                                className="
                                    absolute

                                    bottom-0

                                    left-0

                                    h-px

                                    w-0

                                    bg-accent

                                    transition-all

                                    duration-700

                                    group-hover:w-full
                                "

                            />





                        </div>



                    </div>






                </div>


            </section>









            {/* VALEURS */}

            <section

                className="
                    relative

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





                    <div

                        className="
                            mb-10
                        "

                    >



                        <p

                            className="
                                text-xs

                                uppercase

                                tracking-[0.45em]

                                text-accent
                            "

                        >

                            Philosophie

                        </p>





                        <h2

                            className="
                                mt-3

                                font-title

                                text-4xl
                            "

                        >

                            Ce qui guide mes créations.

                        </h2>




                    </div>








                    <div

                        className="
                            grid

                            grid-cols-1

                            md:grid-cols-3

                            gap-8
                        "

                    >




                        <ValueCard

                            number="01"

                            title="Design"

                            text="
                                Une esthétique maîtrisée,
                                pensée pour durer et créer
                                une identité forte.
                            "

                        />





                        <ValueCard

                            number="02"

                            title="Technologie"

                            text="
                                Des architectures modernes,
                                performantes et adaptées
                                aux besoins réels.
                            "

                        />





                        <ValueCard

                            number="03"

                            title="Image"

                            text="
                                Une approche photographique
                                pour transmettre une émotion
                                aux projets.
                            "

                        />





                    </div>



                </div>


            </section>





        </main>


    );


}