import { useState, useEffect } from "react";
import { createEvent, fetchLocations } from "../api";
import { useNavigate } from "react-router-dom";

export default function AddEvent() {
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    event_date: "",
    location_id: ""
  });

  useEffect(() => {
    fetchLocations().then(setLocations);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createEvent(form);
    navigate("/events");
  }

  return (
    <div>
      <h1>Create a New Event</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <label>Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />

        <label>Date & Time</label>
        <input
          type="datetime-local"
          name="event_date"
          value={form.event_date}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />

        <label>Location</label>
        <select
          name="location_id"
          value={form.location_id}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 10 }}
        >
          <option value="">Select a location</option>
          {locations.map(loc => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}