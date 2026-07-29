import fs from "fs";
import path from "path";

import db from "../config/database.js";

import {
    Photo
} from "../types/photo.types.js";









/*
|--------------------------------------------------------------------------
| MAPPING DATABASE -> API
|--------------------------------------------------------------------------
*/


function parsePhoto(

    row:any

):Photo {


    return {


        id:row.id,


        title:row.title,


        // return category_id when available and try to resolve category object
        category_id: row.category_id ?? undefined,
        category: (function(){
            if(row.category_id){
                try{
                    const cat = db.prepare(`SELECT id, name, created_at FROM photo_categories WHERE id = ?`).get(row.category_id) as any;
                    if(cat){
                        return {
                            id: Number(cat.id),
                            name: String(cat.name),
                            created_at: String(cat.created_at)
                        };
                    }
                }catch(e){
                    // ignore
                }
            }
            return row.category ?? undefined;
        })(),


        description:row.description ?? undefined,


        image:row.image,


    };


}









/*
|--------------------------------------------------------------------------
| SAVE IMAGE
|--------------------------------------------------------------------------
*/


function savePhotoFile(

    file:Express.Multer.File

):string {


    const photosDir = path.join(

        process.cwd(),

        "uploads",

        "photos"

    );





    fs.mkdirSync(

        photosDir,

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

        photosDir,

        filename

    );







    fs.renameSync(

        file.path,

        destination

    );







    return `/uploads/photos/${filename}`;

}









/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/


export function createPhoto(

    data:{

        title:string;

        category?:string;

        description?:string;

    },

    file:Express.Multer.File

):Photo {



    const image = savePhotoFile(

        file

    );







    // support sending either a category name or a category id
    let categoryName: string | null = null;
    let categoryIdValue: number | null = null;

    if (data.category !== undefined && data.category !== null) {
        // if numeric string or number, treat as id
        const asNumber = Number(data.category);
        if (!Number.isNaN(asNumber) && String(asNumber) === String(data.category)) {
            categoryIdValue = asNumber;
        } else {
            categoryName = String(data.category);
        }
    }

    const result = db.prepare(`
        INSERT INTO photos
        (
            title,
            category,
            description,
            image,
            category_id
        )
        VALUES (?,?,?,?,?)
    `)
    .run(
        data.title,
        categoryName,
        data.description ?? null,
        image,
        categoryIdValue
    );










    const photo = db.prepare(`

        SELECT *

        FROM photos

        WHERE id = ?

    `)

    .get(

        result.lastInsertRowid

    );







    return parsePhoto(

        photo

    );

}









/*
|--------------------------------------------------------------------------
| GET ALL
|--------------------------------------------------------------------------
*/


export function getPhotos():Photo[]{


    const photos = db.prepare(`

        SELECT *

        FROM photos

        ORDER BY created_at DESC

    `)

    .all();







    return photos.map(

        parsePhoto

    );

}









/*
|--------------------------------------------------------------------------
| GET BY ID
|--------------------------------------------------------------------------
*/


export function getPhotoById(

    id:number

):Photo | null {



    const photo = db.prepare(`

        SELECT *

        FROM photos

        WHERE id = ?

    `)

    .get(

        id

    );







    if(!photo){


        return null;

    }







    return parsePhoto(

        photo

    );

}









/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/


export function deletePhoto(

    id:number

):boolean {



    const photo = db.prepare(`

        SELECT *

        FROM photos

        WHERE id = ?

    `)

    .get(

        id

    ) as any;







    if(!photo){


        return false;

    }









    const filePath = path.join(

        process.cwd(),

        photo.image

    );







    if(fs.existsSync(filePath)){


        fs.unlinkSync(

            filePath

        );

    }









    db.prepare(`

        DELETE FROM photos

        WHERE id = ?

    `)

    .run(

        id

    );







    return true;

}