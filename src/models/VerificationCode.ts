import mongoose, { Model } from 'mongoose';
import { CreateVerificationCodeIProps } from '../types/verification-code';

type VerificationCodeModel = Model<CreateVerificationCodeIProps>;

const VerificationCodeSchema = new mongoose.Schema<CreateVerificationCodeIProps>(
    {
        code: { 
            type: String, 
            required: true 
        },

        verifiable: { 
            type: String, 
            required: true 
        },

        expiresAt: { 
            type: Date, 
            required: true 
        },
    },

    { timestamps: true },
)

export default mongoose.model<CreateVerificationCodeIProps, VerificationCodeModel>('VerificationCode', VerificationCodeSchema)