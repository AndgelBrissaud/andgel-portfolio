import {
    useEffect,
    useState
} from "react";


import {

    getProjects,

    type Project

} from "../services/api";









export default function useProjects(){



    const [

        projects,

        setProjects

    ] = useState<Project[]>([]);





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





        async function fetchProjects(){


            try {


                const data = await getProjects();





                if(cancelled){

                    return;

                }





                setProjects(data);

                setError(null);



            }

            catch(error){


                console.error(error);





                if(!cancelled){


                    setError(

                        "Impossible de charger les projets"

                    );


                }


            }

            finally{


                if(!cancelled){


                    setLoading(false);

                }


            }


        }







        fetchProjects();







        return ()=>{


            cancelled = true;


        };



    },[]);









    async function reload(){



        try {


            setLoading(true);

            setError(null);





            const data = await getProjects();



            setProjects(data);



        }

        catch(error){


            console.error(error);



            setError(

                "Impossible de charger les projets"

            );


        }

        finally{


            setLoading(false);


        }


    }









    return {


        projects,


        loading,


        error,


        reload


    };


}