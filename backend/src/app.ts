import express from "express";
import cors from "cors";
import path from "path";


import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import photosRoutes from "./routes/photos.routes.js";
import photoCategoriesRoutes from "./routes/photoCategories.routes.js";
import serverManagementRoutes from "./routes/serverManagement.routes.js";









const app = express();









/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/


const allowedOrigins = [

    "http://localhost:5173",

    "http://127.0.0.1:5173",

    process.env.CORS_ORIGIN

].filter(Boolean) as string[];









app.use(

    cors({

        origin: allowedOrigins,

        credentials:true

    })

);









/*
|--------------------------------------------------------------------------
| BODY PARSER
|--------------------------------------------------------------------------
*/


app.use(

    express.json()

);









app.use(

    express.urlencoded({

        extended:true

    })

);









/*
|--------------------------------------------------------------------------
| STATIC FILES
|--------------------------------------------------------------------------
|
| Accès images :
|
| http://localhost:4000/uploads/...
|
|--------------------------------------------------------------------------
*/


app.use(

    "/uploads",

    express.static(

        path.join(

            process.cwd(),

            "uploads"

        )

    )

);









/*
|--------------------------------------------------------------------------
| HEALTH CHECK
|--------------------------------------------------------------------------
*/


app.get(

    "/",

    (_req,res)=>{


        res.json({

            message:
            "Andgel Portfolio API active"

        });


    }

);









/*
|--------------------------------------------------------------------------
| API ROUTES
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/


app.use(

    "/auth",

    authRoutes

);









/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/


app.use(

    "/admin",

    adminRoutes

);









/*
|--------------------------------------------------------------------------
| PROJECTS
|--------------------------------------------------------------------------
*/


app.use(

    "/projects",

    projectsRoutes

);









/*
|--------------------------------------------------------------------------
| PHOTOS
|--------------------------------------------------------------------------
*/


app.use(

    "/photos",

    photosRoutes

);









/*
|--------------------------------------------------------------------------
| PHOTO CATEGORIES
|--------------------------------------------------------------------------
*/


app.use(

    "/photo-categories",

    photoCategoriesRoutes

);


/*
|--------------------------------------------------------------------------
| SERVER MANAGEMENT
|--------------------------------------------------------------------------
*/

app.use(

    "/server",

    serverManagementRoutes

);









export default app;