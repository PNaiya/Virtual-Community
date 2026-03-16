import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="bg-white shadow mb-8">
        <div className="max-w-6xl mx-auto px-4 py-4 flex gap-6 text-lg font-medium">
          <Link to="/" className="hover:text-blue-600">Locations</Link>
          <Link to="/events" className="hover:text-blue-600">Events</Link>
          <Link to="/add-location" className="hover:text-blue-600">Add Location</Link>
          <Link to="/add-event" className="hover:text-blue-600">Add Event</Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4">{children}</main>
    </div>
  );
}