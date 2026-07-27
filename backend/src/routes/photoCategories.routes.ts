import {
    Router
} from "express";


import {

    getPhotoCategories,

    createPhotoCategory,

    deletePhotoCategory

} from "../controllers/photoCategories.controller.js";


import authMiddleware from "../middleware/auth.middleware.js";









const router = Router();









/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
| Liste des catégories photos
|--------------------------------------------------------------------------
*/


router.get(

    "/",

    getPhotoCategories

);









/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
| Création catégorie photo
|--------------------------------------------------------------------------
*/


router.post(

    "/",

    authMiddleware,

    createPhotoCategory

);









/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
| Suppression catégorie photo
|--------------------------------------------------------------------------
*/


router.delete(

    "/:id",

    authMiddleware,

    deletePhotoCategory

);









export default router;