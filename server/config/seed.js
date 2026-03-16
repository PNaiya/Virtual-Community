import dotenv from "dotenv";
dotenv.config();

import { pool } from "./database.js";

const seed = async () => {
  try {
    console.log("🌱 Seeding database...");

    // Clear existing data
    await pool.query(`DELETE FROM events;`);
    await pool.query(`DELETE FROM locations;`);

    // Insert sample locations
    const locationsResult = await pool.query(`
      INSERT INTO locations (name, description, image_url)
      VALUES
        ('Community Park', 'A large outdoor park with picnic areas, trails, and a playground.', 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf'),
        ('Town Recreation Center', 'Indoor gym, basketball courts, and community meeting rooms.', 'https://images.unsplash.com/photo-1584467735871-1f3dff7f1c8b'),
        ('Riverside Pavilion', 'Scenic riverside venue for outdoor events and gatherings.', 'https://images.unsplash.com/photo-1503264116251-35a269479413')
      RETURNING id;
    `);

    const [park, recCenter, pavilion] = locationsResult.rows;

    // Insert sample events
    await pool.query(`
      INSERT INTO events (title, description, event_date, location_id)
      VALUES
        ('Summer Picnic', 'A fun community picnic with games, food, and music.', '2025-06-15 12:00:00', ${park.id}),
        ('Basketball Tournament', 'A friendly competition open to all ages.', '2025-04-10 10:00:00', ${recCenter.id}),
        ('Outdoor Concert', 'Live music by local bands at the riverside.', '2025-07-22 18:30:00', ${pavilion.id});
    `);

    console.log("🌱 Seeding complete!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
};

seed();