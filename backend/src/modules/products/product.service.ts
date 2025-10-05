import { productRepository } from './product.repository';
import { HttpError } from '../../errors/HttpError';

export const productService = {
  async listProducts(query: any) {
    try {
      return await productRepository.list(query);
    } catch (error) {
      throw new HttpError(500, 'Erro ao listar produtos');
    }
  },

  async getProductById(id: number) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new HttpError(404, 'Produto não encontrado');
    }
    return product;
  },

  async createProduct(data: any) {
    try {
      return await productRepository.create(data);
    } catch (error) {
      throw new HttpError(500, 'Erro ao criar produto');
    }
  },

  async updateProduct(id: number, data: any) {
    await this.getProductById(id); // Verifica se existe
    
    try {
      return await productRepository.update(id, data);
    } catch (error) {
      throw new HttpError(500, 'Erro ao atualizar produto');
    }
  },

  async deleteProduct(id: number) {
    await this.getProductById(id); // Verifica se existe
    
    try {
      return await productRepository.remove(id);
    } catch (error) {
      throw new HttpError(500, 'Erro ao deletar produto');
    }
  },
};