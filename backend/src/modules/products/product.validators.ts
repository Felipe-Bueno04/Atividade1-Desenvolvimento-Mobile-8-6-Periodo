import { z } from 'zod';

export const productCreateSchema = z.object({
  nome: z.string().min(2).max(120),
  descricao: z.string().max(500).optional().nullable(),
  preco: z.number().positive(),
  categoria: z.enum(['HARDWARE', 'SOFTWARE', 'ACESSORIOS', 'SERVICOS', 'OUTROS']),
  estoque: z.number().int().min(0),
  ativo: z.boolean().optional().default(true),
});

export const productUpdateSchema = productCreateSchema.partial();

export const productParamsSchema = z.object({
  id: z.string().transform(Number),
});

export const productListQuerySchema = z.object({
  search: z.string().optional(),
  page: z.string().default('1').transform(Number).pipe(z.number().min(1)),
  limit: z.string().default('10').transform(Number).pipe(z.number().min(1).max(100)),
  active: z.string().optional().transform(val => val === 'true'),
});

export type ProductCreateInput = z.infer<typeof productCreateSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
export type ProductParams = z.infer<typeof productParamsSchema>;
export type ProductListQuery = z.infer<typeof productListQuerySchema>;