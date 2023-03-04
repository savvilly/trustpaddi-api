export interface CreateVerificationCodeIProps {
    code: string;
    verifiable: string;
    expiresAt: Date;
    createdAt?: Date;
}