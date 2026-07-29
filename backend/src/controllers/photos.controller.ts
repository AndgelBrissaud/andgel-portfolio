import {
    Request,
    Response
} from "express";


import {

    createPhoto as createPhotoService,

    getPhotos as getPhotosService,

    getPhotoById as getPhotoByIdService,

    deletePhoto as deletePhotoService

} from "../services/photo.service.js";
import { fixPhotoCategories as fixPhotoCategoriesService } from "../services/photo.service.js";


import {

    getPhotoCategories as getPhotoCategoriesService,

    createPhotoCategory as createPhotoCategoryService,

    deletePhotoCategory as deletePhotoCategoryService

} from "../services/photoCategory.service.js";









/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
| Liste des photos
|--------------------------------------------------------------------------
*/


export function getPhotos(

    _req:Request,

    res:Response

){


    try {


        const photos = getPhotosService();


        return res.json(

            photos

        );


    }

    catch(error){


        console.error(error);


        return res.status(500).json({

            message:"Erreur récupération photos"

        });


    }


}









/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
| Photo par ID
|--------------------------------------------------------------------------
*/


export function getPhotoById(

    req:Request,

    res:Response

){


    try {


        const photo = getPhotoByIdService(

            Number(req.params.id)

        );





        if(!photo){


            return res.status(404).json({

                message:"Photo introuvable"

            });


        }





        return res.json(

            photo

        );


    }

    catch(error){


        console.error(error);


        return res.status(500).json({

            message:"Erreur récupération photo"

        });


    }


}









/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
| Création photo
|--------------------------------------------------------------------------
*/


export function createPhoto(

    req:Request,

    res:Response

){


    try {


        const file = req.file;





        if(!file){


            return res.status(400).json({

                message:"Image obligatoire"

            });


        }





        // prefer explicit category value or fallback to category_id from the form
        const categoryValue = req.body.category ?? req.body.category_id;

        const photo = createPhotoService(
            {
                title: req.body.title,
                category: categoryValue,
                description: req.body.description,
            },
            file,
        );





        return res.status(201).json({

            message:"Photo créée",

            photo

        });



    }

    catch(error){


        console.error(error);


        return res.status(500).json({

            message:"Erreur création photo"

        });


    }


}









/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
| Suppression photo
|--------------------------------------------------------------------------
*/


export function deletePhoto(

    req:Request,

    res:Response

){


    try {


        const deleted = deletePhotoService(

            Number(req.params.id)

        );





        if(!deleted){


            return res.status(404).json({

                message:"Photo introuvable"

            });


        }





        return res.json({

            message:"Photo supprimée"

        });



    }

    catch(error){


        console.error(error);


        return res.status(500).json({

            message:"Erreur suppression photo"

        });


    }


}









/*
|--------------------------------------------------------------------------
| CATEGORIES PHOTOS
|--------------------------------------------------------------------------
| Liste catégories
|--------------------------------------------------------------------------
*/


export function getPhotoCategories(

    _req:Request,

    res:Response

){


    try {


        const categories = getPhotoCategoriesService();


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
| CATEGORIES PHOTOS
|--------------------------------------------------------------------------
| Création catégorie
|--------------------------------------------------------------------------
*/


export function createPhotoCategory(

    req:Request,

    res:Response

){


    try {


        const name = req.body.name;





        if(

            !name ||

            !name.trim()

        ){


            return res.status(400).json({

                message:"Nom catégorie obligatoire"

            });


        }





        const category = createPhotoCategoryService(

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
| CATEGORIES PHOTOS
|--------------------------------------------------------------------------
| Suppression catégorie
|--------------------------------------------------------------------------
*/


export function deletePhotoCategory(

    req:Request,

    res:Response

){


    try {


        const deleted = deletePhotoCategoryService(

            Number(req.params.id)

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


/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
| Fix photo categories migration
|--------------------------------------------------------------------------
*/

export function fixPhotoCategories(
    _req:Request,
    res:Response
){
    try{
        const result = fixPhotoCategoriesService();
        return res.json({ message: 'Migration complete', result });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la migration des catégories' });
    }

}