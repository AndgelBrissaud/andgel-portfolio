import db from "./database.js";





function columnExists(

    table:string,

    column:string

):boolean {


    const columns = db.prepare(

        `PRAGMA table_info(${table})`

    )

    .all() as {

        name:string

    }[];





    return columns.some(

        item => item.name === column

    );

}









function addColumn(

    table:string,

    column:string,

    definition:string

){


    if(!columnExists(table,column)){


        db.prepare(

            `
            ALTER TABLE ${table}

            ADD COLUMN ${column}

            ${definition}
            `

        )

        .run();



        console.log(

            `Colonne ajoutée : ${table}.${column}`

        );


    }

}









/*
|--------------------------------------------------------------------------
| MIGRATION PROJECTS
|--------------------------------------------------------------------------
*/


addColumn(

    "projects",

    "slug",

    "TEXT"

);



addColumn(

    "projects",

    "category",

    "TEXT"

);



addColumn(

    "projects",

    "gallery",

    "TEXT DEFAULT '[]'"

);



addColumn(

    "projects",

    "year",

    "TEXT"

);



addColumn(

    "projects",

    "design",

    "TEXT DEFAULT '{}'"

);



addColumn(

    "projects",

    "technical",

    "TEXT DEFAULT '[]'"

);



addColumn(

    "projects",

    "updated_at",

    "DATETIME DEFAULT CURRENT_TIMESTAMP"

);









/*
|--------------------------------------------------------------------------
| MIGRATION PHOTOS
|--------------------------------------------------------------------------
*/


addColumn(

    "photos",

    "description",

    "TEXT"

);



addColumn(

    "photos",

    "updated_at",

    "DATETIME DEFAULT CURRENT_TIMESTAMP"

);





console.log(

    "Migration terminée"

);