import AdminStats from "../../components/admin/AdminStats";



export default function AdminDashboard(){


    return (

        <section

            className="
                space-y-10
            "

        >



            <header>


                <p

                    className="
                        text-xs
                        uppercase
                        tracking-[0.3em]
                        text-accent
                    "

                >

                    Administration

                </p>





                <h1

                    className="
                        mt-3
                        font-title
                        text-4xl
                    "

                >

                    Dashboard

                </h1>





                <p

                    className="
                        mt-3
                        text-text-muted
                    "

                >

                    Vue générale du portfolio.

                </p>


            </header>







            <AdminStats />







            <section

                className="
                    grid
                    gap-6
                    md:grid-cols-3
                "

            >


                <article

                    className="
                        rounded-3xl
                        border
                        border-white/10
                        bg-surface
                        p-6
                    "

                >

                    <h2

                        className="
                            font-title
                            text-xl
                        "

                    >

                        Dernières actions

                    </h2>


                    <p

                        className="
                            mt-3
                            text-sm
                            text-text-muted
                        "

                    >

                        Historique des modifications à venir.

                    </p>


                </article>





                <article

                    className="
                        rounded-3xl
                        border
                        border-white/10
                        bg-surface
                        p-6
                    "

                >

                    <h2

                        className="
                            font-title
                            text-xl
                        "

                    >

                        Portfolio

                    </h2>


                    <p

                        className="
                            mt-3
                            text-sm
                            text-text-muted
                        "

                    >

                        Nombre de projets et photographies.

                    </p>


                </article>





                <article

                    className="
                        rounded-3xl
                        border
                        border-white/10
                        bg-surface
                        p-6
                    "

                >

                    <h2

                        className="
                            font-title
                            text-xl
                        "

                    >

                        Serveur

                    </h2>


                    <p

                        className="
                            mt-3
                            text-sm
                            text-text-muted
                        "

                    >

                        Etat VPS et Docker prochainement.

                    </p>


                </article>



            </section>





        </section>

    );

}