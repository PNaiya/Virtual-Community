import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import locationsRouter from "./routes/locationsRoutes.js";
import eventsRouter from "./routes/eventsRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve React build
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API routes
app.use("/api", locationsRouter);
app.use("/api", eventsRouter);

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
});