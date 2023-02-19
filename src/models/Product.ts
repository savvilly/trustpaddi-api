import mongoose from 'mongoose';
import { CreateProductIProps, CategoriesIProps  } from '../types/product';

const productSchema = new mongoose.Schema<CreateProductIProps>(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: CategoriesIProps,
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
            type: [],
            
        },
        contact: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        storeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Store',
        },
        inStock: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model('Product', productSchema);
