export default function ContactButton() {


    return (


        <button


            type="submit"


            className="
                group

                relative

                overflow-hidden

                px-10

                py-4

                min-w-[220px]

                border

                border-accent/50

                bg-transparent

                text-sm

                uppercase

                tracking-[0.25em]

                text-accent

                transition-all

                duration-700

                hover:text-background

            "

        >







            {/* fond animé */}

            <span

                className="
                    absolute

                    inset-0

                    -translate-x-full

                    bg-accent

                    transition-transform

                    duration-700

                    ease-out

                    group-hover:translate-x-0
                "

            />










            {/* contour lumineux */}

            <span

                className="
                    absolute

                    inset-0

                    border

                    border-accent

                    opacity-0

                    scale-110

                    transition-all

                    duration-700

                    group-hover:opacity-100

                    group-hover:scale-100
                "

            />









            {/* texte */}

            <span

                className="
                    relative

                    z-10
                "

            >

                Envoyer le message

            </span>






        </button>


    );


}