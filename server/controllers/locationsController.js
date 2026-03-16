import { pool } from "../config/database.js";

export const getAllLocations = async (req, res) => {
  const result = await pool.query("SELECT * FROM locations");
  res.json(result.rows);
};

export const getLocationById = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query("SELECT * FROM locations WHERE id=$1", [id]);
  res.json(result.rows[0]);
};