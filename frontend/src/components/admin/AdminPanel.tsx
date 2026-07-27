import AdminAction from "./AdminAction";





const panels = [

    {
        title:"Projets",

        description:
            "Gérez vos réalisations web et vos créations.",

        actions:[

            "Ajouter un projet",

            "Modifier les réalisations",

            "Organiser les contenus"

        ]

    },


    {
        title:"Photographie",

        description:
            "Organisez vos galeries et votre univers visuel.",

        actions:[

            "Ajouter une galerie",

            "Classer les images",

            "Modifier les collections"

        ]

    }

];









export default function AdminPanel(){



    return (

        <section

            className="
                grid
                gap-5
                lg:grid-cols-2
            "

        >



            {
                panels.map(

                    panel=>(


                        <article

                            key={panel.title}

                            className="
                                group
                                relative
                                overflow-hidden
                                border
                                border-white/10
                                bg-white/[0.02]
                                p-5
                                transition-all
                                duration-500
                                hover:border-accent/40
                            "

                        >





                            <div

                                className="
                                    pointer-events-none
                                    absolute
                                    -right-24
                                    -bottom-24
                                    h-48
                                    w-48
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





                                <p

                                    className="
                                        text-[10px]
                                        uppercase
                                        tracking-[0.35em]
                                        text-text-muted
                                    "

                                >

                                    Gestion

                                </p>









                                <h2

                                    className="
                                        mt-2
                                        font-title
                                        text-2xl
                                        text-text
                                    "

                                >

                                    {panel.title}

                                </h2>









                                <p

                                    className="
                                        mt-2
                                        max-w-md
                                        text-sm
                                        text-text-soft
                                    "

                                >

                                    {panel.description}

                                </p>









                                <div

                                    className="
                                        mt-5
                                        space-y-2
                                    "

                                >



                                    {
                                        panel.actions.map(

                                            action=>(


                                                <AdminAction

                                                    key={action}

                                                    text={action}

                                                />


                                            )

                                        )
                                    }



                                </div>







                            </div>





                        </article>


                    )

                )
            }



        </section>

    );

}