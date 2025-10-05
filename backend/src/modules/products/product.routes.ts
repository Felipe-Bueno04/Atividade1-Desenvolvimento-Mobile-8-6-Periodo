import { Router } from 'express';
import { productController } from './product.controller';

const router = Router();

router.get('/', productController.list);
router.get('/:id', productController.getById);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

export { router as productRoutes };