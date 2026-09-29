import { Link, useLocation } from "react-router-dom";

function BookingSuccess() {
  const location = useLocation();

  const booking = location.state?.booking;
  const event = location.state?.event;

  if (!booking || !event) {
    return (
      <main className="section success-page">
        <div className="success-card">
          <div className="success-icon">✓</div>

          <h1>Booking Confirmed!</h1>

          <p>
            Your booking was completed successfully.
          </p>

          <p>
            Booking details are not available on this page.
          </p>

          <Link to="/events" className="btn">
            Explore Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="section success-page">
      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>Booking Confirmed!</h1>

        <p>
          Your event booking has been successfully completed.
        </p>

        <div className="confirmation-details">

          <div>
            <span>Reference ID</span>
            <strong>{booking.referenceId}</strong>
          </div>

          <div>
            <span>Event</span>
            <strong>{event.title}</strong>
          </div>

          <div>
            <span>Name</span>
            <strong>{booking.name}</strong>
          </div>

          <div>
            <span>Email</span>
            <strong>{booking.email}</strong>
          </div>

          <div>
            <span>Tickets</span>
            <strong>{booking.tickets}</strong>
          </div>

          <div>
            <span>Date</span>
            <strong>{event.date}</strong>
          </div>

          <div>
            <span>Time</span>
            <strong>{event.time}</strong>
          </div>

          <div>
            <span>Location</span>
            <strong>{event.location}</strong>
          </div>

          <div>
            <span>Total Amount</span>
            <strong>₹{booking.total}</strong>
          </div>

        </div>

        <div className="success-actions">
          <Link to="/events" className="btn">
            Explore More Events
          </Link>

          <Link to="/" className="btn secondary-btn">
            Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}

export default BookingSuccess;