# Brasfood — site e portal B2B (front-end)

Site institucional + portal de atacado da Brasfood (brasfood.co.uk). Next.js 16 (App Router,
Cache Components) + Tailwind CSS 4. **Esta etapa é só o front**: os dados vêm de
`src/lib/sample-data.ts` e ficam em memória até o backend Node + PostgreSQL existir.

## Rodar

```bash
npm install
npm run dev          # http://localhost:3000
```

Contas de teste (só existem nos dados de exemplo): veja `users` em `src/lib/sample-data.ts`.

## Rotas

| Rota | Quem vê | O que tem |
| --- | --- | --- |
| `/`, `/about`, `/products`, `/contact`, `/privacy` | público | site institucional; a prévia de produtos não mostra código, embalagem nem preço |
| `/become-a-customer` | público | cadastro da empresa → fica **pendente** |
| `/login` | público | login; cadastro pendente/recusado recebe mensagem própria |
| `/catalogue`, `/catalogue/[slug]`, `/account` | cliente aprovado | catálogo com busca, categorias, marca, temperatura e ficha do produto |
| `/admin/*` | admin | aprovação de cadastros, produtos (criar/editar/ocultar), categorias, clientes |

## Segurança

- Sessão em JWT (HS256, `jose`) num cookie `httpOnly`, assinado com `SESSION_SECRET`.
- `src/proxy.ts` redireciona cedo quem não tem sessão, mas **a checagem que vale** é
  `requireCustomer()` / `requireAdmin()` (`src/lib/session.ts`), chamada junto de cada leitura
  de dado restrito e no início de toda Server Action.
- Quando o backend existir, ele confere o mesmo JWT em cada endpoint: o catálogo privado é
  protegido na API, não só escondido no front.

## Ligar no backend

Cada função de `src/lib/api.ts` corresponde a um endpoint (comentado acima dela). Troque o
corpo por um `fetch(`${process.env.API_URL}/...`)` com o token da sessão; páginas e formulários
não mudam.

## Pendências com a Brasfood

- **Preço no portal:** `PORTAL_SHOW_PRICES=true` mostra o preço por caixa. Falta decidir.
- Logo oficial (SVG) e fotos dos produtos — hoje os produtos mostram o ícone da categoria.
- Textos de "About us" (história, datas, capacidade) marcados como `A CONFIRMAR`.
- Política de privacidade é rascunho: revisar para o UK GDPR antes de publicar.
- Serviço de e-mail transacional: `src/lib/email.ts` hoje só escreve no log.

## Deploy (Coolify)

- Build Pack: **Dockerfile**. Porta: **3000**.
- Variáveis (runtime, não precisam ser "Build Variable"): `SESSION_SECRET` (obrigatória),
  `PORTAL_SHOW_PRICES`, `ADMIN_NOTIFY_EMAIL`. Modelo em `.env.example`.
- Uma instância só enquanto os dados forem em memória.
