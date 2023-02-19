import mongoose from 'mongoose';
import { CreateStoreIProps } from '../types/store';

const StoreSchema = new mongoose.Schema<CreateStoreIProps>(
    {
        storeName: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        active: {
            type: Boolean,
            default: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        logo: {
            type: String,
            default: ""
        },
    }
)

export default mongoose.model('Store', StoreSchema)