import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import favicon from "serve-favicon";

import locationsRouter from "./routes/locationsRoutes.js";
import eventsRouter from "./routes/eventsRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// Development favicon
if (process.env.NODE_ENV === "development") {
   // app.use(favicon(path.resolve("../", "client", "public", "party.png")));
}
// Production favicon + static files
else if (process.env.NODE_ENV === "production") {
   // app.use(favicon(path.resolve("public", "party.png")));
    app.use(express.static("public"));
}

// Register API routes
app.use("/api", locationsRouter);
app.use("/api", eventsRouter);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
    app.get("/*", (_, res) =>
        res.sendFile(path.resolve("public", "index.html"))
    );
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the React build folder
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
});