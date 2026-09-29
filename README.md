# CityVibe - Local Events & Experiences Platform

CityVibe is a modern web application for discovering and booking local
events and experiences in a city.

Users can explore events, search and filter events, view event details,
book tickets, and receive a booking confirmation with a unique reference ID.

An admin dashboard is provided to manage events and view bookings.

---

## Features

### User Features

- Home page with featured events and categories
- Browse all available events
- Search events
- Filter by category
- Filter by location
- Filter by date
- Sort events
- View detailed event information
- View organizer and event information
- View available seats
- Book event tickets
- Form validation
- Booking reference ID
- Booking confirmation page
- View booking history
- Responsive design for desktop, tablet and mobile

### Admin Features

- Admin dashboard
- View total events
- View total bookings
- View tickets sold
- View booking revenue
- Add new events
- Edit existing events
- Delete events
- View recent bookings

---

## Technology Stack

### Frontend

- React
- JavaScript
- React Router
- CSS
- Vite

### Backend

- Node.js
- Express.js
- REST APIs

### Database

- MongoDB
- Mongoose

### Development Tools

- Visual Studio Code
- MongoDB
- Git
- GitHub
- Postman / Browser API testing

---

## Project Structure

```text
cityvibe-events/
│
├── backend/
│   ├── models/
│   │   ├── Event.js
│   │   └── Booking.js
│   │
│   ├── routes/
│   │   ├── eventRoutes.js
│   │   └── bookingRoutes.js
│   │
│   ├── seed/
│   │   └── seedEvents.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Events.jsx
│   │   ├── EventDetails.jsx
│   │   ├── Booking.jsx
│   │   ├── BookingSuccess.jsx
│   │   ├── MyBookings.jsx
│   │   └── AdminDashboard.jsx
│   │
│   ├── data/
│   ├── App.jsx
│   └── main.jsx
│
├── AI_USAGE.md
├── README.md
├── package.json
└── vite.config.js