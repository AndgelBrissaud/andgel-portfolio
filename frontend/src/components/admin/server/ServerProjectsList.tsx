import type { ServerProject } from "../../../types/server";


import ServerProjectCard from "./ServerProjectCard";



interface Props {

    projects: ServerProject[];

    loading?: boolean;

    onRefresh:()=>void;
    onSelectCompose: (project: ServerProject) => void;
    onSelectLogs: (
        project: ServerProject,
        type: "frontend" | "backend"
    ) => void;

}






export default function ServerProjectsList({

    projects,

    loading = false,

    onRefresh
    , onSelectCompose, onSelectLogs

}:Props){



    if(loading){


        return (

            <div className="admin-projects-loading">

                Chargement des projets...

            </div>

        );


    }







    if(!projects.length){


        return (

            <div className="admin-projects-empty">

                Aucun projet serveur enregistré.

            </div>

        );


    }








    return (

        <section className="admin-projects-list">


            {
                projects.map(

                    project => (

                        <ServerProjectCard

                            key={project.id}

                            project={project}

                            onRefresh={onRefresh}
                            onSelectCompose={onSelectCompose}
                            onSelectLogs={onSelectLogs}

                        />

                    )

                )
            }


        </section>

    );


}