
# Car Management Web Application

## Overview

This Car Management Web Application enables users to manage their car inventory by adding, viewing, editing, and deleting cars. Each car entry includes images, a title, description, and customizable tags. Additionally, the application supports user authentication, with each user having access only to their own entries, and a search functionality for easy retrieval of specific car records.

### Objectives

- **User Authentication**: Users can register, log in, and manage only their car entries.
- **Car Management**: Users can add cars with detailed information and images, view a list of their cars, and update or delete specific entries.
- **Search Functionality**: Users can perform global searches across all fields (title, description, tags) for easy navigation.
- **API Documentation**: Comprehensive documentation via Swagger.

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB (for data storage), JWT (for authentication).
- **Frontend**: React (for user interface), Axios (for HTTP requests).
- **API Documentation**: Swagger.
- **Deployment**: Hosted on cloud service (e.g., Heroku/Vercel).

## Project Structure

```plaintext
CAR-MANAGEMENT-WEB-APP/
├── BACKEND/
│   ├── index.js                 # Main server file
│   ├── config/
│   │   └── db.js                # Database connection setup
│   ├── controllers/
│   │   └── carController.js     # Logic for car-related endpoints
│   ├── middlewares/
│   │   └── fetchuser.js         # Middleware for user authentication
│   ├── models/
│   │   ├── Car.js               # Car model schema
│   │   └── user.js              # User model schema
│   ├── routes/
│   │   ├── auth.js              # Routes for authentication
│   │   └── carRoutes.js         # Routes for car operations
│   └── swagger.js               # Swagger API documentation
└── frontend/
    ├── src/
    │   ├── components/          # UI Components for React
    │   ├── pages/               # Pages like Login, Signup, Car List
    │   └── services/            # Axios services for API calls
    └── public/
        └── index.html           # Main HTML file for frontend
```

## Setup and Installation

1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/apru02/CAR-MANAGEMENT-WEB-APP
   ```
2. **Backend Setup**:
   - Navigate to the backend folder:
     ```bash
     cd CAR-MANAGEMENT-WEB-APP/BACKEND
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Configure environment variables in a `.env` file for database and JWT secret:
     ```plaintext
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
   - Start the server:
     ```bash
     npm start
     ```

3. **Frontend Setup**:
   - Navigate to the frontend folder:
     ```bash
     cd CAR-MANAGEMENT-WEB-APP/frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend application:
     ```bash
     npm start
     ```

## API Documentation

Access the API documentation at `/api/docs` (enabled via Swagger). Below is a summary of available routes:

1. **User Authentication**
   - `POST /api/auth/signup`: Register a new user.
   - `POST /api/auth/login`: Authenticate user and obtain a token.

2. **Car Management**
   - `POST /api/cars`: Create a new car entry.
   - `GET /api/cars`: List all cars created by the authenticated user.
   - `GET /api/cars/:id`: Retrieve details of a specific car.
   - `PUT /api/cars/:id`: Update car details (title, description, tags, images).
   - `DELETE /api/cars/:id`: Delete a car entry.

3. **API Documentation Access**
   - `GET /api/docs`: Redirects to Swagger documentation with all API details.

## Deployment

The application is hosted at [Deployment Link Here].

---
