const { Client } = require("pg");
require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express(); // Hela webbservern

// Middlewares
app.use(cors()); // Tillåt cross-origin
app.use(express.json()); // Parse JSON-body

// Anslutning till databas
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

//Anslut till databas
client.connect((err) => {
    if (err) {
        console.log("Connection error: " + err);
    } else {
        console.log("Connected to database");
    }
})

// Routing
app.get("/workexperience", async (req, res) => {
    try {
        const result = await client.query("SELECT * FROM workexperience");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: "Could not get CV" });
    }
});

/*
// En specifik arbetserfarenhet
app.get("/workexperience/:id", (req, res) => {

})

// Lägg till data
app.post("/workexperience", (req, res) => {

})
*/

app.listen(3000, () => {
    console.log("Server running port 3000");
})