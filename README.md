# Construir um CRUD completo usando:

- **Backend**: Node + Express + Prisma (MySQL), validação com .

- **Frontend** - Expo + React Native, navegação com , formulário com  + , animação de .

Reaproveitar a estrutura e padrões do passo a passo (pastas, camadas validators → repository → service → controller → routes, tratamento de erros, etc.).

## Requisitos funcionais (o que o app deve fazer)

### PRODUTOS
- id_produto (autoincremento)
- nome (obrigatório)
- descricao (opcional)
- preco (obrigatório, positivo)
- categoria (enum, ex.: HARDWARE | SOFTWARE | ACESSORIOS | SERVICOS | OUTROS)
- estoque (inteiro ≥ 0)
- ativo (boolean; default true)
- criado_em, atualizado_em.

### API
- GET /health (igual ao projeto base).
- GET /products?search=&page=&limit=&active= — lista com busca por  e paginação.
- GET /products/:id — consulta por id.
- POST /products — cria produto (validação server-side).
- PUT /products/:id — atualiza produto (patch com validação server-side).
- DELETE /products/:id — remove produto.
 
### API MOBILE (Expo):
- Splash: animado (Moti/Expo Animated): logo/ícone piscando ou “pulse”.
- Home: com botões: “Cadastrar Produto”, “Listar Produtos”.
- CreateProductScreen: formulário com nome, descricao, preco, categoria (select), estoque (stepper/number), ativo (switch).
- ListProductsScreen: lista paginada, busca por termo, . Cada item deve exibir nome, preço, categoria e estoque.
- Feedbacks de sucesso/erro (alert/snackbar/toast) e loading quando chamando a API.

### Regras de validação (padrão Zod)
- Servidor: valida todas as entradas.
- APP: também valida (mesmas mensagens, quando fizer sentido).

### Regras mínimas:
- nome: string (2–120).
- preco: número > 0.
- categoria: enum.
- estoque: inteiro ≥ 0.
- descricao: opcional (máx. ~500).
- ativo: opcional (default true no servidor).

Especificação de payloads (exemplos) Criar produto — POST /products

```
{ 
  "nome": "Mouse Gamer X7", 
  "descricao": "RGB, 7200 DPI", 
  "preco": 129.90, "categoria": 
"ACESSORIOS", 
  "estoque": 25, 
  "ativo": true 
}
```

```
{ 
  "id_produto": 12, 
  "nome": "Mouse Gamer X7", 
  "descricao": "RGB, 7200 DPI", 
  "preco": 129.9, 
  "categoria": "ACESSORIOS", 
  "estoque": 25, 
  "ativo": true, 
  "criado_em": "2025-09-27T14:08:00Z", 
  "atualizado_em": "2025-09-27T14:08:00Z" 
}
```

## Backend — o que implementar (espelhando o guia) 
- **Modelo Prisma** (em prisma/schema.prisma) com model produtos e enum produtos_categoria.
- **Gere o client:** npx prisma generate (e se necessário db push/migrate).Crie o módulo src/modules/products/ com 5 arquivos:
- product.validators.ts —  com schemas create, update, params, list query.
- product.repository.ts — acesso direto ao Prisma (list, findById, create, update, remove).
- product.service.ts — regras de negócio (ex.: normalizar busca, tratar erros do Prisma).
- product.controller.ts — parse das entradas com Zod e respostas HTTP.
- product.routes.ts — mapeia rotas para o controller.
 
Em src/routes/index.ts: router.use('/products', productRoutes).: reutilize o HttpError e errorHandler do passo a passo.