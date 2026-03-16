const API_BASE = "/api";

const EventsAPI = {
  getEventsByLocation: async (locationId) => {
    const res = await fetch(`${API_BASE}/events/location/${locationId}`);
    return res.json();
  }
};

export default EventsAPI;