import { z } from 'zod';

export const productCreateSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(120, 'Nome muito longo'),
  descricao: z.string().max(500, 'Descrição muito longa').optional().or(z.literal('')),
  preco: z.string()
    .transform(val => parseFloat(val))
    .pipe(z.number().positive('Preço deve ser maior que 0')),
  categoria: z.enum(['HARDWARE', 'SOFTWARE', 'ACESSORIOS', 'SERVICOS', 'OUTROS'], {
    errorMap: () => ({ message: 'Selecione uma categoria válida' })
  }),
  estoque: z.string()
    .transform(val => parseInt(val))
    .pipe(z.number().int('Estoque deve ser um número inteiro').min(0, 'Estoque não pode ser negativo')),
  ativo: z.boolean().default(true),
});

export type ProductCreateForm = z.infer<typeof productCreateSchema>;