import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
    name: string;
    description: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<ICategory>("Category", CategorySchema);
