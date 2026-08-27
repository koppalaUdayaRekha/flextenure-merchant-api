require("dotenv").config();

const express = require("express");
const cors = require("cors");

const sequelize = require("./config/database");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const settlementRoutes = require("./routes/settlementRoutes");
const reportsRoutes = require("./routes/reportsRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/settlements", settlementRoutes);
app.use("/api/v1/reports", reportsRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FlexTenure Merchant API is running",
  });
});

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();

    console.log("MySQL database connected successfully");

    // Synchronize database tables
    await sequelize.sync();

    console.log("Database tables synchronized");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
};

startServer();