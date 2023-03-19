import mongoose, { ClientSession } from 'mongoose';

/**
 * Executes a database transaction by providing a session to the provided function.
 * Rolls back the transaction on error and commits on success.
 * 
 * @param {Function} func - The function to execute within the transaction
 * 
 * @returns {Promise} A Promise that resolves when the transaction has completed successfully
 * or rejects with the error that caused the transaction to fail.
 */
export const performTransaction = async (func: (session: ClientSession) => Promise<void>) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      await func(session);
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
};
  