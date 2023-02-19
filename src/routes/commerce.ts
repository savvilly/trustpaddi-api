import checkAuth from '../middleware/checkAuth';
import { createProduct } from '../services/commerce/product';
import { createStore } from '../services/commerce/store';
import { Router } from 'express';
const commerceRouter = Router();
import { createProductValidation, createStoreValidation } from "../middleware/validation/index"

commerceRouter.post('/commerce_create_product', checkAuth, createProductValidation, createProduct);
commerceRouter.post('/commerce_create_Store', checkAuth, createStoreValidation, createStore);

export default commerceRouter;
