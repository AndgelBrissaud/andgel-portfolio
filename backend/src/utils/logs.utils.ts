import { execa } from "execa";




export interface LogOptions {


    lines?:number;


    filter?:string;


}







class LogsUtils {







    private async run(

        command:string[]

    ):Promise<string>{


        try{


            const {

                stdout

            } = await execa(

                command[0],

                command.slice(1),

                {

                    reject:true

                }

            );


            return stdout;


        }


        catch(error:any){


            throw new Error(

                error.stderr ||

                error.message ||

                "Erreur récupération logs"

            );


        }


    }









    private sanitize(

        value:string

    ):string{


        return value.replace(

            /[^a-zA-Z0-9_.-]/g,

            ""

        );


    }









    async get(

        container:string,

        options:LogOptions = {}

    ):Promise<string>{



        const safeContainer = this.sanitize(

            container

        );




        const lines = options.lines ?? 200;







        let logs = await this.run([

            "docker",

            "logs",

            "--tail",

            String(lines),

            safeContainer

        ]);








        if(options.filter){


            logs = logs

                .split("\n")

                .filter(line =>

                    line

                    .toLowerCase()

                    .includes(

                        options.filter!

                            .toLowerCase()

                    )

                )

                .join("\n");


        }






        return logs;


    }









    async exists(

        container:string

    ):Promise<boolean>{


        try{


            await this.run([

                "docker",

                "inspect",

                this.sanitize(container)

            ]);


            return true;


        }


        catch{


            return false;


        }


    }









    async follow(

        container:string

    ){


        /*

            Préparation streaming temps réel.

            Sera branché avec SSE dans le controller.

        */



        const safeContainer = this.sanitize(

            container

        );



        return [

            "docker",

            "logs",

            "-f",

            safeContainer

        ];


    }





}



export default new LogsUtils();