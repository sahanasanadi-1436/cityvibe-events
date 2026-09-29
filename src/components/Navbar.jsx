import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-container">

        <Link to="/" className="logo">
          CityVibe
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/my-bookings">My Bookings</Link>
          <Link to="/admin">Admin</Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;