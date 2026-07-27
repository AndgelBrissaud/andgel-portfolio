import {
    Request,
    Response
} from "express";


import {

    getPhotoCategories as getService,

    createPhotoCategory as createService,

    deletePhotoCategory as deleteService

} from "../services/photoCategory.service.js";









/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
| GET /photo-categories
|--------------------------------------------------------------------------
*/


export function getPhotoCategories(

    _req:Request,

    res:Response

){

    try{


        const categories = getService();


        return res.json(

            categories

        );


    }

    catch(error){


        console.error(error);


        return res.status(500).json({

            message:"Erreur récupération catégories"

        });


    }

}









/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
| POST /photo-categories
|--------------------------------------------------------------------------
*/


export function createPhotoCategory(

    req:Request,

    res:Response

){

    try{


        const name = req.body.name;



        if(

            typeof name !== "string" ||

            !name.trim()

        ){

            return res.status(400).json({

                message:"Nom catégorie obligatoire"

            });

        }






        const category = createService(

            name.trim()

        );





        return res.status(201).json(

            category

        );


    }

    catch(error){


        console.error(error);


        return res.status(500).json({

            message:"Erreur création catégorie"

        });


    }

}









/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
| DELETE /photo-categories/:id
|--------------------------------------------------------------------------
*/


export function deletePhotoCategory(

    req:Request,

    res:Response

){

    try{


        const id = Number(

            req.params.id

        );





        if(

            Number.isNaN(id)

        ){

            return res.status(400).json({

                message:"ID invalide"

            });

        }





        const deleted = deleteService(

            id

        );





        if(!deleted){


            return res.status(404).json({

                message:"Catégorie introuvable"

            });

        }





        return res.status(204).send();



    }

    catch(error){


        console.error(error);


        return res.status(500).json({

            message:"Erreur suppression catégorie"

        });


    }

}