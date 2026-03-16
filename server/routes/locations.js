router.post("/", async (req, res) => {
  try {
    const { name, description, image_url } = req.body;

    const result = await pool.query(
      `INSERT INTO locations (name, description, image_url)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, description, image_url]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create location" });
  }
});