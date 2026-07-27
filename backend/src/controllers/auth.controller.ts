import { Request, Response } from "express";

import bcrypt from "bcrypt";

import crypto from "crypto";

import db from "../config/database.js";







export async function login(

    req:Request,

    res:Response

) {


    const {

        password

    } = req.body;






    if (!password) {


        return res.status(400).json({

            message:"Mot de passe requis"

        });


    }







    const admin = db

        .prepare(

            `
            SELECT *
            FROM admins
            LIMIT 1
            `

        )

        .get() as {

            id:number;

            password_hash:string;

        };








    if (!admin) {


        return res.status(401).json({

            message:"Administrateur introuvable"

        });


    }







    const valid = await bcrypt.compare(

        password,

        admin.password_hash

    );







    if (!valid) {


        return res.status(401).json({

            message:"Mot de passe incorrect"

        });


    }







    const token = crypto.randomBytes(48)

        .toString("hex");







    const expires = new Date();



    expires.setDate(

        expires.getDate() + 7

    );







    db.prepare(

        `
        INSERT INTO sessions

        (
            token,
            expires_at
        )

        VALUES

        (
            ?,
            ?
        )

        `

    )

    .run(

        token,

        expires.toISOString()

    );







    res.json({

        token

    });


}