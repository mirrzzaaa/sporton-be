import { Request, Response } from "express";
import Bank from "../models/bank.model";

// Create Bank
export const createBank = async (req: Request, res: Response) => {
    try {
        const { bankName, accountName, accountNumber } = req.body;

        const bank = await Bank.create({
            bankName,
            accountName,
            accountNumber,
        });

        return res.status(201).json({
            success: true,
            data: bank,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getBanks = async (_req: Request, res: Response) => {
    try {
        const banks = await Bank.find();

        return res.status(200).json({
            success: true,
            data: banks,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getBankById = async (req: Request, res: Response) => {
    try {
        const bank = await Bank.findById(req.params.id);

        if (!bank) {
            return res.status(404).json({
                success: false,
                message: "Bank not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: bank,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateBank = async (req: Request, res: Response) => {
    try {
        const bank = await Bank.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!bank) {
            return res.status(404).json({
                success: false,
                message: "Bank not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: bank,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteBank = async (req: Request, res: Response) => {
    try {
        const bank = await Bank.findByIdAndDelete(req.params.id);

        if (!bank) {
            return res.status(404).json({
                success: false,
                message: "Bank not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Bank deleted successfully",
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
