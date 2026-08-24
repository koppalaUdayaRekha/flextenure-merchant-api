require("dotenv").config();

const express = require("express");
const sequelize = require("./config/database");

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const settlementRoutes = require("./routes/settlementRoutes");

const app = express();


// ===============================
// Middleware
// ===============================

app.use(express.json());


// ===============================
// API Routes
// ===============================

// Authentication
app.use(
    "/api/v1/auth",
    authRoutes
);


// Transactions
app.use(
    "/api/v1/transactions",
    transactionRoutes
);


// Dashboard & Analytics
app.use(
    "/api/v1/dashboard",
    dashboardRoutes
);


// Settlements
app.use(
    "/api/v1/settlements",
    settlementRoutes
);


// ===============================
// Health Check
// ===============================

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "FlexTenure Merchant API is running"
    });

});


// ===============================
// Port
// ===============================

const PORT = process.env.PORT || 5000;


// ===============================
// Start Server
// ===============================

const startServer = async () => {

    try {

        // Test database connection
        await sequelize.authenticate();

        console.log(
            "MySQL database connected successfully"
        );


        // Synchronize database tables
        await sequelize.sync();

        console.log(
            "Database tables synchronized"
        );


        // Start Express server
        app.listen(PORT, () => {

            console.log(
                `Server running on http://localhost:${PORT}`
            );

        });

    } catch (error) {

        console.error(
            "Database connection failed:",
            error
        );

    }

};


startServer();