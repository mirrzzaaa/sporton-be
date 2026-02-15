import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    stock: number;
    price: number;
    imageUrl: string;
    category: mongoose.Types.ObjectId;
}

const productSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: true,
            min: 0
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        imageUrl: {
            type: String,
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);
