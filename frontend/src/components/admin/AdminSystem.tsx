const settings = [

    {
        title:"Sécurité",

        description:
            "Gestion des accès et protection du tableau de bord."

    },


    {
        title:"Préférences",

        description:
            "Configuration générale du portfolio."

    },


    {
        title:"Maintenance",

        description:
            "Outils techniques et état du système."

    }

];









export default function AdminSystem(){



    return (

        <section

            className="
                border-t
                border-white/10
                pt-6
                pb-4
            "

        >





            <header

                className="
                    mb-5
                "

            >



                <p

                    className="
                        text-[10px]
                        uppercase
                        tracking-[0.35em]
                        text-text-muted
                    "

                >

                    Système

                </p>





                <h2

                    className="
                        mt-2
                        font-title
                        text-2xl
                    "

                >

                    Configuration

                </h2>



            </header>









            <div

                className="
                    grid
                    gap-3
                    md:grid-cols-3
                "

            >





                {
                    settings.map(

                        item=>(


                            <article

                                key={item.title}

                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/[0.025]
                                    p-4
                                    transition-all
                                    duration-500
                                    hover:border-accent/40
                                    hover:bg-white/[0.04]
                                "

                            >





                                <div

                                    className="
                                        pointer-events-none
                                        absolute
                                        -right-8
                                        -top-8
                                        h-20
                                        w-20
                                        rounded-full
                                        bg-accent/10
                                        blur-3xl
                                        opacity-0
                                        transition-opacity
                                        duration-500
                                        group-hover:opacity-100
                                    "

                                />









                                <div

                                    className="
                                        relative
                                    "

                                >



                                    <h3

                                        className="
                                            font-title
                                            text-xl
                                            text-text
                                            transition-colors
                                            duration-300
                                            group-hover:text-accent
                                        "

                                    >

                                        {item.title}

                                    </h3>









                                    <p

                                        className="
                                            mt-2
                                            text-sm
                                            leading-relaxed
                                            text-text-soft
                                        "

                                    >

                                        {item.description}

                                    </p>









                                    <button

                                        type="button"

                                        className="
                                            mt-4
                                            text-[10px]
                                            uppercase
                                            tracking-[0.3em]
                                            text-accent
                                            transition-colors
                                            hover:text-accent-light
                                        "

                                    >

                                        Ouvrir

                                    </button>



                                </div>









                                <span

                                    className="
                                        absolute
                                        bottom-0
                                        left-0
                                        h-px
                                        w-0
                                        bg-accent
                                        transition-all
                                        duration-500
                                        group-hover:w-full
                                    "

                                />



                            </article>


                        )

                    )
                }





            </div>





        </section>

    );

}