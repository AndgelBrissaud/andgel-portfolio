import {
    Request,
    Response
} from "express";


import {

    createProject as createProjectService,

    getProjects as getProjectsService,

    getProjectBySlug as getProjectBySlugService,

    updateProject as updateProjectService,

    deleteProject as deleteProjectService

} from "../services/project.service.js";









interface UploadedFiles {


    cover?: Express.Multer.File[];


    gallery?: Express.Multer.File[];


}









/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
| Liste des projets
|--------------------------------------------------------------------------
*/


export function getProjects(

    _req:Request,

    res:Response

){


    try {


        const projects = getProjectsService();



        return res.json(

            projects

        );


    }

    catch(error){


        console.error(error);



        return res.status(500).json({

            message:"Erreur récupération projets"

        });


    }

}









/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
| Projet par slug
|--------------------------------------------------------------------------
*/


export function getProjectBySlug(

    req:Request,

    res:Response

){


    try {


        const slug = Array.isArray(

            req.params.slug

        )

            ? req.params.slug[0]

            : req.params.slug;









        const project = getProjectBySlugService(

            slug

        );









        if(!project){


            return res.status(404).json({

                message:"Projet introuvable"

            });


        }









        return res.json(

            project

        );


    }

    catch(error){


        console.error(error);



        return res.status(500).json({

            message:"Erreur récupération projet"

        });


    }

}









/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
| Création projet
|--------------------------------------------------------------------------
*/


export function createProject(

    req:Request,

    res:Response

){


    try {



        const files = req.files as UploadedFiles;









        const project = createProjectService(



            {


                title:req.body.title,


                description:req.body.description,


                category:req.body.category,



                technical:

                    JSON.parse(

                        req.body.technical || "[]"

                    ),



                design:

                    JSON.parse(

                        req.body.design || "{}"

                    )



            },



            files



        );









        return res.status(201).json({


            message:"Projet créé",


            project



        });



    }

    catch(error){


        console.error(error);



        return res.status(500).json({

            message:"Erreur création projet"

        });


    }

}









/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
| Modification projet
|--------------------------------------------------------------------------
*/


export function updateProject(

    req:Request,

    res:Response

){


    try {



        const id = Number(

            req.params.id

        );









        if(Number.isNaN(id)){


            return res.status(400).json({

                message:"Identifiant invalide"

            });


        }









        const files = req.files as UploadedFiles;









        const project = updateProjectService(



            id,



            {


                title:req.body.title,


                description:req.body.description,


                category:req.body.category,



                technical:

                    JSON.parse(

                        req.body.technical || "[]"

                    ),



                design:

                    JSON.parse(

                        req.body.design || "{}"

                    ),



                existingImages:

                    JSON.parse(

                        req.body.existingImages || "[]"

                    )



            },



            files



        );









        return res.json({


            message:"Projet modifié",


            project



        });



    }

    catch(error){


        console.error(error);



        return res.status(500).json({

            message:"Erreur modification projet"

        });


    }

}









/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
| Suppression projet
|--------------------------------------------------------------------------
*/


export function deleteProject(

    req:Request,

    res:Response

){


    try {



        const id = Number(

            req.params.id

        );









        if(Number.isNaN(id)){


            return res.status(400).json({

                message:"Identifiant invalide"

            });


        }









        const deleted = deleteProjectService(

            id

        );









        if(!deleted){


            return res.status(404).json({

                message:"Projet introuvable"

            });


        }









        return res.json({

            message:"Projet supprimé"

        });



    }

    catch(error){


        console.error(error);



        return res.status(500).json({

            message:"Erreur suppression projet"

        });


    }

}