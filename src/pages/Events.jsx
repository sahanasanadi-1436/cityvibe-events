import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import EventCard from "../components/EventCard";
import EventFilters from "../components/EventFilters";

function Events() {
  const [searchParams] = useSearchParams();

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    searchParams.get("category") || ""
  );
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [sort, setSort] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const response = await fetch("http://localhost:5000/api/events");

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        setEvents(data);
        setError("");
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Unable to load events. Please make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  
  const filteredEvents = events.filter((event) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      !search ||
      event.title.toLowerCase().includes(searchText) ||
      event.description.toLowerCase().includes(searchText) ||
      event.category.toLowerCase().includes(searchText) ||
      event.location.toLowerCase().includes(searchText);

    const matchesCategory =
      !category || event.category === category;

    const matchesLocation =
      !location || event.location === location;

    const matchesDate =
      !date || event.date === date;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLocation &&
      matchesDate
    );
  });

  
  if (sort === "priceLow") {
    filteredEvents.sort((a, b) => a.price - b.price);
  }

  if (sort === "priceHigh") {
    filteredEvents.sort((a, b) => b.price - a.price);
  }

  if (sort === "date") {
    filteredEvents.sort(
      (a, b) =>
        new Date(a.date) - new Date(b.date)
    );
  }

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setLocation("");
    setDate("");
    setSort("");
  };

  if (loading) {
    return (
      <main className="section">
        <div className="container">
          <h2>Loading events...</h2>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="section">
        <div className="container">
          <div className="empty-state">
            <h2>Unable to load events</h2>
            <p>{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section events-page">

      <div className="container">

        <div className="page-heading">

          <span>EXPLORE</span>

          <h1>
            Discover Events
          </h1>

          <p>
            Find something exciting happening
            around your city.
          </p>

        </div>

        <EventFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          location={location}
          setLocation={setLocation}
          date={date}
          setDate={setDate}
          sort={sort}
          setSort={setSort}
        />

        <div className="results-header">

          <h2>
            {filteredEvents.length} Events Found
          </h2>

          <button
            className="clear-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>

        {filteredEvents.length > 0 ? (

          <div className="event-grid">

            {filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
              />
            ))}

          </div>

        ) : (

          <div className="empty-state">

            <div>🔍</div>

            <h2>
              No events found
            </h2>

            <p>
              Try changing your filters
              or search keywords.
            </p>

            <button
              className="btn"
              onClick={clearFilters}
            >
              Reset Filters
            </button>

          </div>

        )}

      </div>

    </main>
  );
}

export default Events;