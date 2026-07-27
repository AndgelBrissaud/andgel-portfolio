import bcrypt from "bcrypt";

import db from "./config/database.js";





async function createAdmin() {


    const password = "ChangeMoi123!";



    const hash = await bcrypt.hash(

        password,

        10

    );





    const existing = db
        .prepare(
            `
            SELECT id
            FROM admins
            LIMIT 1
            `
        )
        .get();






    if (existing) {


        console.log(
            "Un administrateur existe déjà."
        );


        process.exit();


    }







    db.prepare(

        `
        INSERT INTO admins
        (
            password_hash
        )

        VALUES
        (
            ?
        )
        `

    )

    .run(hash);







    console.log(
        "Administrateur créé."
    );


    console.log(
        "Mot de passe : ChangeMoi123!"
    );


}





createAdmin();