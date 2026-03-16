const API_BASE = "/api";

const LocationsAPI = {
  getAllLocations: async () => {
    const res = await fetch(`${API_BASE}/locations`);
    return res.json();
  },

  getLocationById: async (id) => {
    const res = await fetch(`${API_BASE}/locations/${id}`);
    return res.json();
  }
};

export default LocationsAPI;