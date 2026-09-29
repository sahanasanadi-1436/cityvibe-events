import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/bookings"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();

        setBookings(data);
        setError("");
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Unable to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <main className="section">
        <div className="container">
          <h2>Loading bookings...</h2>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="section">
        <div className="container">
          <div className="empty-state">
            <h2>Unable to load bookings</h2>
            <p>{error}</p>

            <Link to="/events" className="btn">
              Explore Events
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">

        <div className="page-heading">
          <span>MY ACTIVITY</span>
          <h1>My Bookings</h1>
          <p>
            View your event booking details and reservation history.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="empty-state">

            <div style={{ fontSize: "50px" }}>
              🎫
            </div>

            <h2>No bookings yet</h2>

            <p>
              You haven't booked any events yet.
            </p>

            <Link to="/events" className="btn">
              Explore Events
            </Link>

          </div>
        ) : (
          <div className="bookings-list">

            {bookings.map((booking) => (

              <div
                className="booking-history-card"
                key={booking._id}
              >

                <div className="booking-history-header">

                  <div>
                    <span>Reference ID</span>

                    <strong>
                      {booking.referenceId}
                    </strong>
                  </div>

                  <span className="booking-status">
                    Confirmed
                  </span>

                </div>

                <div className="booking-history-body">

                  <div>
                    <span>Event</span>

                    <strong>
                      {booking.eventName}
                    </strong>
                  </div>

                  <div>
                    <span>Name</span>

                    <strong>
                      {booking.name}
                    </strong>
                  </div>

                  <div>
                    <span>Email</span>

                    <strong>
                      {booking.email}
                    </strong>
                  </div>

                  <div>
                    <span>Phone</span>

                    <strong>
                      {booking.phone}
                    </strong>
                  </div>

                  <div>
                    <span>Tickets</span>

                    <strong>
                      {booking.tickets}
                    </strong>
                  </div>

                  <div>
                    <span>Total</span>

                    <strong>
                      ₹{booking.total}
                    </strong>
                  </div>

                </div>

                <div className="booking-history-footer">

                  <span>
                    Booked on{" "}
                    {new Date(
                      booking.createdAt
                    ).toLocaleDateString()}
                  </span>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </main>
  );
}

export default MyBookings;