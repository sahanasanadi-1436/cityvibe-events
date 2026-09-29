import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="event-card">

      <img
        src={event.image}
        alt={event.title}
        className="event-image"
      />

      <div className="event-content">

        <span className="category">
          {event.category}
        </span>

        <h3>{event.title}</h3>

        <p className="event-info">
          📅 {event.date}
        </p>

        <p className="event-info">
          🕐 {event.time}
        </p>

        <p className="event-info">
          📍 {event.location}
        </p>

        <div className="event-bottom">

          <strong>₹{event.price}</strong>

          <Link
  to={`/events/${event._id}`}
  className="btn small-btn"
>
  View Details
</Link>

        </div>

      </div>

    </div>
  );
}

export default EventCard;