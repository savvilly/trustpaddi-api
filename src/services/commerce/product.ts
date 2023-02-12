import { Request, Response } from 'express';
import Product from '../../models/Product';
import { NOT_CREATED, CREATED, SERVER_ERROR } from '../../utils/statusCode';
import { CreateProductIProps } from '../../types/product';

export const createProduct = async (req: Request, res: Response) => {
    const { name, category, price, description, address, city, state, contact, image, userId } = req.body;
    try {
        const newProduct: CreateProductIProps = {
            name, category, price, description, address, city, state, contact, image, userId
        }
        const result = await Product.create(newProduct)
        if (result) {
            return res.status(CREATED).json({ status: CREATED, message: 'Product  created', success: true, payload: result });
        }
    } catch (error) {
        return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
    }
}