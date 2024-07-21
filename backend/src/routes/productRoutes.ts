import { Router } from 'express';
import { createProduct } from '../controllers/productController';

const router = Router();

router.post('products', createProduct);

export default router;