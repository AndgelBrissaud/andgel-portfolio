import { Router } from "express";


import {

    getStats

} from "../controllers/admin.controller.js";





const router = Router();





/*
|--------------------------------------------------------------------------
| ADMIN STATS
|--------------------------------------------------------------------------
*/


router.get(

    "/stats",

    getStats

);





export default router;