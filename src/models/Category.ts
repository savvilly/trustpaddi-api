import mongoose from 'mongoose';
import { CategoriesIProps } from '../types/product';

const CategorySchema = new mongoose.Schema<CategoriesIProps>(
    {
        name: {
            type: String,
            required: true
        },
    },
    { timestamps: true },
)

export default mongoose.model('Category', CategorySchema)