import {
    useEffect,
    useState
} from "react";


import {

    getPhotos

} from "../services/photos.service";


import type {

    Photo

} from "../types/photo";









export default function usePhotos(){



    const [

        photos,

        setPhotos

    ] = useState<Photo[]>([]);





    const [

        loading,

        setLoading

    ] = useState<boolean>(true);





    const [

        error,

        setError

    ] = useState<string | null>(null);









    async function loadPhotos(){


        try {


            setLoading(true);

            setError(null);





            const data = await getPhotos();





            setPhotos(data);



        }

        catch(error){


            console.error(

                "Erreur chargement photos :",

                error

            );





            setError(

                "Impossible de charger les photos"

            );


        }

        finally{


            setLoading(false);


        }


    }









    useEffect(()=>{


        let cancelled = false;





        async function init(){


            try {


                const data = await getPhotos();





                if(cancelled){

                    return;

                }





                setPhotos(data);

                setError(null);



            }

            catch(error){


                console.error(

                    "Erreur chargement photos :",

                    error

                );





                if(!cancelled){


                    setError(

                        "Impossible de charger les photos"

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


        photos,


        loading,


        error,


        reload:loadPhotos


    };


}