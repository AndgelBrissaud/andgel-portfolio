import ContactInput from "./ContactInput";
import ContactTextarea from "./ContactTextarea";
import ContactButton from "./ContactButton";
import ContactInfos from "./ContactInfos";
import ContactSocials from "./ContactSocials";





export default function ContactForm() {


    return (


        <section

            className="
                relative

                w-full
            "

        >




            {/* lumière profondeur */}

            <div

                className="
                    absolute

                    -top-32

                    right-0

                    h-72

                    w-72

                    rounded-full

                    bg-accent/10

                    blur-[120px]

                    pointer-events-none
                "

            />








            <div

                className="
                    relative

                    mx-auto

                    max-w-5xl

                    px-6
                "

            >








                <form

                    className="
                        grid

                        grid-cols-1

                        md:grid-cols-2

                        gap-x-12

                        gap-y-8
                    "

                >







                    <ContactInput

                        label="Nom"

                        placeholder="Votre nom"

                    />







                    <ContactInput

                        label="Email"

                        placeholder="Votre adresse email"

                        type="email"

                    />








                    <div

                        className="
                            md:col-span-2
                        "

                    >

                        <ContactInput

                            label="Sujet"

                            placeholder="Votre projet"

                        />

                    </div>









                    <div

                        className="
                            md:col-span-2
                        "

                    >

                        <ContactTextarea />

                    </div>









                    <div

                        className="
                            md:col-span-2

                            flex

                            flex-col

                            lg:flex-row

                            lg:items-center

                            lg:justify-between

                            gap-10

                            border-t

                            border-white/10

                            pt-8

                        "

                    >





                        <ContactInfos />





                        <ContactButton />





                    </div>






                </form>









                <ContactSocials />







            </div>






        </section>


    );


}