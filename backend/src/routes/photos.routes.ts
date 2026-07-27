import { Router } from "express";


import {

    getPhotos,

    getPhotoById,

    createPhoto,

    deletePhoto

} from "../controllers/photos.controller.js";


import authMiddleware from "../middleware/auth.middleware.js";


import { upload } from "../config/uploads.js";





const router = Router();









/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/


router.get(

    "/",

    getPhotos

);







router.get(

    "/:id",

    getPhotoById

);









/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
| Ajout photo
|--------------------------------------------------------------------------
*/


router.post(

    "/",

    authMiddleware,


    upload.single(

        "image"

    ),


    createPhoto

);









/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
| Suppression photo
|--------------------------------------------------------------------------
*/


router.delete(

    "/:id",

    authMiddleware,


    deletePhoto

);







export default router;