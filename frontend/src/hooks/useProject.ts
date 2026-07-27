import {
    useEffect,
    useState
} from "react";


import {

    getProjectBySlug,

    type Project

} from "../services/api";









export default function useProject(

    slug?:string

){



    const [

        project,

        setProject

    ] = useState<Project | null>(null);





    const [

        loading,

        setLoading

    ] = useState(true);





    const [

        error,

        setError

    ] = useState<string | null>(null);









    useEffect(()=>{


        let cancelled = false;





        async function fetchProject(){


            if(!slug){


                setLoading(false);

                return;


            }





            try {


                const data = await getProjectBySlug(

                    slug

                );





                if(cancelled){

                    return;

                }





                setProject(data);

                setError(null);



            }

            catch(error){


                console.error(error);



                if(!cancelled){


                    setError(

                        "Projet introuvable"

                    );


                }


            }

            finally{


                if(!cancelled){


                    setLoading(false);

                }


            }


        }







        fetchProject();







        return ()=>{


            cancelled=true;


        };


    },[slug]);









    return {


        project,


        loading,


        error


    };


}