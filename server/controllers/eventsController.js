import { pool } from "../config/database.js";

export const getEventsByLocation = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "SELECT * FROM events WHERE location_id=$1 ORDER BY event_date ASC",
    [id]
  );
  res.json(result.rows);
};