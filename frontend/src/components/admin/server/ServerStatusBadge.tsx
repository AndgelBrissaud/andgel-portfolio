interface Props {

    status:string;

}



export default function ServerStatusBadge({

    status

}:Props){



    const isRunning = status === "running";







    return (

        <span

            className={

                isRunning

                ?

                "server-status-badge server-status-running"

                :

                "server-status-badge server-status-stopped"

            }

        >

            {

                isRunning

                ?

                "En ligne"

                :

                "Arrêté"

            }

        </span>

    );

}