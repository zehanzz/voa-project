import mysql from "mysql";

export const dbUtil = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Hanhan9923",
    database: "voa_database"
})