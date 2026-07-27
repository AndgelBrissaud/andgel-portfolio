import { apiFetch } from "./api";


import type {

    Photo,

    PhotoCategory

} from "../types/photo";









/*
|--------------------------------------------------------------------------
| PHOTOS PUBLIC
|--------------------------------------------------------------------------
*/


export function getPhotos():Promise<Photo[]>{


    return apiFetch<Photo[]>(

        "/photos"

    );

}









export function getPhotoById(

    id:number

):Promise<Photo>{


    return apiFetch<Photo>(

        `/photos/${id}`

    );

}









/*
|--------------------------------------------------------------------------
| PHOTOS ADMIN
|--------------------------------------------------------------------------
*/


export function createPhoto(

    data:FormData

):Promise<Photo>{


    return apiFetch<Photo>(

        "/photos",

        {

            method:"POST",

            body:data

        }

    );

}









export function updatePhoto(

    id:number,

    data:FormData

):Promise<Photo>{


    return apiFetch<Photo>(

        `/photos/${id}`,

        {

            method:"PUT",

            body:data

        }

    );

}









export function deletePhoto(

    id:number

):Promise<void>{


    return apiFetch<void>(

        `/photos/${id}`,

        {

            method:"DELETE"

        }

    );

}









/*
|--------------------------------------------------------------------------
| CATÉGORIES PHOTOS
|--------------------------------------------------------------------------
*/


export function getPhotoCategories():Promise<PhotoCategory[]>{


    return apiFetch<PhotoCategory[]>(

        "/photo-categories"

    );

}









export function createPhotoCategory(

    name:string

):Promise<PhotoCategory>{


    return apiFetch<PhotoCategory>(

        "/photo-categories",

        {

            method:"POST",

            body:JSON.stringify({

                name

            })

        }

    );

}









export function deletePhotoCategory(

    id:number

):Promise<void>{


    return apiFetch<void>(

        `/photo-categories/${id}`,

        {

            method:"DELETE"

        }

    );

}