export interface Project {


  slug: string;


  title: string;


  category: string;


  description: string;


  image: string;


  gallery: string[];


  technologies: string[];


  year: string;



  design?: {

    style: string;


    experience: string;


    typography: string[];


    colors: {

      name: string;

      value: string;

    }[];

  };


}