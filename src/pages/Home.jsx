import { Link } from "react-router-dom";
import events from "../data/events";
import EventCard from "../components/EventCard";

function Home() {

  const featuredEvents = events.slice(0, 4);

  const categories = [
    {
      name: "Music",
      icon: "🎵"
    },
    {
      name: "Workshops",
      icon: "🧑‍💻"
    },
    {
      name: "Sports",
      icon: "⚽"
    },
    {
      name: "Food",
      icon: "🍔"
    },
    {
      name: "Art",
      icon: "🎨"
    },
    {
      name: "Networking",
      icon: "🤝"
    }
  ];

  return (
    <>

      <section className="hero">

        <div className="container hero-content">

          <div className="hero-text">

            <span className="hero-tag">
              DISCOVER • EXPERIENCE • ENJOY
            </span>

            <h1>
              Find Your Next
              <span> Amazing Experience</span>
            </h1>

            <p>
              Discover exciting events, workshops,
              concerts, food festivals and activities
              happening around your city.
            </p>

            <div className="hero-buttons">

              <Link
                to="/events"
                className="btn"
              >
                Explore Events
              </Link>

              <a
                href="#categories"
                className="btn outline-btn"
              >
                Explore Categories
              </a>

            </div>

          </div>

        </div>

      </section>


      <section
        className="section"
        id="categories"
      >

        <div className="container">

          <div className="section-heading">
            <span>EXPLORE</span>
            <h2>Browse by Category</h2>
            <p>
              Find experiences that match your interests.
            </p>
          </div>

          <div className="category-grid">

            {categories.map((category) => (

              <Link
                key={category.name}
                to={`/events?category=${category.name === "Workshops"
                  ? "Workshop"
                  : category.name}`}
                className="category-card"
              >

                <div className="category-icon">
                  {category.icon}
                </div>

                <h3>{category.name}</h3>

              </Link>

            ))}

          </div>

        </div>

      </section>


      <section className="section featured-section">

        <div className="container">

          <div className="section-heading">

            <span>DON'T MISS OUT</span>

            <h2>Featured Events</h2>

            <p>
              Popular experiences you can book today.
            </p>

          </div>

          <div className="event-grid">

            {featuredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}

          </div>

          <div className="center">

            <Link
              to="/events"
              className="btn"
            >
              View All Events
            </Link>

          </div>

        </div>

      </section>


      <section className="cta-section">

        <div className="container cta-content">

          <h2>
            Ready to create unforgettable memories?
          </h2>

          <p>
            Explore exciting events happening near you.
          </p>

          <Link
            to="/events"
            className="btn white-btn"
          >
            Find Events
          </Link>

        </div>

      </section>

    </>
  );
}

export default Home;