import { useEffect, useState } from "react";

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    date: "",
    time: "",
    price: "",
    seats: "",
    organizer: "",
    image: "",
    description: ""
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [eventsResponse, bookingsResponse] = await Promise.all([
        fetch("http://localhost:5000/api/events"),
        fetch("http://localhost:5000/api/bookings")
      ]);

      if (!eventsResponse.ok || !bookingsResponse.ok) {
        throw new Error("Failed to load dashboard data");
      }

      const eventsData = await eventsResponse.json();
      const bookingsData = await bookingsResponse.json();

      setEvents(eventsData);
      setBookings(bookingsData);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load admin dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const totalTickets = bookings.reduce(
    (sum, booking) => sum + Number(booking.tickets || 0),
    0
  );

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + Number(booking.total || 0),
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  const resetForm = () => {
    setForm({
      title: "",
      category: "",
      location: "",
      date: "",
      time: "",
      price: "",
      seats: "",
      organizer: "",
      image: "",
      description: ""
    });

    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingId
        ? `http://localhost:5000/api/events/${editingId}`
        : "http://localhost:5000/api/events";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          seats: Number(form.seats)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save event");
      }

      alert(
        editingId
          ? "Event updated successfully!"
          : "Event created successfully!"
      );

      resetForm();
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to save event");
    }
  };

  const handleEdit = (event) => {
    setForm({
      title: event.title || "",
      category: event.category || "",
      location: event.location || "",
      date: event.date || "",
      time: event.time || "",
      price: event.price || "",
      seats: event.seats || "",
      organizer: event.organizer || "",
      image: event.image || "",
      description: event.description || ""
    });

    setEditingId(event._id);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete event");
      }

      alert("Event deleted successfully!");

      fetchDashboardData();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to delete event");
    }
  };

  if (loading) {
    return (
      <main className="section">
        <div className="container">
          <h2>Loading Admin Dashboard...</h2>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="section">
        <div className="container">
          <div className="empty-state">
            <h2>Dashboard Error</h2>
            <p>{error}</p>

            <button className="btn" onClick={fetchDashboardData}>
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section admin-page">
      <div className="container">

        {/* HEADER */}

        <div className="page-heading">
          <span>ADMIN PANEL</span>

          <h1>Admin Dashboard</h1>

          <p>
            Manage events and monitor bookings from one place.
          </p>
        </div>

    
        <div className="admin-stats">

          <div className="admin-stat-card">
            <span>📅</span>

            <div>
              <small>Total Events</small>
              <h2>{events.length}</h2>
            </div>
          </div>

          <div className="admin-stat-card">
            <span>🎫</span>

            <div>
              <small>Total Bookings</small>
              <h2>{bookings.length}</h2>
            </div>
          </div>

          <div className="admin-stat-card">
            <span>👥</span>

            <div>
              <small>Tickets Sold</small>
              <h2>{totalTickets}</h2>
            </div>
          </div>

          <div className="admin-stat-card">
            <span>💰</span>

            <div>
              <small>Total Revenue</small>
              <h2>₹{totalRevenue}</h2>
            </div>
          </div>

        </div>


        <div className="admin-section-header">

          <div>
            <h2>Event Management</h2>

            <p>
              Create, update and delete events.
            </p>
          </div>

          <button
            className="btn"
            onClick={() => {
              if (showForm) {
                resetForm();
              } else {
                setShowForm(true);
              }
            }}
          >
            {showForm ? "Cancel" : "+ Add Event"}
          </button>

        </div>

        {showForm && (
          <div className="admin-form-card">

            <h2>
              {editingId ? "Edit Event" : "Create New Event"}
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="admin-form-grid">

                <div className="form-group">
                  <label>Event Title</label>

                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Event title"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>

                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Music, Workshop, Sports..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>

                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Date</label>

                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Time</label>

                  <input
                    type="text"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    placeholder="6:00 PM - 9:00 PM"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Price</label>

                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="500"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Total Seats</label>

                  <input
                    type="number"
                    name="seats"
                    value={form.seats}
                    onChange={handleChange}
                    placeholder="100"
                    min="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Organizer</label>

                  <input
                    type="text"
                    name="organizer"
                    value={form.organizer}
                    onChange={handleChange}
                    placeholder="Organizer name"
                    required
                  />
                </div>

                <div className="form-group admin-full-width">
                  <label>Image URL</label>

                  <input
                    type="text"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="https://..."
                    required
                  />
                </div>

                <div className="form-group admin-full-width">
                  <label>Description</label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the event..."
                    rows="5"
                    required
                  />
                </div>

              </div>

              <button type="submit" className="btn">
                {editingId ? "Update Event" : "Create Event"}
              </button>

            </form>

          </div>
        )}


        <div className="admin-table-card">

          <h2>All Events</h2>

          <div className="table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>Event</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Seats</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {events.map((event) => (

                  <tr key={event._id}>

                    <td>
                      <strong>{event.title}</strong>
                    </td>

                    <td>{event.category}</td>

                    <td>{event.date}</td>

                    <td>₹{event.price}</td>

                    <td>{event.seats}</td>

                    <td>

                      <button
                        className="admin-edit-btn"
                        onClick={() => handleEdit(event)}
                      >
                        Edit
                      </button>

                      <button
                        className="admin-delete-btn"
                        onClick={() => handleDelete(event._id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>


        <div className="admin-table-card">

          <h2>Recent Bookings</h2>

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>Reference</th>
                  <th>Event</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Tickets</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>

              </thead>

              <tbody>

                {bookings.slice(0, 10).map((booking) => (

                  <tr key={booking._id}>

                    <td>
                      <strong>
                        {booking.referenceId}
                      </strong>
                    </td>

                    <td>{booking.eventName}</td>

                    <td>{booking.name}</td>

                    <td>{booking.email}</td>

                    <td>{booking.tickets}</td>

                    <td>₹{booking.total}</td>

                    <td>
                      {new Date(
                        booking.createdAt
                      ).toLocaleDateString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </main>
  );
}

export default AdminDashboard;