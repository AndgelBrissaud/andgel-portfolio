export interface ProjectColor {

    name: string;

    value: string;

}





export interface ProjectDesign {

    style: string;

    experience: string;

    typography: string[];

    colors: ProjectColor[];

}





export interface Project {

    id: number;

    slug: string;

    title: string;

    category?: string;

    description: string;

    image: string;

    gallery: string[];

    year: string;

    design: ProjectDesign;

    technical: string[];

    createdAt: string;

    updatedAt: string;

}





export interface CreateProjectInput {


    title: string;

    description: string;

    category?: string;

    technical: string[];

    design?: ProjectDesign;


}