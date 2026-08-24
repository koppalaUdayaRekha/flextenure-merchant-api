const express = require("express");

const settlementController = require(
    "../controllers/settlementController"
);

const router = express.Router();


// Get all settlements
router.get(
    "/",
    settlementController.getSettlements
);


// Get linked bank accounts
router.get(
    "/bank-accounts",
    settlementController.getBankAccounts
);


// Get settlement by ID
router.get(
    "/:id",
    settlementController.getSettlementById
);


// Request payout
router.post(
    "/request-payout",
    settlementController.requestPayout
);


module.exports = router;