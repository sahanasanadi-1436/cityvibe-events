const mongoose = require("mongoose");
require("dotenv").config();

const Event = require("./models/Event");

const events = [
  {
    title: "Sunset Music Festival",
    category: "Music",
    location: "Mumbai",
    date: "2026-10-10",
    time: "6:00 PM",
    price: 799,
    seats: 120,
    organizer: "Mumbai Events",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
    description:
      "Enjoy an unforgettable evening of live music, food, entertainment and beautiful sunset views."
  },

  {
    title: "Modern Art Exhibition",
    category: "Art",
    location: "Pune",
    date: "2026-10-15",
    time: "11:00 AM",
    price: 299,
    seats: 80,
    organizer: "Art House India",
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912",
    description:
      "Explore modern artworks created by talented artists from across India."
  },

  {
    title: "React Developer Workshop",
    category: "Workshop",
    location: "Bangalore",
    date: "2026-10-18",
    time: "10:00 AM",
    price: 499,
    seats: 50,
    organizer: "Tech Community",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    description:
      "A practical workshop covering React, components, hooks and modern frontend development."
  },

  {
    title: "Street Food Carnival",
    category: "Food",
    location: "Mumbai",
    date: "2026-10-20",
    time: "5:00 PM",
    price: 199,
    seats: 200,
    organizer: "Foodies Mumbai",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    description:
      "Taste delicious street food from different parts of India in one exciting carnival."
  },

  {
    title: "Mumbai Marathon Training",
    category: "Sports",
    location: "Mumbai",
    date: "2026-10-22",
    time: "6:30 AM",
    price: 149,
    seats: 100,
    organizer: "Run Mumbai",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5",
    description:
      "Join professional trainers for a fitness and marathon preparation session."
  },

  {
    title: "Startup Networking Night",
    category: "Networking",
    location: "Bangalore",
    date: "2026-10-25",
    time: "7:00 PM",
    price: 399,
    seats: 75,
    organizer: "Startup Circle",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
    description:
      "Meet entrepreneurs, developers, designers and startup enthusiasts."
  },

  {
    title: "Pottery Workshop",
    category: "Workshop",
    location: "Pune",
    date: "2026-10-27",
    time: "3:00 PM",
    price: 599,
    seats: 30,
    organizer: "Clay Studio",
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261",
    description:
      "Learn the basics of pottery and create your own handmade ceramic artwork."
  },

  {
    title: "Community Cultural Fest",
    category: "Community",
    location: "Mumbai",
    date: "2026-10-30",
    time: "4:00 PM",
    price: 99,
    seats: 300,
    organizer: "Mumbai Community",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
    description:
      "Celebrate local culture with music, dance, food and community activities."
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Event.deleteMany({});

    const insertedEvents = await Event.insertMany(events);

    console.log(
      `${insertedEvents.length} events inserted successfully`
    );

    insertedEvents.forEach((event) => {
      console.log(`${event.title} -> ${event._id}`);
    });

    await mongoose.connection.close();

    console.log("Database connection closed");
  } catch (error) {
    console.error("Seeding failed:");
    console.error(error.message);
  }
}

seedDatabase();