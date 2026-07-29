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

    // `category` can be returned in different shapes by the API:
    // - a PhotoCategory object { id, name }
    // - a string category name
    // - a numeric category id
    category?: PhotoCategory | string | number | null;

    // category_id may also arrive as a string in some responses
    category_id?: number | string | null;

    created_at?:string;

    updated_at?:string;

}