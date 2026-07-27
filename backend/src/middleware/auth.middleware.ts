import { Request, Response, NextFunction } from "express";

import db from "../config/database.js";





export interface AuthRequest extends Request {

    adminId?: number;

}









export default function authMiddleware(

    req:AuthRequest,

    res:Response,

    next:NextFunction

){


    const header = req.headers.authorization;





    if(!header){


        return res.status(401).json({

            message:"Token manquant"

        });


    }







    const token = header.split(" ")[1];







    if(!token){


        return res.status(401).json({

            message:"Token invalide"

        });


    }







    const session = db.prepare(

        `
        SELECT *

        FROM sessions

        WHERE token = ?

        `

    )

    .get(token) as {


        id:number;

        expires_at:string;


    } | undefined;









    if(!session){


        return res.status(401).json({

            message:"Session invalide"

        });


    }







    const expiration = new Date(

        session.expires_at

    );







    if(expiration < new Date()){


        db.prepare(

            `
            DELETE FROM sessions

            WHERE token = ?

            `

        )

        .run(token);





        return res.status(401).json({

            message:"Session expirée"

        });


    }







    req.adminId = session.id;







    next();


}