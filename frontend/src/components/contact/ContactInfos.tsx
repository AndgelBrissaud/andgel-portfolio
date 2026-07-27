const infos = [

    {
        title: "Email",
        value: "contact@andgelbrissaud.fr"
    },

    {
        title: "Localisation",
        value: "France"
    },

    {
        title: "Disponibilité",
        value: "Freelance & collaborations"
    }

];





export default function ContactInfos() {


    return (


        <div

            className="
                flex

                flex-wrap

                gap-x-12

                gap-y-6
            "

        >



            {infos.map((item) => (


                <div

                    key={item.title}

                    className="
                        relative

                        group

                        min-w-[150px]
                    "

                >





                    <p

                        className="
                            text-[10px]

                            uppercase

                            tracking-[0.4em]

                            text-accent
                        "

                    >

                        {item.title}

                    </p>







                    <p

                        className="
                            mt-2

                            text-sm

                            text-text-soft

                            transition-colors

                            duration-500

                            group-hover:text-text
                        "

                    >

                        {item.value}

                    </p>








                    {/* petite ligne décorative */}

                    <span

                        className="
                            absolute

                            -bottom-3

                            left-0

                            h-px

                            w-0

                            bg-accent

                            transition-all

                            duration-700

                            group-hover:w-10
                        "

                    />





                </div>


            ))}



        </div>


    );


}