router.get("/location/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM events WHERE location_id = $1 ORDER BY event_date ASC",
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch events for location" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, event_date, location_id } = req.body;

    const result = await pool.query(
      `INSERT INTO events (title, description, event_date, location_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, description, event_date, location_id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create event" });
  }
});