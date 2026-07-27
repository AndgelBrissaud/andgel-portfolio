import AdminSection from "../../components/admin/layout/AdminSection";







export default function AdminServer(){



    return (


        <>



            <AdminSection

                title="Gestion du serveur"

                subtitle="
                    Surveillance et administration
                    des services du portfolio.
                "

            >



                <div

                    className="
                        grid
                        gap-6
                        md:grid-cols-2
                        xl:grid-cols-4
                    "

                >



                    <ServerCard

                        title="Docker"

                        value="Non connecté"

                        description="
                            Etat des conteneurs Docker.
                        "

                    />





                    <ServerCard

                        title="API"

                        value="En attente"

                        description="
                            Disponibilité du backend.
                        "

                    />





                    <ServerCard

                        title="Frontend"

                        value="En ligne"

                        description="
                            Application React.
                        "

                    />





                    <ServerCard

                        title="VPS"

                        value="En attente"

                        description="
                            Ressources système.
                        "

                    />



                </div>



            </AdminSection>









            <AdminSection

                title="Conteneurs"

                subtitle="
                    Gestion des services Docker.
                "

            >



                <div

                    className="
                        rounded-2xl
                        border
                        border-white/10
                        bg-surface
                        p-8
                        text-center
                        text-text-muted
                    "

                >


                    Aucun service chargé.



                </div>



            </AdminSection>









            <AdminSection

                title="Actions serveur"

                subtitle="
                    Commandes administrateur.
                "

            >



                <div

                    className="
                        flex
                        flex-wrap
                        gap-4
                    "

                >



                    <button

                        className="
                            rounded-xl
                            border
                            border-white/10
                            bg-white/5
                            px-6
                            py-3
                            text-sm
                            text-white
                            transition
                            hover:bg-white/10
                        "

                    >

                        Actualiser


                    </button>







                    <button

                        className="
                            rounded-xl
                            border
                            border-white/10
                            bg-white/5
                            px-6
                            py-3
                            text-sm
                            text-white
                            transition
                            hover:bg-white/10
                        "

                    >

                        Pull Docker


                    </button>







                    <button

                        className="
                            rounded-xl
                            border
                            border-red-400/20
                            bg-red-500/10
                            px-6
                            py-3
                            text-sm
                            text-red-300
                            transition
                            hover:bg-red-500/20
                        "

                    >

                        Redémarrer services


                    </button>



                </div>



            </AdminSection>



        </>


    );

}









interface ServerCardProps {


    title:string;


    value:string;


    description:string;


}









function ServerCard({

    title,

    value,

    description

}:ServerCardProps){


    return (

        <article

            className="
                rounded-2xl
                border
                border-white/10
                bg-surface
                p-6
            "

        >



            <p

                className="
                    text-xs
                    uppercase
                    tracking-[0.25em]
                    text-accent
                "

            >

                {title}

            </p>





            <h3

                className="
                    mt-4
                    font-title
                    text-3xl
                "

            >

                {value}

            </h3>





            <p

                className="
                    mt-3
                    text-sm
                    text-text-muted
                "

            >

                {description}

            </p>



        </article>

    );

}