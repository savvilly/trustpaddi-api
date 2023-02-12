import checkAuth from '../middleware/checkAuth';
import { createProduct } from '../services/commerce/product';
import { Router } from 'express';
const commerceRouter = Router();
import { createProductValidation } from "../middleware/validation/index"

commerceRouter.get('/commerce_create_product', checkAuth, createProductValidation, createProduct);


export default commerceRouter;
