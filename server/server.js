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

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
  ---------------------------------------------------------
  SERVE REACT BUILD (server/public)
  ---------------------------------------------------------
  Your Vite build outputs to: server/public/
  So we serve that folder directly.
*/
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api", locationsRouter);
app.use("/api", eventsRouter);

/*
  ---------------------------------------------------------
  CATCH-ALL: Return React index.html for all other routes
  ---------------------------------------------------------
*/
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
});