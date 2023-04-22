import Joi from 'joi';
import { validatePayload } from '../../utils/payloadValidation';

const transferFundsSchema = Joi.object({
  wallet_pin: Joi.any().required().messages({
    'any.required': 'Wallet pin is required',
  }),
  recipient_customer_code: Joi.string().required().messages({
    'any.required': 'Recipient customer code is required',
  }),
  amount: Joi.number().positive().required().messages({
    'number.base': 'Amount must be a number',
    'number.positive': 'Amount must be a positive number',
    'any.required': 'Amount is required',
  }),
});

export const validateTransferFundsPayload = validatePayload(transferFundsSchema);

const updateWalletPinSchema = Joi.object({
  wallet_pin: Joi.any().required().messages({
    'any.required': 'Wallet pin is required',
  }),
  confirm_wallet_pin: Joi.any().required().valid(Joi.ref('wallet_pin')).messages({
    'any.required': 'Confirm wallet pin is required',
    'any.only': 'Wallet pins do not match',
  }),
});

export const validateUpdateWalletPinPayload = validatePayload(updateWalletPinSchema);

const walletTransactionsSchema = Joi.object({
  start_date: Joi.date().optional().messages({
    'date.base': 'Start date must be a valid date',
  }),
  end_date: Joi.date().optional().messages({
    'date.base': 'End date must be a valid date',
  }),
  type: Joi.string().optional().messages({
    'string.empty': 'Type must be a string',
  }),  
  transaction_type: Joi.string().optional().messages({
    'string.empty': 'Transaction type must be a string',
  }),
});

export const validateGetWalletTransactionsPayload = validatePayload(walletTransactionsSchema);
