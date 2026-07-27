type ValueCardProps = {

    number:string;

    title:string;

    text:string;

};





export default function ValueCard({

    number,

    title,

    text

}:ValueCardProps){


    return (


        <article

            className="
                group

                relative

                overflow-hidden

                min-h-[220px]

                bg-[#0b0d10]

                border

                border-white/10

                p-5

                transition-all

                duration-700

                hover:-translate-y-3

                hover:border-accent/50

            "

        >





            {/* numéro arrière-plan */}

            <span

                className="
                    absolute

                    right-4

                    top-0

                    font-title

                    text-[120px]

                    leading-none

                    text-white/[0.035]

                    transition-transform

                    duration-700

                    group-hover:scale-110
                "

            >

                {number}

            </span>







            {/* halo profondeur */}

            <div

                className="
                    absolute

                    -right-20

                    -bottom-20

                    h-48

                    w-48

                    rounded-full

                    bg-accent/20

                    blur-[80px]

                    opacity-0

                    transition-opacity

                    duration-700

                    group-hover:opacity-100
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

                "

            >




                <p

                    className="
                        text-[10px]

                        uppercase

                        tracking-[0.45em]

                        text-text-muted

                    "

                >

                    Valeur

                </p>







                <h3

                    className="
                        mt-4

                        font-title

                        text-3xl

                        text-text

                        transition-colors

                        duration-500

                        group-hover:text-accent

                    "

                >

                    {title}

                </h3>







                <div

                    className="
                        mt-4

                        h-px

                        w-10

                        bg-accent

                        transition-all

                        duration-700

                        group-hover:w-20

                    "

                />







                <p

                    className="
                        mt-5

                        text-sm

                        leading-relaxed

                        text-text-soft

                    "

                >

                    {text}

                </p>




            </div>








            {/* reflet */}

            <div

                className="
                    absolute

                    inset-0

                    bg-gradient-to-br

                    from-white/[0.05]

                    via-transparent

                    to-transparent

                    opacity-0

                    transition-opacity

                    duration-700

                    group-hover:opacity-100

                "

            />




        </article>


    );

}