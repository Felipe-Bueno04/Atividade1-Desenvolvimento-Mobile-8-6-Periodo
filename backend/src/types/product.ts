export type ProductCategory = 'HARDWARE' | 'SOFTWARE' | 'ACESSORIOS' | 'SERVICOS' | 'OUTROS';

export interface Product {
  id_produto: number;
  nome: string;
  descricao?: string;
  preco: number;
  categoria: ProductCategory;
  estoque: number;
  ativo: boolean;
  criado_em: string;
  atualizado_em: string;
}

export interface ProductCreate {
  nome: string;
  descricao?: string | undefined;
  preco: number;
  categoria: ProductCategory;
  estoque: number;
  ativo?: boolean | undefined;
}

export interface ProductListResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}