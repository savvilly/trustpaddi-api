import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { SUCCESS, SERVER_ERROR, BAD_REQUEST, NOT_FOUND } from '../../utils/statusCode';
import User from '../../models/User';
import VerificationCode from '../../models/VerificationCode';
import { HydratedDocument } from 'mongoose';
import { CreateVerificationCodeIProps } from '../../types/verification-code';
import sendEmail from '../../utils/emailService';

type VerificationCodeModel = HydratedDocument<CreateVerificationCodeIProps>

/**
 * Sends a password reset code to the user's email address.
 * 
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns A JSON response indicating the status of the operation.
 */
export const sendPasswordResetCode = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(NOT_FOUND).json({ status: NOT_FOUND, message: 'User not found', success: false });
    }

    // Generate a random password reset code and save it to the database
    const resetCode = await generateAndSaveResetCode(email);

    // Send the password reset code to the user's email
    await sendResetCodeByEmail(email, resetCode);

    return res.status(SUCCESS).json({ status: SUCCESS, message: 'Password reset code sent', success: true });
  } catch (err) {
    return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: err, success: false });
  }
};

/**
 * Find a user in the database by their email address.
 * 
 * @param email The email address of the user.
 * @returns A Promise that resolves to the User object if found, or null otherwise.
 */
const findUserByEmail = async (email: string)  => {
  return await User.findOne({ email });
};

/**
 * Generate a random password reset code, hash it, and save it to the database.
 * 
 * @param email The email address of the user who requested the password reset.
 * @returns A Promise that resolves to the unhashed reset code that was generated.
 */
const generateAndSaveResetCode = async (email: string): Promise<number> => {

  // Generate a random password reset code
  const resetCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;

  // Hash the reset code before saving it to the database
  const hashedResetCode = await bcrypt.hash(resetCode.toString(), 10);

  const resetCodeDocument = new VerificationCode({
    code: hashedResetCode,
    verifiable: email,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000), // Set expiration date to 1 hour from now
  });

  await resetCodeDocument.save();

  return resetCode;
};

/**
 * Send a password reset code to a user's email address.
 * 
 * @param email The email address of the user who requested the password reset.
 * @param resetCode The unhashed password reset code to send.
 */
const sendResetCodeByEmail = async (email: string, resetCode: number) => {

  const subject =  'Password Reset Request';
  const html = `
  <p>You are receiving this email because you (or someone else) has requested a password reset for your account.</p>
  <p>Your password reset code is:</p>
  <h3>${resetCode}</h3>
  <p>Please enter this code on the website to reset your password.</p>
  <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
  `;

  await sendEmail(email, subject, html);
};

/**
 * Verifies the reset code for the given email
 * @param {string} email The user's email
 * @param {string} resetCode The reset code
 * @returns {Promise<VerificationCodeModel|null>} The reset code document or null if invalid
 */
const verifyResetCode = async (email: string, resetCode: string): Promise<VerificationCodeModel|null> => {

  const resetCodeDocuments = await VerificationCode.find({
    verifiable: email,
    expiresAt: { $gt: new Date() },
  }).sort({ createdAt: -1 });

  if (resetCodeDocuments.length === 0) {
    return null;
  }

  for (const resetCodeDocument of resetCodeDocuments) {
    const match = await bcrypt.compare(resetCode, resetCodeDocument.code);
    if (match) {
      return resetCodeDocument;
    }
  }

  return null;
};

/**
 * Update the user's password by id
 * 
 * @param {string} userId - The id of the user to update
 * @param {string} password - The new password
 * @returns {Promise<void>} - A Promise that resolves when the password is updated
 */
const updatePassword = async (userId: string, password: string): Promise<void> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.findOneAndUpdate({ _id: userId }, { password: hashedPassword });
};

/**
 * Deletes the specified verification code from the database.
 *
 * @async
 * @function
 * @param {VerificationCodeModel} verificationCode - The verification code document to delete.
 * @returns {Promise<void>} A Promise that resolves when the verification code is deleted.
 * @throws {Error} If an error occurs while deleting the verification code.
 */
const deleteVerificationCode = async (verificationCode: VerificationCodeModel): Promise<void> => {
  await verificationCode.delete();
};

/**
 * Endpoint for resetting the user's password using a code
 * 
 * @param {Request} req The request object
 * @param {Response} res The response object
 * @returns {Promise<Response>} The response object
 */
export const resetPassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, resetCode, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(NOT_FOUND).json({ status: NOT_FOUND, message: 'User not found', success: false });
    }

    const resetCodeDocument = await verifyResetCode(email, resetCode);

    if (!resetCodeDocument) {
      return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: 'Invalid or expired reset code', success: false });
    }

    await updatePassword(user._id.toString(), password);

    await deleteVerificationCode(resetCodeDocument);

    return res.status(SUCCESS).json({ status: SUCCESS, message: 'Password reset successfully', success: true });
  } catch (err) {
    return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: err, success: false });
  }
};



