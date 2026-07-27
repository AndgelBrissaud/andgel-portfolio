import { Router } from "express";


import {

    getProjects,

    getProjectBySlug,

    createProject,

    updateProject,

    deleteProject

} from "../controllers/projects.controller.js";


import authMiddleware from "../middleware/auth.middleware.js";


import { upload } from "../config/uploads.js";









const router = Router();









/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/


// Liste des projets

router.get(

    "/",

    getProjects

);









// Projet par slug

router.get(

    "/:slug",

    getProjectBySlug

);









/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
| Création projet
|--------------------------------------------------------------------------
*/


router.post(

    "/",

    authMiddleware,


    upload.fields([

        {

            name:"cover",

            maxCount:1

        },


        {

            name:"gallery",

            maxCount:50

        }

    ]),


    createProject

);









/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
| Modification projet
|--------------------------------------------------------------------------
*/


router.put(

    "/:id",

    authMiddleware,


    upload.fields([

        {

            name:"cover",

            maxCount:1

        },


        {

            name:"gallery",

            maxCount:50

        }

    ]),


    updateProject

);









/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
| Suppression projet
|--------------------------------------------------------------------------
*/


router.delete(

    "/:id",

    authMiddleware,

    deleteProject

);









export default router;