import mongoose from 'mongoose';
import { CreateProductIProps } from '../types/product';

const productSchema = new mongoose.Schema<CreateProductIProps>(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        contact: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true },
);

export default mongoose.model('Product', productSchema);
