import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const productRepository = {
  async list({ search, page, limit, active }: { search?: string; page: number; limit: number; active?: boolean }) {
    const skip = (page - 1) * limit;
    
    const where = {
      AND: [
        search ? {
          OR: [
            { nome: { contains: search, mode: 'insensitive' } },
            { descricao: { contains: search, mode: 'insensitive' } },
          ],
        } : {},
        active !== undefined ? { ativo: active } : {},
      ],
    };

    const [products, total] = await Promise.all([
      prisma.produtos.findMany({
        where,
        skip,
        take: limit,
        orderBy: { criado_em: 'desc' },
      }),
      prisma.produtos.count({ where }),
    ]);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async findById(id: number) {
    return prisma.produtos.findUnique({
      where: { id_produto: id },
    });
  },

  async create(data: any) {
    return prisma.produtos.create({
      data: {
        ...data,
        criado_em: new Date(),
        atualizado_em: new Date(),
      },
    });
  },

  async update(id: number, data: any) {
    return prisma.produtos.update({
      where: { id_produto: id },
      data: {
        ...data,
        atualizado_em: new Date(),
      },
    });
  },

  async remove(id: number) {
    return prisma.produtos.delete({
      where: { id_produto: id },
    });
  },
};