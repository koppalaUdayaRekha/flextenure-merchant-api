const express = require("express");
const dashboardController = require("../controllers/dashboardController");

const router = express.Router();

// Dashboard summary
router.get("/summary", dashboardController.getSummary);

// Revenue analytics
router.get("/analytics/revenue", dashboardController.getRevenueAnalytics);

// Performance analytics
router.get("/analytics/performance", dashboardController.getPerformanceAnalytics);

module.exports = router;