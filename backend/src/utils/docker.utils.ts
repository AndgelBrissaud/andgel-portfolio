import { execa } from "execa";

import path from "path";



export interface DockerContainer {

    id:string;

    name:string;

    image:string;

    state:string;

    status:string;

}







class DockerService {







    private async run(

        command:string[],

        cwd?:string

    ):Promise<string>{


        try{


            const {

                stdout

            } = await execa(

                command[0],

                command.slice(1),

                {

                    cwd,

                    reject:true

                }

            );


            return stdout.trim();


        }


        catch(error:any){


            throw new Error(

                error.stderr ||

                error.message ||

                "Erreur Docker inconnue"

            );


        }


    }









    private validateProjectPath(

        projectPath:string

    ):string{


        const resolved = path.resolve(

            projectPath

        );




        if(

            !resolved.startsWith(

                "/opt/docker/"

            )

        ){

            throw new Error(

                "Chemin docker interdit"

            );

        }





        return resolved;


    }









    async getContainers():Promise<DockerContainer[]>{


        const output = await this.run([

            "docker",

            "ps",

            "-a",

            "--format",

            "{{json .}}"

        ]);



        if(!output){

            return [];

        }



        return output

            .split("\n")

            .filter(Boolean)

            .map(line=>{


                const container = JSON.parse(line);



                return {

                    id:container.ID,

                    name:container.Names,

                    image:container.Image,

                    state:container.State,

                    status:container.Status

                };


            });


    }









    async getContainer(

        name:string

    ):Promise<DockerContainer|null>{


        const containers = await this.getContainers();



        return (

            containers.find(

                container =>

                    container.name === name

            )

            ??

            null

        );


    }









    private async validateContainer(

        name:string

    ):Promise<string>{


        const container = await this.getContainer(

            name

        );



        if(!container){


            throw new Error(

                "Container Docker introuvable"

            );


        }



        return container.name;


    }









    async isRunning(

        name:string

    ):Promise<boolean>{


        const container = await this.getContainer(

            name

        );


        return (

            container?.state === "running"

        );


    }









    async getLogs(

        container:string,

        lines:number = 200

    ):Promise<string>{


        const validContainer = await this.validateContainer(

            container

        );



        return this.run([

            "docker",

            "logs",

            "--tail",

            String(lines),

            validContainer

        ]);


    }









    async startContainer(

        container:string

    ):Promise<void>{


        const validContainer = await this.validateContainer(

            container

        );



        await this.run([

            "docker",

            "start",

            validContainer

        ]);


    }









    async stopContainer(

        container:string

    ):Promise<void>{


        const validContainer = await this.validateContainer(

            container

        );



        await this.run([

            "docker",

            "stop",

            validContainer

        ]);


    }









    async restartContainer(

        container:string

    ):Promise<void>{


        const validContainer = await this.validateContainer(

            container

        );



        await this.run([

            "docker",

            "restart",

            validContainer

        ]);


    }









    async composePull(

        projectPath:string

    ):Promise<void>{


        const safePath = this.validateProjectPath(

            projectPath

        );



        await this.run([

            "docker",

            "compose",

            "pull"

        ],safePath);


    }









    async composeUp(

        projectPath:string

    ):Promise<void>{


        const safePath = this.validateProjectPath(

            projectPath

        );



        await this.run([

            "docker",

            "compose",

            "up",

            "-d"

        ],safePath);


    }









    async composeDown(

        projectPath:string

    ):Promise<void>{


        const safePath = this.validateProjectPath(

            projectPath

        );



        await this.run([

            "docker",

            "compose",

            "down"

        ],safePath);


    }









    async composeRestart(

        projectPath:string

    ):Promise<void>{


        const safePath = this.validateProjectPath(

            projectPath

        );



        await this.composeDown(

            safePath

        );


        await this.composeUp(

            safePath

        );


    }









    async composeConfig(

        projectPath:string

    ):Promise<string>{


        const safePath = this.validateProjectPath(

            projectPath

        );



        return this.run([

            "docker",

            "compose",

            "config"

        ],safePath);


    }







}



export default new DockerService();