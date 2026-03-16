import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchLocation, fetchEventsByLocation } from "../api";

export default function LocationDetails() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchLocation(id).then(setLocation);
    fetchEventsByLocation(id).then(setEvents);
  }, [id]);

  if (!location) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{location.name}</h1>

      <img
        src={location.image_url}
        alt={location.name}
        className="w-full max-w-3xl rounded shadow mb-6"
      />

      <p className="text-gray-700 mb-10">{location.description}</p>

      <h2 className="text-2xl font-semibold mb-4">Events at this location</h2>

      {events.length === 0 && (
        <p className="text-gray-500">No events scheduled here yet.</p>
      )}

      <div className="space-y-4">
        {events.map(event => (
          <div key={event.id} className="bg-white shadow p-4 rounded">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-gray-500 mt-2">
              {new Date(event.event_date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}