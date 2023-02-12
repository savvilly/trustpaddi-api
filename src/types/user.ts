import { Date, Types } from 'mongoose';

export interface UserProps {
    _id: Types.ObjectId,
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    referralCode: string;
    avatar: string;
    phone: string;
    country: string;
    state: string;
    address: string;
    lga: string;
    customerCode: string;
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