const settlementService = require("../services/settlementService");


// Get all settlements
const getSettlements = async (req, res) => {
  try {
    const merchantId = req.query.merchantId || req.body.merchantId;

    const settlements = await settlementService.getSettlements(
      merchantId
    );

    return res.status(200).json({
      success: true,
      data: {
        settlements
      }
    });

  } catch (error) {
    console.error("Get settlements error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get settlement by ID
const getSettlementById = async (req, res) => {
  try {
    const { id } = req.params;

    const settlement =
      await settlementService.getSettlementById(id);

    if (!settlement) {
      return res.status(404).json({
        success: false,
        message: "Settlement not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: settlement
    });

  } catch (error) {
    console.error("Get settlement by ID error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get linked bank accounts
const getBankAccounts = async (req, res) => {
  try {
    const merchantId = req.query.merchantId || req.body.merchantId;

    const bankAccounts =
      await settlementService.getBankAccounts(
        merchantId
      );

    return res.status(200).json({
      success: true,
      data: {
        bankAccounts
      }
    });

  } catch (error) {
    console.error("Get bank accounts error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Request payout
const requestPayout = async (req, res) => {
  try {
    const {
      merchantId,
      amount,
      bankAccountId
    } = req.body;

    const settlement =
      await settlementService.requestPayout({
        merchantId,
        amount,
        bankAccountId
      });

    return res.status(201).json({
      success: true,
      message: "Payout requested successfully",
      data: settlement
    });

  } catch (error) {
    console.error("Request payout error:", error);

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  getSettlements,
  getSettlementById,
  getBankAccounts,
  requestPayout
};