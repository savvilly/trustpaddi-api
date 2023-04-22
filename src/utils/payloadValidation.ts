import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

// Utility function for validating payload with Joi
export const validatePayload = (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction): Response | void => {
  const data = { ...req.query, ...req.body };
  const { error } = schema.validate(data, { abortEarly: false });

  if (error) {
    const errorMessages: Record<string, string> = {};
    for (const detail of error.details) {
      errorMessages[detail.context!.key!] = detail.message;
    }
    return res.status(400).json({ status: 400, message: errorMessages, success: false });
  } else {
    next();
  }
};