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
        logo: {
            url: {
                type: String,
                default: ""
            },
            public_id: {
                type: String,
                default: ""
            }
        },
        
    },
    { timestamps: true },
)

export default mongoose.model('Store', StoreSchema)