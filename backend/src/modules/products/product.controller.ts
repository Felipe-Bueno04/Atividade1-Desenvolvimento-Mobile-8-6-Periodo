import { Request, Response } from 'express';
import { productService } from './product.service';
import {
  productCreateSchema,
  productUpdateSchema,
  productParamsSchema,
  productListQuerySchema,
} from './product.validators';

export const productController = {
  async list(req: Request, res: Response) {
    const query = productListQuerySchema.parse(req.query);
    const result = await productService.listProducts(query);
    res.json(result);
  },

  async getById(req: Request, res: Response) {
    const { id } = productParamsSchema.parse(req.params);
    const product = await productService.getProductById(id);
    res.json(product);
  },

  async create(req: Request, res: Response) {
    const data = productCreateSchema.parse(req.body);
    const product = await productService.createProduct(data);
    res.status(201).json(product);
  },

  async update(req: Request, res: Response) {
    const { id } = productParamsSchema.parse(req.params);
    const data = productUpdateSchema.parse(req.body);
    const product = await productService.updateProduct(id, data);
    res.json(product);
  },

  async delete(req: Request, res: Response) {
    const { id } = productParamsSchema.parse(req.params);
    await productService.deleteProduct(id);
    res.status(204).send();
  },
};