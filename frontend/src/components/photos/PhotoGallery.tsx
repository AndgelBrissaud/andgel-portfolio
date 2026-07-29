import {

    useEffect,

    useState

} from "react";


import {

    getPhotos

} from "../../services/photos.service";


import type {

    Photo

} from "../../types/photo";


import PhotoCard from "./PhotoCard";









interface PhotoGalleryProps {


    categoryId?:number | null;


}









export default function PhotoGallery({

    categoryId

}:PhotoGalleryProps){



    const [

        photos,

        setPhotos

    ] = useState<Photo[]>([]);





    const [

        loading,

        setLoading

    ] = useState(true);









    useEffect(()=>{


        async function load(){


            try{


                const data = await getPhotos();


                setPhotos(data);


            }

            finally{


                setLoading(false);


            }


        }





        load();


    },[]);









    const filteredPhotos = categoryId

        ?

        photos.filter(

            photo=>

                (photo.category && photo.category.id === categoryId) || photo.category_id === categoryId

        )

        :

        photos;









    if(loading){


        return (

            <p className="text-text-muted">

                Chargement des photographies...

            </p>

        );


    }


    if(!loading && filteredPhotos.length === 0){

        return (

            <div className="text-center text-text-muted">

                {categoryId ? (

                    <>
                        <h3 className="text-lg font-medium mb-2">Aucune photo dans cette catégorie</h3>
                        <p>Cette catégorie ne contient pas encore de photographie.</p>
                    </>

                ) : (

                    <>
                        <h3 className="text-lg font-medium mb-2">Aucune photographie disponible</h3>
                        <p>Les photographies sont en cours d'ajout. Revenez bientôt.</p>
                    </>

                )}

            </div>

        );

    }









    return (

        <div

            className="
                grid
                gap-8
                sm:grid-cols-2
                xl:grid-cols-3
            "

        >


            {

                filteredPhotos.map(

                    photo=>(

                        <PhotoCard

                            key={photo.id}

                            photo={photo}

                        />

                    )

                )

            }



        </div>

    );

}