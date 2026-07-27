export interface PhotoCategory {

    id:number;

    name:string;

    created_at?:string;

}





export interface Photo {

    id:number;

    title:string;

    image:string;

    description?:string | null;

    category?:PhotoCategory | null;

    category_id?:number | null;

    created_at?:string;

    updated_at?:string;

}