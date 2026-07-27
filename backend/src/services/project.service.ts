import fs from "fs";
import path from "path";


import db from "../config/database.js";


import {
    generateSlug
} from "./slug.service.js";









export interface Project {


    id:number;


    slug:string;


    title:string;


    category?:string;


    description:string;


    image:string;


    gallery:string[];


    year:string;


    design:Record<string,unknown>;


    technical:string[];


    createdAt:string;


    updatedAt:string;


}









interface ProjectFiles {


    cover?:Express.Multer.File[];


    gallery?:Express.Multer.File[];


}









interface ProjectUpdateData {


    title:string;


    description:string;


    category?:string;


    technical:string[];


    design:Record<string,unknown>;


    existingImages:string[];


}









function projectFolder(

    slug:string

){


    return path.join(

        process.cwd(),

        "uploads",

        "projects",

        slug

    );

}









function saveFile(

    file:Express.Multer.File,

    folder:string

){


    fs.mkdirSync(

        folder,

        {

            recursive:true

        }

    );









    const extension = path.extname(

        file.originalname

    );









    const filename =

        `${Date.now()}${extension}`;









    const destination = path.join(

        folder,

        filename

    );









    fs.renameSync(

        file.path,

        destination

    );









    return destination

        .replace(

            process.cwd(),

            ""

        )

        .replace(

            /\\/g,

            "/"

        );

}









function deleteFile(

    filePath:string

){


    const absolutePath = path.join(

        process.cwd(),

        filePath

    );









    if(fs.existsSync(absolutePath)){


        fs.rmSync(

            absolutePath,

            {

                force:true

            }

        );


    }

}









function parseProject(

    row:any

):Project {



    return {


        id:row.id,


        slug:row.slug,


        title:row.title,


        category:row.category,


        description:row.description,


        image:row.image,


        gallery:JSON.parse(

            row.gallery ?? "[]"

        ),


        year:row.year,


        design:JSON.parse(

            row.design ?? "{}"

        ),


        technical:JSON.parse(

            row.technical ?? "[]"

        ),


        createdAt:row.created_at,


        updatedAt:row.updated_at


    };


}









/*
|--------------------------------------------------------------------------
| GET ALL PROJECTS
|--------------------------------------------------------------------------
*/


export function getProjects():Project[]{



    const rows = db.prepare(`

        SELECT *

        FROM projects

        ORDER BY created_at DESC

    `)

    .all();









    return rows.map(

        parseProject

    );

}









/*
|--------------------------------------------------------------------------
| GET PROJECT BY SLUG
|--------------------------------------------------------------------------
*/


export function getProjectBySlug(

    slug:string

){


    const row = db.prepare(`

        SELECT *

        FROM projects

        WHERE slug = ?

    `)

    .get(

        slug

    );









    if(!row){


        return null;


    }









    return parseProject(

        row

    );

}









/*
|--------------------------------------------------------------------------
| CREATE PROJECT
|--------------------------------------------------------------------------
*/


export function createProject(

    data:{

        title:string;

        description:string;

        category?:string;

        technical:string[];

        design:Record<string,unknown>;

    },


    files:ProjectFiles

){



    const slug = generateSlug(

        data.title

    );









    const exists = db.prepare(`

        SELECT id

        FROM projects

        WHERE slug = ?

    `)

    .get(

        slug

    );









    if(exists){


        throw new Error(

            "Un projet avec ce titre existe déjà"

        );


    }









    if(

        !files.cover ||

        !files.cover[0]

    ){


        throw new Error(

            "Image couverture obligatoire"

        );


    }









    const folder = projectFolder(

        slug

    );









    const image = saveFile(

        files.cover[0],

        folder

    );









    const gallery:string[] = [];









    files.gallery?.forEach(

        file=>{


            gallery.push(

                saveFile(

                    file,

                    folder

                )

            );


        }

    );









    const now = new Date()

        .toISOString();









    const year = new Date()

        .getFullYear()

        .toString();









    const result = db.prepare(`

        INSERT INTO projects

        (

            slug,

            title,

            category,

            description,

            image,

            gallery,

            year,

            design,

            technical,

            created_at,

            updated_at

        )

        VALUES

        (?,?,?,?,?,?,?,?,?,?,?)

    `)

    .run(


        slug,


        data.title,


        data.category ?? null,


        data.description,


        image,


        JSON.stringify(

            gallery

        ),


        year,


        JSON.stringify(

            data.design

        ),


        JSON.stringify(

            data.technical

        ),


        now,


        now


    );









    const project = db.prepare(`

        SELECT *

        FROM projects

        WHERE id = ?

    `)

    .get(

        result.lastInsertRowid

    ) as Project;









    return parseProject(

        project

    );

}

/*
|--------------------------------------------------------------------------
| UPDATE PROJECT
|--------------------------------------------------------------------------
*/


export function updateProject(

    id:number,

    data:ProjectUpdateData,

    files:ProjectFiles

){



    const current = db.prepare(`

        SELECT *

        FROM projects

        WHERE id = ?

    `)

    .get(

        id

    ) as Project | undefined;









    if(!current){


        throw new Error(

            "Projet introuvable"

        );


    }









    const folder = projectFolder(

        current.slug

    );









    let image = current.image;









    /*
    |--------------------------------------------------------------------------
    | Remplacement couverture
    |--------------------------------------------------------------------------
    */


    if(

        files.cover &&

        files.cover[0]

    ){


        deleteFile(

            current.image

        );







        image = saveFile(

            files.cover[0],

            folder

        );


    }









    /*
    |--------------------------------------------------------------------------
    | Gestion galerie existante
    |--------------------------------------------------------------------------
    */


    const oldGallery:string[] = current.gallery ?? [];


    const existingImages =

        data.existingImages ?? [];









    oldGallery.forEach(

        oldImage=>{


            if(

                !existingImages.includes(

                    oldImage

                )

            ){


                deleteFile(

                    oldImage

                );


            }


        }

    );









    const gallery:string[] = [

        ...existingImages

    ];









    /*
    |--------------------------------------------------------------------------
    | Ajout nouvelles images
    |--------------------------------------------------------------------------
    */


    files.gallery?.forEach(

        file=>{


            gallery.push(

                saveFile(

                    file,

                    folder

                )

            );


        }

    );









    const now = new Date()

        .toISOString();









    db.prepare(`

        UPDATE projects

        SET

            title = ?,

            category = ?,

            description = ?,

            image = ?,

            gallery = ?,

            design = ?,

            technical = ?,

            updated_at = ?

        WHERE id = ?

    `)

    .run(


        data.title,


        data.category ?? null,


        data.description,


        image,


        JSON.stringify(

            gallery

        ),


        JSON.stringify(

            data.design

        ),


        JSON.stringify(

            data.technical

        ),


        now,


        id


    );









    const updated = db.prepare(`

        SELECT *

        FROM projects

        WHERE id = ?

    `)

    .get(

        id

    ) as Project | undefined;









    if(!updated){


        throw new Error(

            "Erreur récupération projet modifié"

        );


    }









    return parseProject(

        updated

    );

}









/*
|--------------------------------------------------------------------------
| DELETE PROJECT
|--------------------------------------------------------------------------
*/


export function deleteProject(

    id:number

){



    const project = db.prepare(`

        SELECT *

        FROM projects

        WHERE id = ?

    `)

    .get(

        id

    ) as Project | undefined;









    if(!project){


        return false;


    }









    const folder = projectFolder(

        project.slug

    );









    if(fs.existsSync(folder)){


        fs.rmSync(

            folder,

            {

                recursive:true,

                force:true

            }

        );


    }









    db.prepare(`

        DELETE FROM projects

        WHERE id = ?

    `)

    .run(

        id

    );









    return true;

}