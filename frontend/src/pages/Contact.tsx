import SectionTitle from "../components/ui/SectionTitle";
import ContactForm from "../components/contact/ContactForm";





export default function Contact() {


    return (


        <main

            className="
                relative

                overflow-hidden

                min-h-screen

                bg-background

                text-text
            "

        >





            {/* halo de profondeur */}

            <div

                className="
                    absolute

                    left-1/2

                    top-0

                    -translate-x-1/2

                    h-[450px]

                    w-[450px]

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

                    pt-32

                    pb-14
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

                        eyebrow="Contact"

                        title="Construisons quelque chose d'unique."

                        description="
                            Une idée, un projet web ou une collaboration
                            photographique ? Parlons-en.
                        "

                    />



                </div>



            </section>









            {/* FORMULAIRE */}

            <ContactForm />






        </main>


    );


}