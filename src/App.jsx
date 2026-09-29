import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MyBooking from "./pages/MyBooking";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Booking from "./pages/Booking";
import BookingSuccess from "./pages/BookingSuccess";
import AdminDashboard from "./pages/AdminDashboard";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/events/:id"
          element={<EventDetails />}
        />

        <Route
          path="/booking/:id"
          element={<Booking />}
        />

        <Route
          path="/booking-success/:id"
          element={<BookingSuccess />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

      <Route path="/my-bookings" element={<MyBooking />} />
      </Routes>

      <Footer />

    </BrowserRouter>

  );

}

export default App;