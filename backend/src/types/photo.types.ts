export interface PhotoCategory {

    id:number;

    name:string;

    created_at:string;

}





export interface Photo {

    id:number;

    title:string;

    description?:string;

    image:string;

    category?:PhotoCategory | null;

}