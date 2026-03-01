import { Request, Response } from "express";
import Transaction from "../models/transaction.model";
import Product from "../models/product.model";

export const createTransaction = async (req: Request, res: Response) => {
    try {
        const transactionData = req.body;

        if (req.file) {
            transactionData.paymentProof = req.file.path;
        } else {
            res.status(400).json({ message: "Payment proof is required" });
            return;
        }

        if (typeof transactionData.purchasedItems === "string") {
            try {
                transactionData.purchasedItems = JSON.parse(transactionData.purchasedItems);
            } catch (error) {
                res.status(400).json({ message: "invalid format for purchasedItems" })
                return;
            }
        }

        //forcing status to be "pending"
        transactionData.status = "pending";

        const transaction = new Transaction(transactionData);
        await transaction.save();
        return res.status(201).json(transaction);
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getTransactions = async (_req: Request, res: Response) => {
    try {
        const transactions = await Transaction.find()
            .populate("purchasedItems.productId")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: transactions,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getTransactionById = async (req: Request, res: Response) => {
    try {
        const transaction = await Transaction.findById(req.params.id)
            .populate("purchasedItems.productId");

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: transaction,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const updateTransaction = async (
    req: Request,
    res: Response
) => {
    try {
        const { status } = req.body;

        const existingTransaction = await Transaction.findById(req.params.id);
        if (!existingTransaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            });
        }

        if (status === "paid" && existingTransaction.status !== "pending") {
            for (const item of existingTransaction.purchasedItems) {
                await Product.findByIdAndUpdate(item.productId, {
                    $inc: { stock: -item.qty },
                });
            }
        }

        const transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: transaction,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const deleteTransaction = async (req: Request, res: Response) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Transaction deleted successfully",
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
