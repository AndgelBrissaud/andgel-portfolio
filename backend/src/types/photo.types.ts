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

    // category can be a structured object when using category_id, or a legacy string
    category?: PhotoCategory | string | null;

    category_id?: number | null;

}