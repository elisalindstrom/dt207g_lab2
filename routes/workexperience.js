const express = require("express");
const client = require("../db"); // Koppling till modul db
const router = express.Router();

// Routing
router.get("/", async (req, res) => {
    try {
        const result = await client.query("SELECT * FROM workexperience ORDER BY startdate DESC");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: "Could not get CV" });
    }
});

// Hämta en work experience
router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await client.query("SELECT * FROM workexperience WHERE id = $1", [id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Could not get CV" });
    }
});

// Lägg till data
router.post("/", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await client.query("DELETE FROM workexperience WHERE id = $1", [id]);
        res.json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Could not delete work experience" });
    }
});

module.exports = router;