import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";





export default function PortfolioSection() {


    return (

        <section

            className="
                relative

                overflow-hidden

                border-t

                border-white/10

                py-24
            "

        >




            {/* lumière arrière */}

            <div

                className="
                    absolute

                    left-1/2

                    top-0

                    -translate-x-1/2

                    h-[500px]

                    w-[500px]

                    rounded-full

                    bg-accent/10

                    blur-[160px]

                    pointer-events-none
                "

            />







            <div

                className="
                    relative

                    mx-auto

                    max-w-7xl

                    px-6
                "

            >





                <SectionTitle

                    eyebrow="Portfolio"

                    title="Des créations entre code et émotion."

                    description="
                        Des expériences digitales où technologie,
                        design et photographie construisent
                        un univers unique.
                    "

                />








                <div

                    className="
                        mt-14

                        grid

                        grid-cols-1

                        lg:grid-cols-12

                        gap-6
                    "

                >





                    <PortfolioFeature

                        className="
                            lg:col-span-7
                        "

                        title="Développement Web"

                        category="Applications · Interfaces"

                        number="01"

                    />







                    <PortfolioFeature

                        className="
                            lg:col-span-5
                        "

                        title="Photographie"

                        category="Image · Histoire"

                        number="02"

                    />







                    <PortfolioFeature

                        className="
                            lg:col-span-5
                        "

                        title="Direction artistique"

                        category="Identité · Design"

                        number="03"

                    />







                    <PortfolioFeature

                        className="
                            lg:col-span-7
                        "

                        title="Expériences digitales"

                        category="Innovation · Création"

                        number="04"

                    />





                </div>









                <div

                    className="
                        mt-14

                        flex

                        justify-center
                    "

                >

                    <Button

                        href="/projects"

                    >

                        Explorer mes projets

                    </Button>


                </div>





            </div>


        </section>

    );

}









function PortfolioFeature({

    number,

    title,

    category,

    className

}:{

    number:string;

    title:string;

    category:string;

    className?:string;

}) {


    return (


        <article

            className={`
                
                group

                relative

                overflow-hidden

                min-h-[240px]

                border

                border-white/10

                bg-[#0b0d10]

                p-5

                transition-all

                duration-700

                hover:-translate-y-2

                hover:border-accent/50

                ${className ?? ""}

            `}

        >






            {/* numéro géant */}

            <span

                className="
                    absolute

                    right-4

                    top-0

                    font-title

                    text-[150px]

                    leading-none

                    text-white/[0.025]

                    transition-transform

                    duration-700

                    group-hover:scale-110
                "

            >

                {number}

            </span>








            {/* lumière */}

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

                        text-accent
                    "

                >

                    {category}

                </p>







                <h3

                    className="
                        mt-4

                        font-title

                        text-3xl

                        md:text-4xl

                        leading-tight

                        text-text

                        transition-colors

                        duration-500

                        group-hover:text-accent
                    "

                >

                    {title}

                </h3>





            </div>








            {/* reflet */}

            <div

                className="
                    absolute

                    inset-0

                    bg-gradient-to-br

                    from-white/[0.06]

                    via-transparent

                    to-transparent

                    opacity-0

                    transition-opacity

                    duration-700

                    group-hover:opacity-100
                "

            />








            {/* ligne laser */}

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