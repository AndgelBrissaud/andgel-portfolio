/* ==========================================================================
   CONFIG
========================================================================== */


export const API_BASE_URL =

    import.meta.env.VITE_API_URL ?? "http://localhost:4000";





/* ==========================================================================
   IMAGE URL
========================================================================== */


export function getImageUrl(

    image?:string

):string {


    if(!image){

        return "";

    }



    if(image.startsWith("http")){

        return image;

    }



    return `${API_BASE_URL}${
        image.startsWith("/")
            ? image
            : `/${image}`
    }`;

}









/* ==========================================================================
   TYPES
========================================================================== */


export interface ProjectColor {

    name:string;

    value:string;

}





export interface ProjectDesign {

    style?:string;

    experience?:string;

    typography?:string[];

    colors?:ProjectColor[];

}





export interface Project {


    id:number;


    slug:string;


    title:string;


    category?:string;


    description:string;


    image:string;


    gallery:string[];


    year?:string;


    design?:ProjectDesign;


    technical:string[];


    createdAt?:string;


    updatedAt?:string;

}









export type PhotoCategory =

    | "portrait"

    | "phone"

    | "phlore"

    | "other";









export interface PhotoMetadata {


    camera?:string;


    lens?:string;


    settings?:{


        aperture?:string;


        shutterSpeed?:string;


        iso?:number;


        focalLength?:string;


    };

}









export interface Photo {


    id:number|string;


    title:string;


    category?:PhotoCategory;


    description?:string;


    image:string;


    thumbnail?:string;


    date?:string;


    location?:string;


    instagramUrl?:string;


    metadata?:PhotoMetadata;


    createdAt?:string;


    updatedAt?:string;

}









export interface PhotoCategoryItem {


    id:number;


    name:string;


    createdAt?:string;

}









export interface AdminStats {


    projects:number;


    photos:number;


    status:string;

}









export interface LoginResponse {


    token:string;

}









/* ==========================================================================
   TOKEN
========================================================================== */


function getToken():string|null {


    return localStorage.getItem(

        "admin_token"

    );

}









export function isAuthenticated():boolean {


    return Boolean(

        getToken()

    );

}









/* ==========================================================================
   FETCH GLOBAL
========================================================================== */


export async function apiFetch<T>(

    endpoint:string,

    options:RequestInit = {}

):Promise<T>{



    const token = getToken();





    const headers:Record<string,string> = {


        ...(options.headers as Record<string,string> ?? {})

    };





    const isFormData =

        options.body instanceof FormData;





    if(!isFormData){

        headers["Content-Type"] =

            "application/json";

    }





    if(token){

        headers.Authorization =

            `Bearer ${token}`;

    }









    const response = await fetch(

        `${API_BASE_URL}${endpoint}`,

        {

            ...options,

            headers

        }

    );









    if(!response.ok){


        let message =

            "Erreur serveur";





        try{


            const error =

                await response.json();



            message =

                error.message ||

                message;


        }

        catch{

            //

        }



        throw new Error(message);

    }









    if(response.status === 204){

        return {} as T;

    }









    return response.json();

}









/* ==========================================================================
   AUTH
========================================================================== */


export async function login(

    password:string

):Promise<LoginResponse>{



    const result = await apiFetch<LoginResponse>(

        "/auth/login",

        {

            method:"POST",

            body:JSON.stringify({

                password

            })

        }

    );





    localStorage.setItem(

        "admin_token",

        result.token

    );





    return result;

}









export function logout(){


    localStorage.removeItem(

        "admin_token"

    );

}









/* ==========================================================================
   ADMIN
========================================================================== */


export function getAdminStats(){


    return apiFetch<AdminStats>(

        "/admin/stats"

    );

}









/* ==========================================================================
   PROJECTS
========================================================================== */


export function getProjects(){


    return apiFetch<Project[]>(

        "/projects"

    );

}





export function refreshProjects(){


    return getProjects();

}





export function getProjectBySlug(

    slug:string

){


    return apiFetch<Project>(

        `/projects/${slug}`

    );

}





export function getProject(

    slug:string

){


    return getProjectBySlug(

        slug

    );

}





export function createProject(

    data:FormData

){


    return apiFetch<Project>(

        "/projects",

        {

            method:"POST",

            body:data

        }

    );

}





export function updateProject(

    id:number,

    data:FormData

){


    return apiFetch<Project>(

        `/projects/${id}`,

        {

            method:"PUT",

            body:data

        }

    );

}





export function deleteProject(

    id:number

){


    return apiFetch<void>(

        `/projects/${id}`,

        {

            method:"DELETE"

        }

    );

}









/* ==========================================================================
   PHOTOS
========================================================================== */


export function getPhotos(){


    return apiFetch<Photo[]>(

        "/photos"

    );

}





export function getPhotoById(

    id:number

){


    return apiFetch<Photo>(

        `/photos/${id}`

    );

}





export function createPhoto(

    data:FormData

){


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

){


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

){


    return apiFetch<void>(

        `/photos/${id}`,

        {

            method:"DELETE"

        }

    );

}









/* ==========================================================================
   PHOTO CATEGORIES
========================================================================== */


export function getPhotoCategories(){


    return apiFetch<PhotoCategoryItem[]>(

        "/photo-categories"

    );

}





export function createPhotoCategory(

    name:string

){


    return apiFetch<PhotoCategoryItem>(

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

){


    return apiFetch<void>(

        `/photo-categories/${id}`,

        {

            method:"DELETE"

        }

    );

}