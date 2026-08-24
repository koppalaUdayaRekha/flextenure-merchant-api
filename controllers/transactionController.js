const transactionService = require("../services/transactionService");

// Get all transactions
const getTransactions = async (req, res) => {
    try {
        const { page, limit, status } = req.query;

        const result = await transactionService.getTransactions({
            page,
            limit,
            status
        });

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error("Get transactions error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch transactions",
            error: error.message
        });
    }
};


// Get transaction by ID
const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;

        const transaction =
            await transactionService.getTransactionById(id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        res.status(200).json({
            success: true,
            data: transaction
        });

    } catch (error) {
        console.error("Get transaction by ID error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch transaction",
            error: error.message
        });
    }
};


// Refund transaction
const refundTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        const transaction =
            await transactionService.refundTransaction(id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Transaction refunded successfully",
            data: transaction
        });

    } catch (error) {
        console.error("Refund transaction error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to refund transaction",
            error: error.message
        });
    }
};


// Get transaction receipt
const getTransactionReceipt = async (req, res) => {
    try {
        const { id } = req.params;

        const receipt =
            await transactionService.getTransactionReceipt(id);

        if (!receipt) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        res.status(200).json({
            success: true,
            data: receipt
        });

    } catch (error) {
        console.error("Get transaction receipt error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get transaction receipt",
            error: error.message
        });
    }
};


module.exports = {
    getTransactions,
    getTransactionById,
    refundTransaction,
    getTransactionReceipt
};