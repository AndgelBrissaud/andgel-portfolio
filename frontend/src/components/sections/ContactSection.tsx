import Button from "../ui/Button";





export default function ContactSection() {


    return (

        <section

            className="
                relative

                overflow-hidden

                border-t

                border-white/10

                py-28
            "

        >





            {/* profondeur lumineuse */}

            <div

                className="
                    absolute

                    left-1/2

                    top-0

                    -translate-x-1/2

                    h-[400px]

                    w-[400px]

                    rounded-full

                    bg-accent/10

                    blur-[140px]

                    pointer-events-none
                "

            />







            <div

                className="
                    relative

                    mx-auto

                    max-w-5xl

                    px-6

                    text-center
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

                    Contact

                </p>








                <h2

                    className="
                        mt-6

                        font-title

                        text-4xl

                        md:text-6xl

                        leading-tight
                    "

                >

                    Construisons quelque chose
                    <br />

                    d'unique.

                </h2>








                <p

                    className="
                        mx-auto

                        mt-8

                        max-w-2xl

                        text-text-soft

                        leading-relaxed
                    "

                >

                    Une idée, un projet digital ou une
                    envie de créer une identité forte ?
                    Échangeons autour de votre vision.

                </p>









                <div

                    className="
                        mt-10

                        flex

                        justify-center

                        gap-5

                        flex-wrap
                    "

                >



                    <Button

                        href="/contact"

                    >

                        Me contacter

                    </Button>







                    <Button

                        href="/projects"

                        variant="secondary"

                    >

                        Voir mes projets

                    </Button>



                </div>







            </div>






            {/* signature bas */}

            <div

                className="
                    absolute

                    bottom-8

                    left-1/2

                    -translate-x-1/2

                    text-[10px]

                    uppercase

                    tracking-[0.5em]

                    text-text-muted

                "

            >

                Andgel Brissaud

            </div>





        </section>

    );

}