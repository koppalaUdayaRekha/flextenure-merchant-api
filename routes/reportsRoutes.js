const express = require("express");

const router = express.Router();

const reportsController = require("../controllers/reportsController");

// Generate Statement
router.post(
  "/generate/statement",
  reportsController.generateStatement
);

// Generate Invoice
router.post(
  "/generate/invoice",
  reportsController.generateInvoice
);

// Download Report
router.get(
  "/download/:reportId",
  reportsController.downloadReport
);

// Export Settlements
router.get(
  "/export/settlements",
  reportsController.exportSettlements
);

module.exports = router;