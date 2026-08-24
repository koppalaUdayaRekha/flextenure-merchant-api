const Transaction = require("../models/Transaction");

// Get all transactions
const getTransactions = async ({
    page = 1,
    limit = 10,
    status
}) => {

    page = Number(page);
    limit = Number(limit);

    const offset = (page - 1) * limit;

    const where = {};

    if (status) {
        where.status = status;
    }

    const { count, rows } =
        await Transaction.findAndCountAll({
            where,
            limit,
            offset,
            order: [["transactionDate", "DESC"]]
        });

    return {
        transactions: rows,

        pagination: {
            page,
            limit,
            totalRecords: count,
            totalPages: Math.ceil(count / limit)
        }
    };
};


// Get transaction by ID
const getTransactionById = async (id) => {
    console.log("ID received from URL:", id);

    const transaction = await Transaction.findOne({
        where: { id: id }
    });

    console.log("Transaction found:", transaction);

    return transaction;
};


// Refund transaction
const refundTransaction = async (id) => {

    const transaction =
        await Transaction.findByPk(id);

    if (!transaction) {
        return null;
    }

    // Already refunded
    if (transaction.status === "REFUNDED") {
        return transaction;
    }

    transaction.status = "REFUNDED";
    transaction.refundAmount = transaction.amount;

    await transaction.save();

    return transaction;
};


// Get transaction receipt
const getTransactionReceipt = async (id) => {

    const transaction =
        await Transaction.findByPk(id);

    if (!transaction) {
        return null;
    }

    return {
        transactionId: transaction.transactionId,
        merchantId: transaction.merchantId,
        amount: transaction.amount,
        currency: transaction.currency,
        status: transaction.status,
        paymentMethod: transaction.paymentMethod,
        customerName: transaction.customerName,
        customerEmail: transaction.customerEmail,
        referenceId: transaction.referenceId,
        refundAmount: transaction.refundAmount,
        transactionDate: transaction.transactionDate,
        createdAt: transaction.createdAt
    };
};


module.exports = {
    getTransactions,
    getTransactionById,
    refundTransaction,
    getTransactionReceipt
};