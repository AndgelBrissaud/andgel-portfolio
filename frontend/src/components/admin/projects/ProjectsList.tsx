import { useEffect, useState } from "react";

import {

    deleteProject,
    refreshProjects,
    type Project

} from "../../../services/api";

import AdminEmptyState from "../ui/AdminEmptyState";

import ProjectCard from "./ProjectCard";

import EditProject from "./EditProject";

export default function ProjectsList(){

    const [

        projects,

        setProjects

    ] = useState<Project[]>([]);

    const [

        loading,

        setLoading

    ] = useState(true);

    const [

        editing,

        setEditing

    ] = useState<Project | null>(null);

    async function loadProjects(){

        try{

            setLoading(true);

            const data = await refreshProjects();

            setProjects(data);

        }

        finally{

            setLoading(false);

        }

    }

    useEffect(()=>{

        loadProjects();

    },[]);

    async function handleDelete(

        project:Project

    ){

        const confirmDelete = window.confirm(

            `Supprimer "${project.title}" ?`

        );

        if(!confirmDelete){

            return;

        }

        await deleteProject(project.id);

        await loadProjects();

    }

    return(

        <>

            {

                editing && (

                    <EditProject

                        project={editing}

                        onClose={()=>{

                            setEditing(null);

                            loadProjects();

                        }}

                    />

                )

            }

            {

                loading && (

                    <div

                        className="
                            flex
                            items-center
                            justify-center
                            py-20
                            text-text-muted
                        "

                    >

                        Chargement...

                    </div>

                )

            }

            {

                !loading &&

                projects.length===0 && (

                    <AdminEmptyState

                        message="Aucun projet."

                    />

                )

            }

            {

                !loading &&

                projects.length>0 && (

                    <div

                        className="
                            space-y-8
                        "

                    >

                        {

                            projects.map(

                                project=>(

                                    <ProjectCard

                                        key={project.id}

                                        project={project}

                                        onEdit={setEditing}

                                        onDelete={handleDelete}

                                    />

                                )

                            )

                        }

                    </div>

                )

            }

        </>

    );

}