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
            // Prefer resolving by category_id when explicitly present (allow 0 values to be handled)
            if(row.category_id !== undefined && row.category_id !== null && row.category_id !== ''){
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

            // Fallback: if a category name string was stored in the photo row, try to resolve it to a category object
            if(row.category && typeof row.category === 'string'){
                try{
                    const catByName = db.prepare(`SELECT id, name, created_at FROM photo_categories WHERE name = ?`).get(String(row.category)) as any;
                    if(catByName){
                        return {
                            id: Number(catByName.id),
                            name: String(catByName.name),
                            created_at: String(catByName.created_at)
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


export function fixPhotoCategories(): { updated:number; found:number } {
    const oldCategories = db.prepare(`
        SELECT DISTINCT category
        FROM photos
        WHERE category IS NOT NULL
        AND category != ''
        AND (category_id IS NULL OR category_id = '')
    `).all() as { category: string }[];

    const insertCategory = db.prepare(`INSERT OR IGNORE INTO photo_categories(name) VALUES(?)`);
    const getCategory = db.prepare(`SELECT id FROM photo_categories WHERE name = ?`);
    const updatePhotoCategory = db.prepare(`UPDATE photos SET category_id = ? WHERE category = ?`);

    let totalUpdated = 0;
    for (const item of oldCategories) {
        insertCategory.run(item.category);
        const category = getCategory.get(item.category) as { id: number } | undefined;
        if (category) {
            const info = updatePhotoCategory.run(category.id, item.category);
            totalUpdated += info.changes ?? 0;
        }
    }

    return { updated: totalUpdated, found: oldCategories.length };
}