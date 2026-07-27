const activities = [

    {
        title:"Nouveau projet ajouté",
        detail:"Création d'une interface React",
        time:"Il y a 2 heures"
    },

    {
        title:"Galerie mise à jour",
        detail:"Ajout de nouvelles photographies",
        time:"Hier"
    },

    {
        title:"Message reçu",
        detail:"Nouvelle demande de collaboration",
        time:"Il y a 3 jours"
    }

];









export default function AdminActivity(){


    return (

        <section

            className="
                border-t
                border-white/10
                pt-6
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

                    Historique

                </p>





                <h2

                    className="
                        mt-2
                        font-title
                        text-2xl
                    "

                >

                    Activité récente

                </h2>


            </header>









            <div

                className="
                    divide-y
                    divide-white/10
                    border
                    border-white/10
                    bg-white/[0.02]
                "

            >



                {
                    activities.map(

                        (activity,index)=>(


                            <article

                                key={activity.title}

                                className="
                                    group
                                    relative
                                    flex
                                    items-center
                                    justify-between
                                    gap-4
                                    px-4
                                    py-3
                                    transition
                                    hover:bg-white/[0.03]
                                "

                            >





                                <div

                                    className="
                                        absolute
                                        left-0
                                        top-0
                                        h-full
                                        w-px
                                        bg-transparent
                                        transition
                                        group-hover:bg-accent
                                    "

                                />









                                <div

                                    className="
                                        flex
                                        min-w-0
                                        items-center
                                        gap-3
                                    "

                                >



                                    <span

                                        className="
                                            shrink-0
                                            text-[11px]
                                            text-text-muted
                                        "

                                    >

                                        0{index+1}

                                    </span>









                                    <div

                                        className="
                                            min-w-0
                                        "

                                    >



                                        <h3

                                            className="
                                                truncate
                                                text-sm
                                                text-text
                                                transition
                                                group-hover:text-accent
                                            "

                                        >

                                            {activity.title}

                                        </h3>





                                        <p

                                            className="
                                                truncate
                                                text-xs
                                                text-text-soft
                                            "

                                        >

                                            {activity.detail}

                                        </p>



                                    </div>



                                </div>









                                <time

                                    className="
                                        shrink-0
                                        text-[10px]
                                        uppercase
                                        tracking-[0.2em]
                                        text-text-muted
                                    "

                                >

                                    {activity.time}

                                </time>





                            </article>


                        )

                    )
                }



            </div>


        </section>

    );

}