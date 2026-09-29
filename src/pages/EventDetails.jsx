import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function EventDetails() {

  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchEvent = async () => {

      try {

        const response = await fetch(
          `http://localhost:5000/api/events/${id}`
        );

        if (!response.ok) {
          throw new Error("Event not found");
        }

        const data = await response.json();

        setEvent(data);
        setError("");

      } catch (err) {

        console.error("Error fetching event:", err);

        setError("Event not found");

      } finally {

        setLoading(false);

      }

    };

    fetchEvent();

  }, [id]);


  if (loading) {

    return (
      <div className="empty-state section">
        <h2>Loading event...</h2>
      </div>
    );

  }


  if (error || !event) {

    return (

      <div className="empty-state section">

        <h1>Event Not Found</h1>

        <Link
          to="/events"
          className="btn"
        >
          Back to Events
        </Link>

      </div>

    );

  }


  return (

    <main className="details-page">

      <div className="details-banner">

        <img
          src={event.image}
          alt={event.title}
        />

        <div className="banner-overlay">

          <div className="container">

            <span className="category">
              {event.category}
            </span>

            <h1>
              {event.title}
            </h1>

          </div>

        </div>

      </div>


      <div className="container details-container">

        <div className="details-main">

          <h2>
            About this event
          </h2>

          <p>
            {event.description}
          </p>


          <h2>
            Event Information
          </h2>


          <div className="info-grid">

            <div className="info-box">

              <span>📅</span>

              <div>

                <small>Date</small>

                <strong>
                  {event.date}
                </strong>

              </div>

            </div>


            <div className="info-box">

              <span>🕐</span>

              <div>

                <small>Time</small>

                <strong>
                  {event.time}
                </strong>

              </div>

            </div>


            <div className="info-box">

              <span>📍</span>

              <div>

                <small>Location</small>

                <strong>
                  {event.location}
                </strong>

              </div>

            </div>


            <div className="info-box">

              <span>👥</span>

              <div>

                <small>Available Seats</small>

                <strong>
                  {event.seats}
                </strong>

              </div>

            </div>

          </div>


          <h2>
            Organizer
          </h2>


          <div className="organizer">

            <div className="organizer-avatar">
              {event.organizer.charAt(0)}
            </div>

            <div>

              <strong>
                {event.organizer}
              </strong>

              <p>
                Event Organizer
              </p>

            </div>

          </div>

        </div>


        <aside className="booking-card">

          <span>
            Ticket Price
          </span>

          <h2>
            ₹{event.price}
          </h2>

          <p>
            {event.seats} seats available
          </p>

          <Link
            to={`/booking/${event._id}`}
            className="btn full-btn"
          >
            Book Now
          </Link>

          <small>
            No payment required for this demo.
          </small>

        </aside>

      </div>

    </main>

  );

}

export default EventDetails;