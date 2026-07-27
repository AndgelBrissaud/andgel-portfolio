import {
    useEffect,
    useState
} from "react";


import {

    getPhotoCategories

} from "../services/photos.service";


import type {

    PhotoCategory

} from "../types/photo";









export default function usePhotoCategories(){



    const [

        categories,

        setCategories

    ] = useState<PhotoCategory[]>([]);





    const [

        loading,

        setLoading

    ] = useState<boolean>(true);





    const [

        error,

        setError

    ] = useState<string | null>(null);









    async function loadCategories(){


        try{


            setLoading(true);

            setError(null);





            const data = await getPhotoCategories();





            setCategories(data);



        }

        catch(error){


            console.error(

                "Erreur chargement catégories photos :",

                error

            );





            setError(

                "Impossible de charger les catégories"

            );


        }

        finally{


            setLoading(false);


        }


    }









    useEffect(()=>{


        let cancelled = false;





        async function init(){


            try{


                const data = await getPhotoCategories();





                if(cancelled){


                    return;

                }





                setCategories(data);

                setError(null);



            }

            catch(error){


                console.error(

                    "Erreur chargement catégories photos :",

                    error

                );





                if(!cancelled){


                    setError(

                        "Impossible de charger les catégories"

                    );


                }


            }

            finally{


                if(!cancelled){


                    setLoading(false);


                }


            }


        }





        init();







        return ()=>{


            cancelled = true;


        };


    },[]);









    return {


        categories,


        loading,


        error,


        reload:loadCategories


    };


}