
export interface UserProps {
    _id: Object;
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
}

export interface SignInProps {
    email: string;
    password: string;
}