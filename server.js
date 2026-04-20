const express = require("express");
const cors = require("cors");

// Hela webbservern
const app = express();

// Läsa in routes
const workexperienceRoutes = require("./routes/workexperience");

// Middlewares
app.use(cors()); // Tillåt cross-origin
app.use(express.json()); // Parse JSON-body

app.use("/api/workexperience", workexperienceRoutes);

// Starta applikation
app.listen(process.env.PORT, () => {
    console.log("Servern startad på http://localhost:" + process.env.PORT + "/api/workexperience");
})