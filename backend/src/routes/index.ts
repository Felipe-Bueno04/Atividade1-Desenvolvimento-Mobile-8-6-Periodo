import { Router } from 'express';
import { productRoutes } from '../modules/products/product.routes';

const router = Router();

router.use('/products', productRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

export { router };