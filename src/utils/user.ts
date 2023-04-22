import crypto from 'crypto';
import User from '../models/User';

/**
 * Check if a given customer code is unique
 * 
 * @param {string} customerCode
 * @returns {Promise<boolean>}
 */
export const isCustomerCodeUnique = async (customerCode: string): Promise<boolean> => {
    const existingUser = await User.findOne({ customerCode });
    return !existingUser;
};

/**
 * Generates a random string of the specified length, consisting of lowercase hexadecimal characters.
 * 
 * @param {number} length 
 * @returns {string} 
 */
export const generateRandomString = (length: number): string => {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length).toLowerCase();
};

/**
 * Generate a unique customer code by combining the first name with a random string.
 * 
 * @param {string} firstName 
 * @returns {Promise<string>}
 */
export const generateCustomerCode = async (firstName: string): Promise<string> => {
    let customerCode = `${firstName}-${generateRandomString(5)}`.toLowerCase();

    let codeIsUnique = await isCustomerCodeUnique(customerCode);
    while (!codeIsUnique) {
        customerCode = `${firstName}-${generateRandomString(5)}`.toLowerCase();
        codeIsUnique = await isCustomerCodeUnique(customerCode);
    }
    return customerCode;
};


