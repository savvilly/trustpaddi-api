import { Request, Response, NextFunction } from 'express';
import Product from '../../models/Product';
import { SUCCESS, CREATED, SERVER_ERROR, BAD_REQUEST } from '../../utils/statusCode';
import { CreateProductIProps } from '../../types/product';
import User from '../../models/User';

export const createProduct = async (req: Request, res: Response) => {
    const { name, category, price, description, address, city, state, contact, image, storeId, draft, inStock } = req.body;
    const userId = req.user.userId
    const newProduct: CreateProductIProps = {
        storeId, name, category, price, description, address, city, state, contact, image, userId, draft, inStock
    }
    try {
        const result = await Product.create(newProduct)
        if (result) {
            return res.status(CREATED).json({ status: CREATED, message: 'Product created', success: true, payload: result });
        }
    } catch (error) {
        return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
    }
}

export const updateProduct = (req: Request, res: Response) => {
    const { name, category, price, description, address, city, state, contact, image, draft, inStock, productId } = req.body;
    const userId = req.user.userId
    const editedProduct: CreateProductIProps = {
        name, category, price, description, address, city, state, contact, image, userId, draft, inStock
    }
    Product.findOneAndUpdate({ _id: productId, userId: userId }, editedProduct, async (err: unknown, data: unknown) => {
        if (data === null || !data) {
            return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: `product id ${productId} not found or access denied`, success: false });
        } else if (err) {
            return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: err, success: false });
        } else {
            let result = await Product.find({})
            return res.status(SUCCESS).json({ status: SUCCESS, message: 'Product updated', success: true, payload: result });
        }
    })
}


export const deleteProduct = (req: Request, res: Response) => {
    const { productId } = req.params
    const userId = req.user.userId
    Product.findOneAndDelete({ _id: productId, userId: userId }, async (err: unknown, data: unknown) => {
        if (data === null || !data) {
            return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: `product id ${productId} not found or access denied`, success: false });
        } else if (err) {
            return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: err, success: false });
        } else {
            let result = await Product.find({})
            return res.status(SUCCESS).json({ status: SUCCESS, message: 'Product deleted', success: true, payload: result });
        }
    })
}


export const setProductStockStatus = async (req: Request, res: Response): Promise<Response> => {
    const { productId, inStock } = req.body
    const userId = req.user.userId
    try {
        const product = await Product.findOne({ _id: productId, userId: userId })
        if (!product) {
            return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: `No product found for ${productId} or access denied`, success: false });
        }
        const updatedProduct = await Product.findByIdAndUpdate({ _id: productId }, { inStock: inStock })
        if (updatedProduct) {
            return res.status(CREATED).json({ status: CREATED, message: 'Product in-stock updated', success: true });
        }
    } catch (error) {
        return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
    }
}


export const setProductDraft = async (req: Request, res: Response): Promise<Response> => {
    const { productId, draft } = req.body
    const userId = req.user.userId
    try {
        const product = await Product.findOne({ _id: productId, userId: userId })
        if (!product) {
            return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: `No product found for ${productId} or access denied`, success: false });
        }
        const updatedProduct = await Product.findByIdAndUpdate({ _id: productId }, { draft: draft })
        if (updatedProduct) {
            return res.status(CREATED).json({ status: CREATED, message: 'Product draft updated', success: true });
        }
    } catch (error) {
        return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
    }
}


export const getAllProductsVendor = async (req: Request, res: Response) => {
    const { storeId } = req.params
    const userId = req.user.userId
    Product.find({ storeId: storeId, userId: userId }, async (err: unknown, data: unknown) => {
        if (data === null || !data) {
            return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: `store id ${storeId} not found or access denied`, success: false });
        } else if (err) {
            return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: err, success: false });
        } else {
            return res.status(SUCCESS).json({ status: SUCCESS, message: 'ok', success: true, payload: data });
        }
    })
}


export const getAllProductUser = async (req: Request, res: Response): Promise<Response> => {
    const { storeId } = req.params
    try {
        const result = await Product.find({ storeId: storeId, draft: false })
        return res.status(SUCCESS).json({ status: SUCCESS, message: 'ok', success: true, payload: result });
    } catch (error) {
        return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: error, success: false });
    }
}

export const getSingleProductByIdVendor = async (req: Request, res: Response) => {
    const { productId } = req.params
    const userId = req.user.userId
    Product.findOne({ _id: productId, userId: userId }, async (err: unknown, data: unknown) => {
        if (data === null || !data) {
            return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: `product id ${productId} not found`, success: false });
        } else if (err) {
            return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: err, success: false });
        } else {
            return res.status(SUCCESS).json({ status: SUCCESS, message: 'Product updated', success: true, payload: data });
        }
    })
}

export const getSingleProductByIdUser = async (req: Request, res: Response) => {
    const { productId } = req.params
    Product.findOne({ _id: productId, draft: false }, async (err: unknown, data: unknown) => {
        if (data === null || !data) {
            return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: `product id ${productId} not found or product not available but in draft`, success: false });
        } else if (err) {
            return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: err, success: false });
        } else {
            return res.status(SUCCESS).json({ status: SUCCESS, message: 'Product updated', success: true, payload: data });
        }
    })
}


export const transferProductToStore = (req: Request, res: Response) => {
    const { productId, storeId } = req.body
    Product.findOneAndUpdate({ _id: productId }, { storeId: storeId }, (err: unknown, data: unknown) => {
        if (data === null || !data) {
            return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: `No product found for ${productId}`, success: false });
        } else if (err) {
            return res.status(SERVER_ERROR).json({ status: SERVER_ERROR, message: err, success: false });
        } else {
            return res.status(SUCCESS).json({ status: SUCCESS, message: 'Product transferred', success: true });
        }
    })
}

