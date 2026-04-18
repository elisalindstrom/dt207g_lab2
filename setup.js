// Installations-script
const { Client } = require("pg");
require('dotenv').config();

// Ansluter till databasen genom inställningar från env-fil
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
})

// Ansluter
client.connect((err) => {
    if (err) {
        console.log("Connection error: " + err);
    } else {
        console.log("Connected to database");
        createTable();
    }
})

// Funktion som skapar tabell
async function createTable() {
    try {
        const res = await client.query(`
            DROP TABLE IF EXISTS workexperience;
            CREATE TABLE IF NOT EXISTS workexperience (
                id SERIAL PRIMARY KEY,
                companyname TEXT NOT NULL,
                jobtitle TEXT NOT NULL,
                startdate DATE NOT NULL,
                enddate DATE
            );
        `)
        console.log(res);
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}