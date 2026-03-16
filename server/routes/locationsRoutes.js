import express from "express";
import { getAllLocations, getLocationById } from "../controllers/locationsController.js";

const router = express.Router();

router.get("/locations", getAllLocations);
router.get("/locations/:id", getLocationById);

export default router;