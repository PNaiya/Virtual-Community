import { useState } from "react";
import { createLocation } from "../api";
import { useNavigate } from "react-router-dom";

export default function AddLocation() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    image_url: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createLocation(form);
    navigate("/"); // go back to locations list
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add a New Location</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-6 rounded max-w-lg"
      >
        <label className="font-medium">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <label className="font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <label className="font-medium">Image URL</label>
        <input
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Location
        </button>
      </form>
    </div>
  );
}