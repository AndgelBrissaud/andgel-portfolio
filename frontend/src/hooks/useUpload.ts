import {
    useState
} from "react";









export default function useUpload(){



    const [

        files,

        setFiles

    ] = useState<File[]>([]);









    const [

        uploading,

        setUploading

    ] = useState(false);









    const [

        error,

        setError

    ] = useState<string | null>(null);









    function addFiles(

        newFiles: File[]

    ){



        setFiles(

            current => [

                ...current,

                ...newFiles

            ]

        );


        setError(null);


    }









    function removeFile(

        index:number

    ){



        setFiles(

            current =>

                current.filter(

                    (_,i)=>

                        i !== index

                )

        );


    }









    function clearFiles(){


        setFiles([]);


    }









    function createFormData(

        fieldName = "images"

    ){



        const formData = new FormData();





        files.forEach(

            file => {


                formData.append(

                    fieldName,

                    file

                );


            }

        );





        return formData;


    }









    async function upload(

        url:string,

        fieldName = "images"

    ){



        try {


            setUploading(true);

            setError(null);





            const formData = createFormData(

                fieldName

            );





            const response = await fetch(

                url,

                {

                    method:"POST",

                    body:formData

                }

            );





            if(!response.ok){


                throw new Error(

                    "Erreur pendant l'envoi"

                );


            }







            clearFiles();





            return await response.json();



        }

        catch(error){


            console.error(error);



            setError(

                error instanceof Error

                    ? error.message

                    : "Erreur upload"

            );



            throw error;


        }

        finally{


            setUploading(false);


        }


    }









    return {


        files,


        uploading,


        error,


        addFiles,


        removeFile,


        clearFiles,


        createFormData,


        upload


    };


}