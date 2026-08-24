const dashboardService = require("../services/dashboardService");

// Dashboard summary
const getSummary = async (req, res) => {
  try {
    const data = await dashboardService.getSummary();

    return res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard summary"
    });
  }
};

// Revenue analytics
const getRevenueAnalytics = async (req, res) => {
  try {
    const data = await dashboardService.getRevenueAnalytics();

    return res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error("Revenue analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch revenue analytics"
    });
  }
};

// Performance analytics
const getPerformanceAnalytics = async (req, res) => {
  try {
    const data = await dashboardService.getPerformanceAnalytics();

    return res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error("Performance analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch performance analytics"
    });
  }
};

module.exports = {
  getSummary,
  getRevenueAnalytics,
  getPerformanceAnalytics
};