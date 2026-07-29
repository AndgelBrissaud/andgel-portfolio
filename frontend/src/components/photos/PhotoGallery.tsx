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
    categoryId?: number | null;
    categories?: { id: number; name: string }[];
}









export default function PhotoGallery({
    categoryId,
    categories,
}: PhotoGalleryProps) {



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
            photo => {
                // category can be: { id:number, name:string }, a string name, or category_id number
                if (photo.category && typeof photo.category === "object") {
                    return photo.category.id === categoryId;
                }

                if (photo.category && typeof photo.category === "string") {
                    if (!categories || !categoryId) return false;
                    const cat = categories.find((c) => c.id === categoryId);
                    return Boolean(cat && cat.name === photo.category);
                }

                return photo.category_id === categoryId;
            },
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