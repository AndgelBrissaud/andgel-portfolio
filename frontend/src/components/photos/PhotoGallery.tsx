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

                photo.category?.id === categoryId

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