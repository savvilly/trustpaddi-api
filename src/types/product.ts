import {Types} from 'mongoose';

export interface CreateProductIProps {
    name: string;
    category: string;
    price: number;
    description: string;
    address: string;
    city: string;
    state: string;
    contact: string;
    userId: Types.ObjectId,
    image: string;
}