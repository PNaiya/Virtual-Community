import express from "express";
import { getEventsByLocation } from "../controllers/eventsController.js";

const router = express.Router();

router.get("/events/location/:id", getEventsByLocation);

export default router;