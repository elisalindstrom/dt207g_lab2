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
app.get("/api/workexperience", async (req, res) => {
    try {
        const result = await client.query("SELECT * FROM workexperience");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: "Could not get CV" });
    }
});

// Hämta en work experience
app.get("/api/workexperience/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await client.query("SELECT * FROM workexperience WHERE id = $1", [id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Could not get CV" });
    }
});

// Lägg till data
app.post("/api/workexperience", async (req, res) => {
    const { companyname, jobtitle, startdate, enddate } = req.body; // Data från request body

    // Validering
    if (!companyname || !jobtitle || !startdate)
        return res.status(400).json({ message: "Companyname, jobtitle och startdate krävs" });

    try {
        const result = await client.query(
            "INSERT INTO workexperience(companyname, jobtitle, startdate, enddate) VALUES($1, $2, $3, $4) RETURNING id", [companyname, jobtitle, startdate, enddate]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Could not insert work experience" });
    }
});

// Uppdatera
app.put("/api/workexperience/:id", async (req, res) => {
    const id = req.params.id;
    const { companyname, jobtitle, startdate, enddate } = req.body; // Data från request body

    // Validering
    if (!companyname || !jobtitle || !startdate)
        return res.status(400).json({ message: "Companyname, jobtitle och startdate krävs" });

    try {
        const result = await client.query("UPDATE workexperience SET companyname = $1, jobtitle = $2, startdate = $3, enddate = $4 WHERE id = $5 RETURNING id", [companyname, jobtitle, startdate, enddate, id]);

        if (!result.rows.length) return res.status(404).json({ message: "Work experience not found" });
        res.json(result.rows[0].id);
    } catch (error) {
        res.status(500).json({ message: "Could not update work experience" });
    }
})

// Radera en workexperience
app.delete("/api/workexperience/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await client.query("DELETE FROM workexperience WHERE id = $1", [id]);
        res.json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Could not delete work experience" });
    }
});

// Starta applikation
app.listen(process.env.PORT, () => {
    console.log("Servern startad på http://localhost:" + process.env.PORT + "/api/workexperience");
})