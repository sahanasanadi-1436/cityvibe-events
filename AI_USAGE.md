# AI Usage Documentation

## Project: CityVibe - Local Events & Experiences Platform

This project was developed with the assistance of AI tools, mainly ChatGPT.
AI was used for generating ideas, creating initial code structures, debugging,
explaining technical concepts, and improving the application.

I reviewed, tested, modified, and integrated the generated code into the project.

---

## 1. Project Structure and Initial Setup

### AI Tool
ChatGPT

### Prompt Used
"Help me build a full-stack local events and experiences platform using
React, Node.js, Express and MongoDB. The application should include event
listing, event details, booking and an admin dashboard."

### What AI Generated
- Suggested project architecture
- React page/component structure
- Node.js and Express backend structure
- MongoDB/Mongoose model structure
- REST API approach

### What I Changed
- Created the project in my local development environment.
- Created the frontend and backend folders.
- Installed and configured the required dependencies.
- Adjusted file paths and project structure according to my project.

### Problems Encountered
Some generated code required changes to match the actual project structure
and existing components.

### How I Solved Them
I tested each feature locally and modified the generated code to match the
actual application.

---

## 2. Event Listing and Event Search

### AI Tool
ChatGPT

### Prompt Used
"Create a React events listing page with search, category, location, date
filters and sorting."

### What AI Generated
- Event filtering logic
- Search functionality
- Category filtering
- Location filtering
- Date filtering
- Price/date sorting
- Loading and empty states

### What I Changed
- Connected the Events page to the Express REST API.
- Replaced the static event data with MongoDB event data.
- Updated the application to use MongoDB `_id` values.
- Adjusted filtering logic to work with the backend event structure.

### Problems Encountered
The frontend initially used numeric static event IDs while MongoDB generated
ObjectId values.

### How I Solved Them
I changed the frontend to use MongoDB `_id` values for event links, keys and
API requests.

---

## 3. Event Details Page

### AI Tool
ChatGPT

### Prompt Used
"Create an event details page in React that fetches an event using its ID
from a Node.js REST API."

### What AI Generated
- Event details page structure
- API fetching logic
- Loading state
- Error state
- Book Now navigation

### What I Changed
- Connected the page to the Express API.
- Changed the event request to use the MongoDB event `_id`.
- Connected the Book Now button to the booking route.

### Problems Encountered
The original frontend used static event data.

### How I Solved Them
I replaced the static lookup with an API request:

`GET /api/events/:id`

---

## 4. MongoDB Event API

### AI Tool
ChatGPT

### Prompt Used
"Create Node.js Express REST APIs for events using MongoDB and Mongoose
with GET, POST, PUT and DELETE operations."

### What AI Generated
- Event routes
- GET all events
- GET single event
- POST event
- PUT event
- DELETE event
- Mongoose database interaction

### What I Changed
- Configured the MongoDB connection using environment variables.
- Created and seeded the actual CityVibe events.
- Tested the APIs using the local backend.

### Problems Encountered
The frontend and backend initially used different event ID formats.

### How I Solved Them
I standardized the frontend to use MongoDB ObjectIds.

---

## 5. Booking System

### AI Tool
ChatGPT

### Prompt Used
"Create a React booking form with name, email, phone number and ticket
count validation and connect it to an Express/MongoDB booking API."

### What AI Generated
- Booking form
- Form validation
- Booking API request
- Booking reference ID flow
- Booking confirmation navigation

### What I Changed
- Connected the form to the actual backend API.
- Used the MongoDB event `_id`.
- Added frontend validation for email, phone number and ticket count.
- Displayed the actual booking information on the confirmation page.

### Problems Encountered
The first version stored bookings in localStorage and used static event data.

### How I Solved Them
I changed the booking flow to send the booking data to:

`POST /api/bookings`

The backend now saves the booking in MongoDB and decreases the available
event seats.

---

## 6. Booking REST API

### AI Tool
ChatGPT

### Prompt Used
"Create an Express booking API using Mongoose that checks event availability,
creates a booking reference ID, calculates the total price and decreases
available seats."

### What AI Generated
- Booking Mongoose model
- Booking routes
- Booking creation logic
- Reference ID generation
- Total price calculation
- Seat availability checking

### What I Changed
- Connected the API to my actual Event and Booking models.
- Tested booking creation with MongoDB.
- Verified that event seats decrease after successful booking.

### Problems Encountered
The booking system initially worked only with frontend/localStorage data.

### How I Solved Them
I connected the React booking form directly to the Express REST API and
MongoDB.

---

## 7. Booking Confirmation Page

### AI Tool
ChatGPT

### Prompt Used
"Create a booking confirmation page showing booking reference ID, event,
customer, tickets and total amount."

### What AI Generated
- Confirmation page
- Booking details display
- Reference ID display
- Navigation back to events

### What I Changed
- Added event date, time and location.
- Added customer email.
- Added handling for missing booking state.

### Problems Encountered
The page needed to receive the newly created booking from the booking flow.

### How I Solved Them
I passed the booking and event information through React Router navigation
state.

---

## 8. My Bookings Page

### AI Tool
ChatGPT

### Prompt Used
"Create a React page that fetches booking records from an Express API and
displays booking history."

### What AI Generated
- My Bookings page
- API fetching
- Booking cards
- Loading state
- Empty state
- Error state

### What I Changed
- Connected the page to the actual `/api/bookings` endpoint.
- Displayed reference ID, event, customer, tickets and total.
- Added booking date.

### Problems Encountered
The current booking endpoint returns all bookings rather than filtering
bookings for a specific logged-in user.

### How I Solved Them
For the assignment demonstration, the page displays the booking records
returned by the backend.

### Known Limitation
User authentication and user-specific booking history were not required
by the assignment, so authentication was not implemented.

---

## 9. Admin Dashboard

### AI Tool
ChatGPT

### Prompt Used
"Create a React admin dashboard connected to Node.js Express REST APIs
for managing events and viewing bookings."

### What AI Generated
- Dashboard layout
- Statistics cards
- Event management
- Add event form
- Edit event functionality
- Delete event functionality
- Bookings table

### What I Changed
- Connected the dashboard to the actual event and booking APIs.
- Added MongoDB `_id` handling.
- Added event creation and editing fields based on my Event model.
- Added booking statistics and revenue calculation.

### Problems Encountered
The AdminDashboard initially caused an import error because the component
file did not yet exist.

### How I Solved Them
I created `AdminDashboard.jsx` with a default export and added the correct
route in `App.jsx`.

---

## 10. Error Handling and Loading States

### AI Tool
ChatGPT

### Prompt Used
"Add loading, error and empty states to the React API-based pages."

### What AI Generated
- Loading messages
- Error messages
- Empty states
- API error handling

### What I Changed
I tested the API failures and adjusted the messages to make them more
understandable to users.

---

## 11. Responsive UI

### AI Tool
ChatGPT

### Prompt Used
"Improve the responsive design of the event platform for desktop, tablet
and mobile screens."

### What AI Generated
- Responsive layout suggestions
- Responsive cards
- Responsive forms
- Mobile navigation/layout suggestions

### What I Changed
I adjusted the CSS to match the existing CityVibe design and tested the
application at different screen sizes.

---

## 12. Debugging

### AI Tool
ChatGPT

### How AI Was Used
ChatGPT was used to understand and troubleshoot errors such as:

- React import/export errors
- Incorrect MongoDB IDs
- API connection problems
- Booking API errors
- Frontend/backend data mismatch
- Route configuration issues

### What I Changed
I reproduced the errors locally, checked the browser console and backend
terminal, and then applied and tested the fixes.

---

## 13. Overall AI-Assisted Development Process

The development process followed this approach:

1. Define the required feature.
2. Ask AI for an initial implementation or explanation.
3. Integrate the code into the project.
4. Run the application locally.
5. Test the feature.
6. Identify errors or mismatches.
7. Ask AI for debugging help.
8. Modify the generated code.
9. Test again.
10. Keep the final working implementation.

AI was used as a development assistant rather than as a replacement for
testing, debugging, and understanding the application.

---

## 14. Major Technologies

- React
- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs
- CSS
- Vite
- Git/GitHub

---

## 15. Final Note

All AI-generated code was reviewed and tested during development. Changes
were made where necessary to integrate the code with the actual CityVibe
application, database structure, API endpoints and UI.