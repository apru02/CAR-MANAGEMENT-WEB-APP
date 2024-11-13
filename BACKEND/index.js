const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const { swaggerUi, swaggerDocs } = require('./swagger'); 

// Connect to MongoDB
connectDB();
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/cars", require("./routes/carRoutes"));

// Start the server
app.get('/', (req, res) => {
  res.send('Welcome to Car Management System APIs');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});