type ExpertiseCardProps = {

    index: string;

    title: string;

    text: string;

};





export default function ExpertiseCard({

    index,

    title,

    text

}: ExpertiseCardProps) {


    return (

        <article

            className="
                group

                relative

                overflow-hidden

                bg-surface

                border

                border-white/10

                p-2

                transition-all

                duration-700

                hover:-translate-y-2

                hover:border-accent/50

                shadow-shadow-soft

            "

        >





            {/* profondeur */}

            <div

                className="
                    absolute

                    -right-20

                    -top-20

                    h-56

                    w-56

                    rounded-full

                    bg-accent/10

                    blur-3xl

                    opacity-0

                    transition-opacity

                    duration-700

                    group-hover:opacity-100

                "

            />







            {/* numéro décoratif */}

            <span

                className="
                    absolute

                    right-6

                    top-2

                    font-title

                    text-[100px]

                    leading-none

                    text-white/[0.035]

                    pointer-events-none

                    select-none

                "

            >

                {index}

            </span>








            <div

                className="
                    relative

                    z-10

                "

            >






                <p

                    className="
                        text-[11px]

                        uppercase

                        tracking-[0.35em]

                        text-text-muted

                    "

                >

                    Expertise

                </p>








                <h3

                    className="
                        mt-6

                        font-title

                        text-2xl

                        md:text-3xl

                        leading-tight

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
                        mt-5

                        h-px

                        w-12

                        bg-accent

                        transition-all

                        duration-700

                        group-hover:w-20

                    "

                />








                <p

                    className="
                        mt-6

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

                    from-white/[0.04]

                    via-transparent

                    to-transparent

                    opacity-0

                    transition-opacity

                    duration-700

                    group-hover:opacity-100

                    pointer-events-none

                "

            />







            {/* ligne lumineuse */}

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



        </article>

    );

}