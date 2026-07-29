import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDir = path.join(
    process.cwd(),
    "data"
);

if(!fs.existsSync(dataDir)){

    fs.mkdirSync(
        dataDir,
        {
            recursive:true
        }
    );

}

const dbPath = path.join(
    dataDir,
    "database.sqlite"
);

const db = new Database(
    dbPath
);


db.pragma(
    "journal_mode = WAL"
);

db.pragma(
    "foreign_keys = ON"
);

db.pragma(
    "synchronous = NORMAL"
);


/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

db.prepare(`

CREATE TABLE IF NOT EXISTS admins (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    password_hash TEXT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)

`).run();



/*
|--------------------------------------------------------------------------
| SESSIONS
|--------------------------------------------------------------------------
*/

db.prepare(`

CREATE TABLE IF NOT EXISTS sessions (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    token TEXT NOT NULL UNIQUE,

    expires_at DATETIME NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)

`).run();



/*
|--------------------------------------------------------------------------
| PROJETS PORTFOLIO
|--------------------------------------------------------------------------
*/

db.prepare(`

CREATE TABLE IF NOT EXISTS projects (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    slug TEXT,

    title TEXT NOT NULL,

    category TEXT,

    description TEXT,

    image TEXT,

    gallery TEXT DEFAULT '[]',

    year TEXT,

    design TEXT DEFAULT '{}',

    technical TEXT DEFAULT '[]',

    url TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

)

`).run();



/*
|--------------------------------------------------------------------------
| SERVER MANAGEMENT PROJECTS
|--------------------------------------------------------------------------
*/

db.prepare(`

CREATE TABLE IF NOT EXISTS server_projects (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL UNIQUE,

    path TEXT NOT NULL UNIQUE,

    compose_file TEXT DEFAULT 'docker-compose.yml',

    frontend_container TEXT,

    backend_container TEXT,

    repository TEXT,

    branch TEXT DEFAULT 'main',

    enabled INTEGER DEFAULT 1,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

)

`).run();



/*
|--------------------------------------------------------------------------
| CATÉGORIES PHOTOS
|--------------------------------------------------------------------------
*/

db.prepare(`

CREATE TABLE IF NOT EXISTS photo_categories (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL UNIQUE,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)

`).run();



/*
|--------------------------------------------------------------------------
| PHOTOS
|--------------------------------------------------------------------------
*/

db.prepare(`

CREATE TABLE IF NOT EXISTS photos (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    title TEXT,

    image TEXT NOT NULL,

    category TEXT,

    description TEXT,

    category_id INTEGER,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(category_id)

    REFERENCES photo_categories(id)

)

`).run();



/*
|--------------------------------------------------------------------------
| MIGRATION PHOTOS CATEGORY_ID
|--------------------------------------------------------------------------
*/

const photoColumns = db

    .prepare(
        "PRAGMA table_info(photos)"
    )

    .all() as {

        name:string

    }[];


const hasCategoryId = photoColumns.some(

    column => column.name === "category_id"

);



if(!hasCategoryId){

    db.prepare(`

        ALTER TABLE photos

        ADD COLUMN category_id INTEGER

    `).run();

}



/*
|--------------------------------------------------------------------------
| MIGRATION ANCIENNES CATEGORIES
|--------------------------------------------------------------------------
*/

const oldCategories = db.prepare(`

SELECT DISTINCT category

FROM photos

WHERE category IS NOT NULL

AND category != ''

AND category_id IS NULL

`).all() as {

    category:string

}[];



const insertCategory = db.prepare(`

INSERT OR IGNORE INTO photo_categories(name)

VALUES(?)

`);


const getCategory = db.prepare(`

SELECT id

FROM photo_categories

WHERE name = ?

`);


const updatePhotoCategory = db.prepare(`

UPDATE photos

SET category_id = ?

WHERE category = ?

`);



for(const item of oldCategories){

    insertCategory.run(
        item.category
    );


    const category = getCategory.get(
        item.category
    ) as {

        id:number

    };


    if(category){

        updatePhotoCategory.run(

            category.id,

            item.category

        );

    }

}

export default db;