const Transaction = require("../models/Transaction");

// Dashboard summary
const getSummary = async () => {
  const totalTransactions = await Transaction.count();

  const successfulTransactions = await Transaction.count({
    where: {
      status: "SUCCESS"
    }
  });

  const pendingTransactions = await Transaction.count({
    where: {
      status: "PENDING"
    }
  });

  const refundedTransactions = await Transaction.count({
    where: {
      status: "REFUNDED"
    }
  });

  const transactions = await Transaction.findAll({
    attributes: ["amount", "status"]
  });

  let totalRevenue = 0;

  transactions.forEach((transaction) => {
    if (transaction.status === "SUCCESS") {
      totalRevenue += Number(transaction.amount);
    }
  });

  return {
    totalTransactions,
    successfulTransactions,
    pendingTransactions,
    refundedTransactions,
    totalRevenue
  };
};

// Revenue analytics
const getRevenueAnalytics = async () => {
  const transactions = await Transaction.findAll({
    attributes: ["amount", "status", "transactionDate"]
  });

  const revenue = {};

  transactions.forEach((transaction) => {
    if (transaction.status === "SUCCESS") {
      const date = new Date(transaction.transactionDate)
        .toISOString()
        .split("T")[0];

      if (!revenue[date]) {
        revenue[date] = 0;
      }

      revenue[date] += Number(transaction.amount);
    }
  });

  return {
    revenue
  };
};

// Performance analytics
const getPerformanceAnalytics = async () => {
  const successful = await Transaction.count({
    where: {
      status: "SUCCESS"
    }
  });

  const failed = await Transaction.count({
    where: {
      status: "FAILED"
    }
  });

  const refunded = await Transaction.count({
    where: {
      status: "REFUNDED"
    }
  });

  return {
    successful,
    failed,
    refunded
  };
};

module.exports = {
  getSummary,
  getRevenueAnalytics,
  getPerformanceAnalytics
};