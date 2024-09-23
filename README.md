# Travel Sky

This project is a flight booking website developed using the MERN (MongoDB, Express.js, React, Node.js) stack. It is a flight booking system where users can search for flights and book tickets for either one-way or round-trip journeys.

## Description

Project setup is at the bottom of the readme file

It includes the following key features:

- **User Authentication:** Users can sign up, log in, and manage their accounts.
- **Search Flights:** Users can search for flights based on departure, destination, and dates.
- **One-way & Round-trip Booking:** Users can book one-way or round-trip flights.
- **Flight Details:** View detailed flight information.
- **Reservation System:** Users can view their bookings.
- **Send Boarding Pass via Email:** Flight boarding passes are sent to users who make reservations via email.
- **Infinte Scroll:** Users can load more flight search results by scrolling. The `useInfiniteQuery` feature of the `react-query` library automates the pagination process. As users scroll to the bottom of the page, more flight data is loaded in the background and appended to the existing results. This allows users to view search results in a smoother experience, finding more flights without refreshing the page each time.

[Watch the demo on YouTube](https://www.youtube.com/watch?v=duFUyMMiMw0)


# Screenshots

## SignIn
<img width="1469" alt="Ekran Resmi 2024-09-23 23 31 00" src="https://github.com/user-attachments/assets/d4e3ca59-6151-4725-bc52-f2b2738d3e0e">

## SignUp
<img width="1470" alt="Ekran Resmi 2024-09-23 23 31 10" src="https://github.com/user-attachments/assets/9f281c1b-de68-4128-93a2-132e4b13bb6d">

## Home
<img width="1470" alt="Ekran Resmi 2024-09-23 23 33 43" src="https://github.com/user-attachments/assets/666568ce-be7c-4e71-ad93-58c6bebc3d06">

## FlightResults
<img width="1469" alt="Ekran Resmi 2024-09-23 23 33 57" src="https://github.com/user-attachments/assets/0779eb7f-0bfd-423f-a1de-83f18e0ae6ff">

## Select Flight
<img width="1469" alt="Ekran Resmi 2024-09-23 23 34 16" src="https://github.com/user-attachments/assets/25e34f40-327d-4e32-9385-7edd459d8fe5">

## BookConfirmation
<img width="1469" alt="Ekran Resmi 2024-09-23 23 34 27" src="https://github.com/user-attachments/assets/a2103630-f648-4eb2-af6e-a7b6323d9ae1">

## Book Confirmation Success
<img width="1470" alt="Ekran Resmi 2024-09-23 23 34 40" src="https://github.com/user-attachments/assets/19e13ee0-e1e8-4df1-9f6e-49b37182c91b">

## Flights Page : User Reservations List
<img width="1468" alt="Ekran Resmi 2024-09-23 23 35 20" src="https://github.com/user-attachments/assets/226a739e-a309-43d0-8952-4ad8cb667563">

## Notfound Flights
<img width="1467" alt="Ekran Resmi 2024-09-23 23 36 29" src="https://github.com/user-attachments/assets/11eab9ac-6cdd-40cb-b2bb-131c92fcf54a">

## Loading Animation
<img width="1467" alt="Ekran Resmi 2024-09-23 23 38 21" src="https://github.com/user-attachments/assets/03ce9df5-41d2-4d8a-a455-22e672ea1491">

## Boarding Pass Email
<img width="1239" alt="Ekran Resmi 2024-09-23 23 57 30" src="https://github.com/user-attachments/assets/3d8aa45b-b770-43e6-b80c-493fafd9f1f0">

#Some Mobile ScreenShots

<img width="300" alt="Ekran Resmi 2024-09-09 22 10 35" src="https://github.com/user-attachments/assets/51b10f1c-4a59-4921-92c3-00f044b66d94">
<img width="300" alt="Ekran Resmi 2024-09-09 22 10 35" src="https://github.com/user-attachments/assets/32eb3be4-2ad5-4a7c-8dea-aea5ed930b3a">
<img width="300" alt="Ekran Resmi 2024-09-09 22 10 35" src="https://github.com/user-attachments/assets/8a1a8c10-25c3-49db-9f40-6ede3d78131e">
<img width="300" alt="Ekran Resmi 2024-09-24 00 02 07" src="https://github.com/user-attachments/assets/40866837-1dba-457e-addb-8afdf60b035d">
<img width="300" alt="Ekran Resmi 2024-09-23 23 43 13" src="https://github.com/user-attachments/assets/696ddb78-bee6-43c2-9374-702b2017aa3d">


### Technologies Used

#### Backend
The backend is built using the following technologies:

- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Web framework for Node.js to handle routing and middleware.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM library for MongoDB, making database interactions easier.

**Other Dependencies:**
- `bcrypt`: Password hashing
- `cookie-parser`: Middleware for cookie parsing
- `cors`: Middleware for enabling CORS
- `date-fns`: Date manipulation library
- `dotenv`: Environment variable management
- `jsonwebtoken`: JWT handling for authentication
- `nodemailer`: Email sending

```
json
{
  "name": "server",
  "version": "1.0.0",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "date-fns": "^4.1.0",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.9.0",
    "mongoose": "^8.6.2",
    "nodemailer": "^6.9.15"
  },
  "devDependencies": {
    "nodemon": "^3.1.5"
  }
}
```

#### Frontend
The frontend is built using the following technologies:

- React: JavaScript library for building user interfaces.
- Vite: Development server and build tool.
- Tailwind CSS: Utility-first CSS framework for styling.

Other Dependencies:

- @hookform/resolvers: React Hook Form resolvers
- @radix-ui/react-accordion: Accordion component
- @radix-ui/react-dialog: Dialog component
- @radix-ui/react-icons: Icons for Radix UI
- @radix-ui/react-slot: Slot component for Radix UI
- @radix-ui/react-toast: Toast notifications
- @tanstack/react-query: Data fetching and state management
- axios: Promise-based HTTP client
- class-variance-authority: Utility for managing class names
- clsx: Utility for constructing className strings conditionally
- date-fns: Date manipulation library
- date-fns-tz: Time zone support for date-fns
- lodash: Utility library
- lucide-react: Icons for React
- react: JavaScript library for building user interfaces
- react-datepicker: Date picker component
- react-dom: Entry point for React
- react-hook-form: Form handling library
- react-icons: SVG icon library
- react-intersection-observer: Intersection observer hooks
- react-lottie-player: Lottie animation player for React
- react-router: Declarative routing for React
- react-router-dom: DOM bindings for React Router
- react-select: Flexible and beautiful select input control
- recoil: State management library for React
- tailwind-merge: Utility for merging Tailwind CSS classes
- tailwindcss-animate: Animation utilities for Tailwind CSS
- uuid: Universally unique identifier library
- zod: Schema validation library

```
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.9.0",
    "@radix-ui/react-accordion": "^1.2.0",
    "@radix-ui/react-dialog": "^1.1.1",
    "@radix-ui/react-icons": "^1.3.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-toast": "^1.2.1",
    "@tanstack/react-query": "^5.56.2",
    "axios": "^1.7.7",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "date-fns": "^3.1.0",
    "date-fns-tz": "^3.1.3",
    "lodash": "^4.17.21",
    "lucide-react": "^0.441.0",
    "react": "^18.3.1",
    "react-datepicker": "^7.3.0",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.53.0",
    "react-icons": "^5.3.0",
    "react-intersection-observer": "^9.13.1",
    "react-lottie-player": "^2.1.0",
    "react-router": "^6.26.2",
    "react-router-dom": "^6.26.2",
    "react-select": "^5.8.0",
    "recoil": "^0.7.7",
    "tailwind-merge": "^2.5.2",
    "tailwindcss-animate": "^1.0.7",
    "uuid": "^10.0.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.9.0",
    "eslint-plugin-react": "^7.35.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.9",
    "globals": "^15.9.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.12",
    "vite": "^5.4.1"
  }
}
```

#Folders

## Frontend
- **atoms/:** Contains Recoil atoms for managing global state, such as flightFilter.js for filtering flights and selectedFlights.js for storing selected flights.
- **components/:** Includes reusable UI components like FlightTile.jsx, LoginForm.jsx, and Hero.jsx.
- **config/:** Configuration files like API routes (api.js) and navigation items (menuItems.js).
- **pages/:** Contains the main pages like Home.jsx, LoginPage.jsx, and FlightResult.jsx that represent different routes in the app.
- **services/:** Services responsible for fetching flight data (fetchFlights.js) and handling location-based data (locationService.js).
- **formSchemas/:** Zod schemas for form validation, such as login and registration schemas

## Backend
- **controller/:** Contains the core logic for handling user and flight reservation requests.
- **helpers/:** Contains utility functions like generating booking numbers, sending emails, and handling tokens.
- **models/:** MongoDB models using Mongoose for managing users and flight reservations.
- **routes/:** Defines the API routes exposed by the backend, including endpoints for flight reservations and user management.


## Project Structure
```
.
├── README.md
├── client
│   ├── README.md
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── jsconfig.json
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   └── assets
│   │       ├── airplane_with_world.svg
│   │       ├── avatar.png
│   │       ├── bookConfirmLottie.json
│   │       ├── hero-image_1.jpg
│   │       ├── hero-image_2.jpg
│   │       ├── hero-image_3.jpg
│   │       ├── loadingAnimationLottie.json
│   │       ├── logo.png
│   │       ├── logo_without_brand.png
│   │       └── scrollToTop.json
│   ├── src
│   │   ├── App.jsx
│   │   ├── assets
│   │   ├── atoms
│   │   │   ├── flightFilter.js
│   │   │   ├── selectedFlights.js
│   │   │   └── user.js
│   │   ├── components
│   │   │   ├── Avatar.jsx
│   │   │   ├── BoardingPass.jsx
│   │   │   ├── FlghtBookingForm.jsx
│   │   │   ├── FlightList.jsx
│   │   │   ├── FlightSelectionDialog.jsx
│   │   │   ├── FlightTile.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── NoFlightsFound.jsx
│   │   │   ├── ProtectedRoutes.jsx
│   │   │   ├── ReservationConfirmSuccess.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── Tab.jsx
│   │   │   ├── UserFlight.jsx
│   │   │   └── ui
│   │   ├── config
│   │   │   ├── api.js
│   │   │   ├── menuItems.js
│   │   │   └── routes.js
│   │   ├── formSchemas
│   │   │   ├── loginSchema.js
│   │   │   └── registerSchema.js
│   │   ├── helpers
│   │   │   └── validateLocationsForm.js
│   │   ├── hooks
│   │   │   ├── use-toast.js
│   │   │   └── useErrorHandler.jsx
│   │   ├── index.css
│   │   ├── layout
│   │   │   └── MainLayout.jsx
│   │   ├── lib
│   │   │   └── utils.js
│   │   ├── main.jsx
│   │   ├── pages
│   │   │   ├── BookConfirm.jsx
│   │   │   ├── FlightResult.jsx
│   │   │   ├── Flights.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── UserProfile.jsx
│   │   ├── services
│   │   │   ├── fetchFlights.js
│   │   │   └── locationService.js
│   │   └── styles
│   │       └── customSelect.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── server
    ├── controller
    │   ├── flightReservation.controller.js
    │   └── user.controller.js
    ├── helpers
    │   ├── emailController.js
    │   ├── generateBookingNumber.js
    │   ├── generateTokenAndCookie.js
    │   └── sendMail.js
    ├── lib
    │   └── db.js
    ├── middlewares
    │   └── isAuth.js
    ├── models
    │   ├── flightReservation.model.js
    │   └── user.model.js
    ├── package-lock.json
    ├── package.json
    ├── routes
    │   ├── flightReservation.route.js
    │   └── user.route.js
    ├── server.js
    └── template
        └── boardingPassTemplate.js

```


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/travel-sky.git
   cd travel-sky
    ```
   
3. Install dependencies:

  ```
  cd client 
  npm install

  cd server
  npm install
  ```
3. Set up environment variables: Create a .env file in the client and server directory:

  client .env :
  ```  
  VITE_SCHIPOL_API_ID=YOUR_SCHIPOL_API_ID
  VITE_SCHIPOL_API_KEY=YOUR_SCHIPOL_API_KEY
  VITE_SCHIPOL_API_URL=https://api.schiphol.nl/public-flights
  VITE_API_URL=YOUR_BACKEND_SERVER_URL
  ```

  server .env : 
  ```
  PORT=YOUR_PORT
  JWT_SECRET_KEY=YOUR_JWT_SECRET
  MONGO_URI=YOUR_MONGO_URI
  MAIL_USER=EMAIL_HOST_USER
  MAIL_PASSWORD=EMAIL_HOST_PASSWORD
  ```


4. Run the development server:
  ```
  cd server
  npm run start
  ```
5. Run the client
  ```
  cd client
  npm run dev
  ```

