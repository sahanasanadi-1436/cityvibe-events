import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    tickets: 1
  });

  const [errors, setErrors] = useState({});
  const [bookingLoading, setBookingLoading] = useState(false);

  
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);

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

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

    
    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone =
        "Enter a valid 10 digit phone number";
    }

    const ticketCount = Number(form.tickets);

    if (
      !Number.isInteger(ticketCount) ||
      ticketCount < 1
    ) {
      newErrors.tickets =
        "Ticket count must be at least 1";
    } else if (event && ticketCount > event.seats) {
      newErrors.tickets =
        "Not enough seats available";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setBookingLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            eventId: event._id,
            name: form.name,
            email: form.email,
            phone: form.phone,
            tickets: Number(form.tickets)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Booking failed"
        );
      }

      const booking = data.booking;

      
      navigate(
        `/booking-success/${booking.referenceId}`,
        {
          state: {
            booking,
            event
          }
        }
      );

    } catch (err) {
      console.error("Booking error:", err);

      setErrors({
        submit:
          err.message ||
          "Booking failed. Please try again."
      });

    } finally {
      setBookingLoading(false);
    }
  };

  
  if (loading) {
    return (
      <main className="section">
        <div className="container">
          <div className="empty-state">
            <h2>Loading event...</h2>
          </div>
        </div>
      </main>
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
    <main className="section booking-page">

      <div className="container">

        <div className="booking-layout">

          

          <div className="booking-form-card">

            <span className="hero-tag">
              COMPLETE YOUR BOOKING
            </span>

            <h1>
              Book Your Tickets
            </h1>

            <p>
              Enter your details to reserve
              your place at this event.
            </p>

            <form onSubmit={handleSubmit}>

            

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />

                {errors.name && (
                  <small className="error">
                    {errors.name}
                  </small>
                )}

              </div>


            

              <div className="form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                />

                {errors.email && (
                  <small className="error">
                    {errors.email}
                  </small>
                )}

              </div>


              

              <div className="form-group">

                <label>
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10 digit phone number"
                />

                {errors.phone && (
                  <small className="error">
                    {errors.phone}
                  </small>
                )}

              </div>


            

              <div className="form-group">

                <label>
                  Number of Tickets
                </label>

                <input
                  type="number"
                  name="tickets"
                  min="1"
                  max={event.seats}
                  value={form.tickets}
                  onChange={handleChange}
                />

                {errors.tickets && (
                  <small className="error">
                    {errors.tickets}
                  </small>
                )}

              </div>


            

              {errors.submit && (
                <div className="error">
                  {errors.submit}
                </div>
              )}


              

              <button
                type="submit"
                className="btn full-btn"
                disabled={bookingLoading}
              >

                {bookingLoading
                  ? "Processing..."
                  : "Confirm Booking"}

              </button>

            </form>

          </div>


    

          <div className="booking-summary">

            <img
              src={event.image}
              alt={event.title}
            />

            <div className="summary-content">

              <span className="category">
                {event.category}
              </span>

              <h2>
                {event.title}
              </h2>

              <p>
                📅 {event.date}
              </p>

              <p>
                🕐 {event.time}
              </p>

              <p>
                📍 {event.location}
              </p>

              <p>
                👥 {event.seats} seats available
              </p>

              <hr />

              <div className="price-row">

                <span>
                  Ticket price
                </span>

                <strong>
                  ₹{event.price}
                </strong>

              </div>


              <div className="price-row">

                <span>
                  Tickets
                </span>

                <strong>
                  {form.tickets}
                </strong>

              </div>


              <div className="price-row total-row">

                <span>
                  Total
                </span>

                <strong>
                  ₹
                  {Number(form.tickets) *
                    event.price}
                </strong>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Booking;