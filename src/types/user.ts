import { Date, Types } from 'mongoose';

export interface UserProps {
    _id: Types.ObjectId,
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    referral_code: string;
    avatar: string;
    phone: string;
    country: string;
    state: string;
    address: string;
    lga: string;
    customer_code: string;
    isKYCVerified?: boolean;
    deleted?: boolean;
    active?: boolean;
    createdAt?: Date
    bankAccount: string;
    bankAccountName: string
    bankName: string
}

export interface SignInProps {
    email: string;
    password: string;
}