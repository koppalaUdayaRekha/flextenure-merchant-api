const express = require("express");
const transactionController = require("../controllers/transactionController");

const router = express.Router();

// Get all transactions
router.get("/", transactionController.getTransactions);

// Get transaction by ID
router.get("/:id", transactionController.getTransactionById);

// Refund transaction
router.post("/:id/refund", transactionController.refundTransaction);

// Get transaction receipt
router.get("/:id/receipt", transactionController.getTransactionReceipt);

module.exports = router;