import { Request, Response } from "express";

import db from "../config/database.js";





export function getStats(

    _req: Request,

    res: Response

) {


    const projects = db

        .prepare(
            `
            SELECT COUNT(*) as count
            FROM projects
            `
        )

        .get() as {

            count:number;

        };





    const photos = db

        .prepare(
            `
            SELECT COUNT(*) as count
            FROM photos
            `
        )

        .get() as {

            count:number;

        };








    return res.json({

        projects: projects.count,

        photos: photos.count,

        status: "ONLINE"

    });


}