import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Locations from "./pages/Locations";
import Events from "./pages/Events";
import AddLocation from "./pages/AddLocation";
import AddEvent from "./pages/AddEvent";
import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 20, background: "#eee", marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 20 }}>Locations</Link>
        <Link to="/events">Events</Link>
      </nav>

      <Layout>
      <Routes>
        <Route path="/" element={<Locations />} />
        <Route path="/events" element={<Events />} />
        <Route path="/locations/:id" element={<LocationDetails />} />
        <Route path="/add-location" element={<AddLocation />} />
        <Route path="/add-event" element={<AddEvent />} />
      </Routes>
      </Layout>
    </BrowserRouter>
  );
}