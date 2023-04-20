import { Types } from 'mongoose';

type Logo = {
    url: string;
    public_id: string;
}

export interface CreateStoreIProps {
    storeName: string;
    userId: Types.ObjectId;
    createdAt?: Date;
    active?: boolean;
    logo?: Logo
}