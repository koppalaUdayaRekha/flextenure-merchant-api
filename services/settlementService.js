const Settlement = require("../models/Settlement");
const BankAccount = require("../models/BankAccount");


// Get all settlements
const getSettlements = async (merchantId) => {
  const whereCondition = {};

  if (merchantId) {
    whereCondition.merchantId = merchantId;
  }

  const settlements = await Settlement.findAll({
    where: whereCondition,
    order: [["createdAt", "DESC"]]
  });

  return settlements;
};


// Get settlement by ID
const getSettlementById = async (id) => {
  const settlement = await Settlement.findByPk(id);

  return settlement;
};


// Get linked bank accounts
const getBankAccounts = async (merchantId) => {
  const whereCondition = {};

  if (merchantId) {
    whereCondition.merchantId = merchantId;
  }

  const bankAccounts = await BankAccount.findAll({
    where: whereCondition,
    order: [
      ["isPrimary", "DESC"],
      ["createdAt", "DESC"]
    ]
  });

  return bankAccounts;
};


// Request payout
const requestPayout = async ({
  merchantId,
  amount,
  bankAccountId
}) => {

  if (!merchantId) {
    throw new Error("merchantId is required");
  }

  if (!amount || Number(amount) <= 0) {
    throw new Error("Valid payout amount is required");
  }

  const bankAccount = await BankAccount.findOne({
    where: {
      id: bankAccountId,
      merchantId: merchantId,
      status: "ACTIVE"
    }
  });

  if (!bankAccount) {
    throw new Error("Active bank account not found");
  }

  const settlement = await Settlement.create({
    settlementId:
      "SETTLE-" +
      Date.now(),

    merchantId: merchantId,

    amount: amount,

    currency: "INR",

    status: "PENDING",

    bankAccountId: bankAccount.id
  });

  return settlement;
};


module.exports = {
  getSettlements,
  getSettlementById,
  getBankAccounts,
  requestPayout
};