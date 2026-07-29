import { execa } from "execa";

import fs from "fs/promises";

import path from "path";

import yaml from "yaml";







class ComposeUtils {







    private async run(

        command:string[],

        cwd:string

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

                "Erreur docker compose"

            );


        }


    }









    private validatePath(

        projectPath:string

    ):string{


        const normalized = path.resolve(

            projectPath

        );




        if(

            !normalized.startsWith(

                "/opt/docker/"

            )

        ){

            throw new Error(

                "Chemin projet non autorisé"

            );

        }



        return normalized;


    }









    private getComposeFile(

        projectPath:string,

        composeFile:string = "docker-compose.yml"

    ):string{


        if(

            composeFile.includes("..") ||

            path.isAbsolute(composeFile)

        ){

            throw new Error(

                "Fichier compose invalide"

            );

        }



        return path.join(

            projectPath,

            composeFile

        );


    }









    private async checkDirectory(

        projectPath:string

    ):Promise<string>{


        const directory = this.validatePath(

            projectPath

        );



        const stat = await fs.stat(

            directory

        );



        if(!stat.isDirectory()){


            throw new Error(

                "Le chemin projet n'est pas un dossier"

            );


        }



        return directory;


    }









    private async checkComposeFile(

        projectPath:string,

        composeFile:string = "docker-compose.yml"

    ):Promise<string>{


        const directory = await this.checkDirectory(

            projectPath

        );



        const file = this.getComposeFile(

            directory,

            composeFile

        );



        try{


            await fs.access(

                file

            );


        }

        catch{


            throw new Error(

                "docker-compose.yml introuvable"

            );


        }



        return file;


    }









    async exists(

        projectPath:string

    ):Promise<boolean>{


        try{


            await this.checkDirectory(

                projectPath

            );


            return true;


        }

        catch{


            return false;


        }


    }









    async hasComposeFile(

        projectPath:string,

        composeFile:string = "docker-compose.yml"

    ):Promise<boolean>{


        try{


            await this.checkComposeFile(

                projectPath,

                composeFile

            );


            return true;


        }

        catch{


            return false;


        }


    }









    async read(

        projectPath:string,

        composeFile:string = "docker-compose.yml"

    ):Promise<string>{


        const file = await this.checkComposeFile(

            projectPath,

            composeFile

        );



        return fs.readFile(

            file,

            "utf-8"

        );


    }









    async write(

        projectPath:string,

        content:string,

        composeFile:string = "docker-compose.yml"

    ):Promise<void>{


        const file = this.getComposeFile(

            this.validatePath(

                projectPath

            ),

            composeFile

        );







        try{


            yaml.parse(

                content

            );


        }

        catch(error){


            throw new Error(

                "docker-compose invalide : YAML incorrect"

            );


        }







        const tempFile = `${file}.tmp`;





        await fs.writeFile(

            tempFile,

            content,

            "utf-8"

        );





        await fs.rename(

            tempFile,

            file

        );







        await this.config(

            projectPath,

            composeFile

        );


    }









    async pull(

        projectPath:string,

        composeFile:string = "docker-compose.yml"

    ):Promise<string>{


        await this.checkComposeFile(

            projectPath,

            composeFile

        );



        const directory = this.validatePath(

            projectPath

        );



        return this.run(

            [

                "docker",

                "compose",

                "-f",

                composeFile,

                "pull"

            ],

            directory

        );


    }









    async up(

        projectPath:string,

        composeFile:string = "docker-compose.yml"

    ):Promise<string>{


        await this.checkComposeFile(

            projectPath,

            composeFile

        );



        const directory = this.validatePath(

            projectPath

        );



        return this.run(

            [

                "docker",

                "compose",

                "-f",

                composeFile,

                "up",

                "-d"

            ],

            directory

        );


    }









    async down(

        projectPath:string,

        composeFile:string = "docker-compose.yml"

    ):Promise<string>{


        await this.checkComposeFile(

            projectPath,

            composeFile

        );



        const directory = this.validatePath(

            projectPath

        );



        return this.run(

            [

                "docker",

                "compose",

                "-f",

                composeFile,

                "down"

            ],

            directory

        );


    }









    async restart(

        projectPath:string,

        composeFile:string = "docker-compose.yml"

    ):Promise<string>{


        await this.down(

            projectPath,

            composeFile

        );



        return this.up(

            projectPath,

            composeFile

        );


    }









    async config(

        projectPath:string,

        composeFile:string = "docker-compose.yml"

    ):Promise<string>{


        await this.checkComposeFile(

            projectPath,

            composeFile

        );



        const directory = this.validatePath(

            projectPath

        );



        return this.run(

            [

                "docker",

                "compose",

                "-f",

                composeFile,

                "config"

            ],

            directory

        );


    }


}







export default new ComposeUtils();