import {Types} from 'mongoose';

export interface WalletProps {
    userId: Types.ObjectId,
    totalAmount: number,
    withdrawalAmount: number,
    trustAmount: number,
}