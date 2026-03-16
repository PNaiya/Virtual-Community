const API_BASE = "/api";

export async function fetchLocations() {
  const res = await fetch(`${API_BASE}/locations`);
  return res.json();
}

export async function fetchEvents() {
  const res = await fetch(`${API_BASE}/events`);
  return res.json();
}

export async function fetchLocation(id) {
  const res = await fetch(`/api/locations/${id}`);
  return res.json();
}

export async function fetchEventsByLocation(id) {
  const res = await fetch(`/api/events/location/${id}`);
  return res.json();
}

export async function createLocation(data) {
  const res = await fetch("/api/locations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function createEvent(data) {
  const res = await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}