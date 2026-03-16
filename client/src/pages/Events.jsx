import { useEffect, useState } from "react";
import { fetchEvents, fetchLocations } from "../api";
import { Link } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);

  // Filters
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(false);
  const [showPastOnly, setShowPastOnly] = useState(false);

  // Sorting
  const [sortOrder, setSortOrder] = useState("newest");

  // Date range
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Tags (example categories)
  const tags = ["Sports", "Music", "Community", "Education"];
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    fetchEvents().then(setEvents);
    fetchLocations().then(setLocations);
  }, []);

  // Toggle tag selection
  function toggleTag(tag) {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }

  // Clear all filters
  function clearFilters() {
    setSearch("");
    setLocationFilter("");
    setShowUpcomingOnly(false);
    setShowPastOnly(false);
    setSortOrder("newest");
    setStartDate("");
    setEndDate("");
    setSelectedTags([]);
  }

  // Apply filters
  let filteredEvents = events
    .filter(event =>
      event.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(event =>
      locationFilter ? event.location_id === Number(locationFilter) : true
    )
    .filter(event =>
      showUpcomingOnly
        ? new Date(event.event_date) >= new Date()
        : true
    )
    .filter(event =>
      showPastOnly
        ? new Date(event.event_date) < new Date()
        : true
    )
    .filter(event =>
      startDate ? new Date(event.event_date) >= new Date(startDate) : true
    )
    .filter(event =>
      endDate ? new Date(event.event_date) <= new Date(endDate) : true
    )
    .filter(event =>
      selectedTags.length > 0
        ? selectedTags.includes(event.category)
        : true
    );

  // Sorting
  filteredEvents.sort((a, b) => {
    const dateA = new Date(a.event_date);
    const dateB = new Date(b.event_date);

    if (sortOrder === "newest") return dateB - dateA;
    if (sortOrder === "oldest") return dateA - dateB;
    return 0;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Events</h1>

      {/* Filters */}
      <div className="space-y-4 mb-6">

        {/* Search */}
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full"
        />

        {/* Location + Sorting */}
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="p-2 border rounded w-full md:w-1/3"
          >
            <option value="">All Locations</option>
            {locations.map(loc => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border rounded w-full md:w-1/3"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
          </select>
        </div>

        {/* Date Range */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border rounded w-full md:w-1/3"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border rounded w-full md:w-1/3"
          />
        </div>

        {/* Toggles */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showUpcomingOnly}
              onChange={() => setShowUpcomingOnly(!showUpcomingOnly)}
            />
            <span>Upcoming Only</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showPastOnly}
              onChange={() => setShowPastOnly(!showPastOnly)}
            />
            <span>Past Events Only</span>
          </label>
        </div>

        {/* Tag Filters */}
        <div className="flex gap-3 flex-wrap">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded border ${
                selectedTags.includes(tag)
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Clear Filters
        </button>
      </div>

      {/* Event Cards */}
      <div className="space-y-6">
        {filteredEvents.map(event => (
          <div
            key={event.id}
            className="bg-white shadow rounded p-6 hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold">{event.title}</h2>
            <p className="text-gray-700">{event.description}</p>

            <p className="mt-2 text-gray-500">
              <strong>Date:</strong>{" "}
              {new Date(event.event_date).toLocaleString()}
            </p>

            <Link
              to={`/locations/${event.location_id}`}
              className="text-blue-600 hover:underline"
            >
              View Location
            </Link>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <p className="text-gray-500">No events match your filters.</p>
        )}
      </div>
    </div>
  );
}