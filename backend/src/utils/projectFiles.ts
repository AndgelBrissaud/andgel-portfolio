import fs from "fs";
import path from "path";





export function moveProjectFiles(

    slug: string,

    cover?: Express.Multer.File,

    gallery: Express.Multer.File[] = []

) {

    const projectDir = path.join(

        process.cwd(),

        "uploads",

        "projects",

        slug

    );





    if (!fs.existsSync(projectDir)) {

        fs.mkdirSync(

            projectDir,

            {

                recursive: true

            }

        );

    }





    let coverPath = "";





    if (cover) {

        const extension = path.extname(

            cover.originalname

        );



        const destination = path.join(

            projectDir,

            `cover${extension}`

        );



        fs.renameSync(

            cover.path,

            destination

        );



        coverPath =

            `/uploads/projects/${slug}/cover${extension}`;

    }





    const galleryPaths: string[] = [];





    gallery.forEach(

        (file, index) => {

            const extension = path.extname(

                file.originalname

            );



            const filename =

                `gallery-${index + 1}${extension}`;



            const destination = path.join(

                projectDir,

                filename

            );



            fs.renameSync(

                file.path,

                destination

            );



            galleryPaths.push(

                `/uploads/projects/${slug}/${filename}`

            );

        }

    );





    return {

        coverPath,

        galleryPaths

    };

}