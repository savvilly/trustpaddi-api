import { Types } from 'mongoose';

export interface CreateStoreIProps {
    storeName: string;
    userId: Types.ObjectId;
    createdAt?: Date;
    active?: boolean;
    logo: string
}