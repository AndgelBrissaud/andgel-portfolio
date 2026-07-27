import {
    useEffect,
    useState
} from "react";


import {

    getAdminStats,

    type AdminStats as AdminStatsType

} from "../../services/api";









interface StatCardProps {

    label:string;

    value:string | number;

    accent?:boolean;

}









function StatCard({

    label,

    value,

    accent=false

}:StatCardProps){



    return (

        <article

            className="
                group
                relative
                overflow-hidden
                rounded-xl
                border
                border-white/10
                bg-white/[0.025]
                px-4
                py-5
                backdrop-blur-xl
                transition-all
                duration-500
                hover:border-accent/30
            "

        >



            <div

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





            <div

                className="
                    relative
                    flex
                    items-center
                    justify-between
                    gap-4
                "

            >



                <p

                    className="
                        text-[10px]
                        uppercase
                        tracking-[0.3em]
                        text-text-muted
                    "

                >

                    {label}

                </p>









                {
                    accent

                    ?

                    (

                        <span

                            className="
                                rounded-full
                                border
                                border-accent/30
                                bg-accent/10
                                px-3
                                py-1
                                text-[10px]
                                uppercase
                                tracking-[0.2em]
                                text-accent
                            "

                        >

                            {value}

                        </span>

                    )

                    :

                    (

                        <strong

                            className="
                                font-title
                                text-4xl
                                leading-none
                                text-text
                            "

                        >

                            {value}

                        </strong>

                    )

                }



            </div>



        </article>

    );

}









export default function AdminStats(){



    const [

        stats,

        setStats

    ] = useState<AdminStatsType | null>(null);





    const [

        loading,

        setLoading

    ] = useState(true);





    const [

        error,

        setError

    ] = useState("");









    useEffect(()=>{


        const controller = new AbortController();





        async function loadStats(){



            try{


                const data = await getAdminStats();



                if(!controller.signal.aborted){

                    setStats(data);

                }


            }

            catch(error){



                if(

                    !controller.signal.aborted

                ){

                    console.error(error);


                    setError(

                        "Impossible de charger les statistiques"

                    );

                }


            }

            finally{


                if(

                    !controller.signal.aborted

                ){

                    setLoading(false);

                }


            }


        }





        loadStats();





        return ()=>{

            controller.abort();

        };


    },[]);









    if(loading){


        return (

            <div

                className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    px-4
                    py-5
                    text-center
                    text-xs
                    text-text-muted
                "

            >

                Chargement des statistiques...

            </div>

        );

    }









    if(error){


        return (

            <div

                className="
                    rounded-xl
                    border
                    border-red-500/20
                    bg-red-500/10
                    px-4
                    py-5
                    text-center
                    text-xs
                    text-red-400
                "

            >

                {error}

            </div>

        );

    }









    return (

        <section

            className="
                grid
                gap-3
                sm:grid-cols-3
            "

        >



            <StatCard

                label="Projets"

                value={stats?.projects ?? 0}

            />





            <StatCard

                label="Photos"

                value={stats?.photos ?? 0}

            />





            <StatCard

                label="API"

                value={stats?.status ?? "OFFLINE"}

                accent

            />



        </section>

    );

}