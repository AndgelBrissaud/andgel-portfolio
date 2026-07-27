export interface Project {


  slug:string;

  title:string;

  category:string;

  description:string;

  image:string;

  gallery:string[];

  year:string;


  technologies?:string[];


  technical?:string[];



  design?:{

    style:string;

    experience:string;

    typography:string[];

    colors:{
      name:string;
      value:string;
    }[];

  };


}