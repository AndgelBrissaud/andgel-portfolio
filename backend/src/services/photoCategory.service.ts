import db from "../config/database.js";


import type {
    PhotoCategory
} from "../types/photo.types.js";









/*
|--------------------------------------------------------------------------
| PARSE
|--------------------------------------------------------------------------
*/


function parseCategory(

    row:any

):PhotoCategory {


    return {

        id:Number(row.id),

        name:String(row.name),

        created_at:String(row.created_at)

    };

}









/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
| GET ALL CATEGORIES
|--------------------------------------------------------------------------
*/


export function getPhotoCategories():PhotoCategory[]{



    const rows = db.prepare(`

        SELECT

            id,

            name,

            created_at

        FROM photo_categories

        ORDER BY name ASC

    `)

    .all();





    return rows.map(

        parseCategory

    );

}









/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
| CREATE CATEGORY
|--------------------------------------------------------------------------
*/


export function createPhotoCategory(

    name:string

):PhotoCategory {



    if(

        typeof name !== "string" ||

        !name.trim()

    ){

        throw new Error(

            "Nom catégorie obligatoire"

        );

    }









    const result = db.prepare(`

        INSERT INTO photo_categories

        (

            name

        )

        VALUES (?)

    `)

    .run(

        name.trim()

    );









    const category = db.prepare(`

        SELECT

            id,

            name,

            created_at

        FROM photo_categories

        WHERE id = ?

    `)

    .get(

        Number(

            result.lastInsertRowid

        )

    );









    if(!category){

        throw new Error(

            "Création catégorie impossible"

        );

    }









    return parseCategory(

        category

    );

}









/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
| DELETE CATEGORY
|--------------------------------------------------------------------------
*/


export function deletePhotoCategory(

    id:number

):boolean {



    if(

        !Number.isInteger(id)

    ){

        throw new Error(

            "ID catégorie invalide"

        );

    }









    const result = db.prepare(`

        DELETE FROM photo_categories

        WHERE id = ?

    `)

    .run(

        id

    );









    return (

        result.changes > 0

    );

}