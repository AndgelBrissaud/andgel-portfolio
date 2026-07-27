import fs from "fs";
import path from "path";
import multer from "multer";





/*
|--------------------------------------------------------------------------
| DOSSIER UPLOADS
|--------------------------------------------------------------------------
*/


const uploadsDir = path.join(

    process.cwd(),

    "uploads"

);





const projectsDir = path.join(

    uploadsDir,

    "projects"

);





if (!fs.existsSync(projectsDir)) {

    fs.mkdirSync(

        projectsDir,

        {

            recursive: true

        }

    );

}





/*
|--------------------------------------------------------------------------
| NOM DE FICHIER
|--------------------------------------------------------------------------
*/


const storage = multer.diskStorage({


    destination(

        _req,

        _file,

        callback

    ) {


        callback(

            null,

            projectsDir

        );

    },





    filename(

        _req,

        file,

        callback

    ) {


        const extension = path.extname(

            file.originalname

        );



        const uniqueName =

            `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;



        callback(

            null,

            uniqueName

        );

    }

});





/*
|--------------------------------------------------------------------------
| TYPES AUTORISÉS
|--------------------------------------------------------------------------
*/


const fileFilter: multer.Options["fileFilter"] = (

    _req,

    file,

    callback

) => {


    const allowed = [

        "image/jpeg",

        "image/png",

        "image/webp",

        "image/avif"

    ];





    if (

        allowed.includes(

            file.mimetype

        )

    ) {

        callback(

            null,

            true

        );

    }

    else {

        callback(

            new Error(

                "Format d'image non autorisé."

            )

        );

    }

};





export const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 15 * 1024 * 1024

    }

});