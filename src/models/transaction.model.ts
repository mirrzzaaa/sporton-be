import mongoose, { Schema, Document } from "mongoose";

export interface IPurchasedItem {
    productId: mongoose.Types.ObjectId;
    qty: number;
}

export interface ITransaction extends Document {
    paymentProof: string;
    status: "pending" | "paid" | "rejected";
    purchasedItems: IPurchasedItem[];
    totalPayment: number;
    customerName: string;
    customerContact: string;
    customerAddress: string;
    createdAt: Date;
    updatedAt: Date;
}

const PurchasedItemSchema = new Schema<IPurchasedItem>(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product", // pastikan ada Product model
            required: true,
        },
        qty: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    { _id: false } // supaya tidak generate _id untuk setiap item
);

const TransactionSchema = new Schema<ITransaction>(
    {
        paymentProof: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "paid", "rejected"],
            default: "pending",
        },
        purchasedItems: {
            type: [PurchasedItemSchema],
            required: true,
        },
        totalPayment: {
            type: Number,
            required: true,
            min: 0,
        },
        customerName: {
            type: String,
            required: true,
        },
        customerContact: {
            type: String,
            required: true,
        },
        customerAddress: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<ITransaction>(
    "Transaction",
    TransactionSchema
);
