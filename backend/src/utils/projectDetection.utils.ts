import dockerUtils from "./docker.utils.js";



export interface DetectedProjectContainers {


    frontend_container:string | null;


    backend_container:string | null;


}







class ProjectDetectionUtils {







    async detect(

        projectName:string

    ):Promise<DetectedProjectContainers>{


        const containers = await dockerUtils.getContainers();





        const normalized = projectName

            .toLowerCase()

            .replace(

                /[^a-z0-9]/g,

                ""

            );








        const related = containers.filter(

            container => {


                const name = container.name

                    .toLowerCase()

                    .replace(

                        /[^a-z0-9]/g,

                        ""

                    );



                return (

                    name.includes(

                        normalized

                    )

                    ||

                    normalized.includes(

                        name

                    )

                );


            }

        );








        let frontend:string | null = null;


        let backend:string | null = null;








        for(const container of related){


            const name = container.name.toLowerCase();




            /*
            |--------------------------------------------------------------------------
            | BACKEND
            |--------------------------------------------------------------------------
            */



            if(

                name.includes(

                    "backend"

                )

                ||

                name.includes(

                    "api"

                )

                ||

                name.includes(

                    "server"

                )

            ){

                backend = container.name;

                continue;

            }








            /*
            |--------------------------------------------------------------------------
            | FRONTEND
            |--------------------------------------------------------------------------
            */


            if(

                name.includes(

                    "front"

                )

                ||

                name.includes(

                    "web"

                )

                ||

                name.includes(

                    "client"

                )

                ||

                name.includes(

                    "app"

                )

            ){

                frontend = container.name;

                continue;

            }








            /*
            |--------------------------------------------------------------------------
            | FALLBACK
            |--------------------------------------------------------------------------
            */


            if(!frontend){

                frontend = container.name;

            }

            else if(!backend){


                backend = container.name;


            }


        }







        return {


            frontend_container:frontend,


            backend_container:backend


        };


    }







}



export default new ProjectDetectionUtils();