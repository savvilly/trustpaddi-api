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

export class UserDTO {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
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

    constructor(data: UserProps) {
        this._id = data._id
        this.firstName = data.firstName
        this.email = data.email
        this.address = data.address
        this.active = data.active
        this.avatar = data.avatar
        this.bankAccount = data.bankAccount
        this.bankAccountName = data.bankAccountName
        this.bankName = data.bankName
        this.country = data.country
        this.state = data.state
        this.lga = data.lga
        this.createdAt = data.createdAt
        this.deleted = data.deleted
        this.customerCode = data.customerCode
        this.isKYCVerified = data.isKYCVerified
        this.phone = data.phone

    }
}