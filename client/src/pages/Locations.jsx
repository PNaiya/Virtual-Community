import { useEffect, useState } from "react";
import { fetchLocations } from "../api";
import { Link } from "react-router-dom";

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLocations().then(setLocations);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Community Locations</h1>

      <input
        type="text"
        placeholder="Search locations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 p-2 border rounded w-full max-w-md"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {locations
          .filter(loc =>
            loc.name.toLowerCase().includes(search.toLowerCase())
          )
          .map(loc => (
            <Link
              key={loc.id}
              to={`/locations/${loc.id}`}
              className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={loc.image_url}
                alt={loc.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{loc.name}</h2>
                <p className="text-gray-600">{loc.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}