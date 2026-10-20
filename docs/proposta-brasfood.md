# Brasfood — Projeto de remodelação do site e Portal B2B

- **Site atual:** https://brasfood.co.uk
- **Modelo:** https://bakerybrazil.co.uk

Minha proposta é transformar o brasfood.co.uk em uma plataforma digital de distribuição atacadista (B2B), com um site institucional moderno e uma área exclusiva para clientes cadastrados consultarem o catálogo de produtos.

A ideia é que supermercados, restaurantes, mercearias e outros estabelecimentos comerciais possam criar uma conta, solicitar acesso e, após aprovação da Brasfood, visualizar o catálogo.

## 1. Como funcionaria a nova plataforma

| Etapa | O que acontece |
| --- | --- |
| **Site público Brasfood** | Institucional • Produtos em destaque • Sobre nós • Cadastro |
| **Novo cliente** | Cadastro da empresa e solicitação de acesso |
| **Administrador** | Análise e aprovação do cadastro |
| **Portal exclusivo do cliente** | Catálogo digital • Busca • Categorias • Fichas de produtos |

## 2. Novo design do site

Sugiro uma identidade visual moderna, limpa e premium, mantendo a Brasfood posicionada como distribuidora profissional de alimentos brasileiros e portugueses no Reino Unido.

A estrutura do site seria:

- **Home:** apresentação da Brasfood, diferenciais, categorias e chamada para cadastro.
- **About Us:** história, infraestrutura e capacidade de distribuição.
- **Our Products:** prévia pública dos produtos, sem informações comerciais restritas.
- **Become a Customer:** cadastro para supermercados, restaurantes e distribuidores.
- **Contact:** formulário comercial e localização.
- **Customer Portal:** área restrita com login.

O site atual já apresenta produtos, um catálogo e chamadas para cadastro de atacado. Portanto, podemos aproveitar parte do conteúdo, mas reorganizar a experiência em torno da captação e aprovação de clientes.

## 3. Funcionalidades do portal do cliente

- **Cadastro comercial:** nome da empresa, responsável, e-mail, telefone, endereço, postcode, tipo de negócio e Company Number (quando aplicável).
- **Aprovação de cadastro:** o administrador recebe a solicitação e aprova ou rejeita o acesso. O cliente recebe uma notificação por e-mail.
- **Catálogo digital privado:** produtos organizados por categorias, com fotografias, marcas, unidades, embalagens, pesquisa e filtros.
- **Painel administrativo:** cadastro e edição de produtos, imagens, categorias, visibilidade, usuários e permissões.

## 4. Exemplo do painel de catálogo

```
BRASFOOD
Wholesale Portal
My Account
```

Referências visuais enviadas junto com a proposta: catálogo em grade com categorias na lateral (Pepperi), grade de produtos com selos "New" / "Out of stock" / "Coming soon", e home em blocos no estilo "Savoria". Para a v2, a referência de layout foi o template "Freshora" (vitrine de mercado).

## 5. Arquitetura técnica recomendada

Como o projeto é um portal B2B, eu faria uma aplicação com três módulos, compartilhando a mesma base de dados.

| Camada | Tecnologia |
| --- | --- |
| Site e portal | Next.js + Tailwind CSS |
| Backend | Node |
| Banco de dados | PostgreSQL |
| Autenticação | JWT |
| Armazenamento de imagens | S3 compatível |
| Deploy | Docker + Coolify |
| E-mails | Serviço SMTP/transacional |

Endpoints sugeridos: `/`, `/register`, `/login`, `/catalogue`, `/catalogue/[slug]`, `/account` e `/admin`.

O acesso ao catálogo privado precisa ser validado no backend, e não apenas ocultado no frontend. Também recomendo adequar a política de privacidade ao UK GDPR e revisar a configuração de produção, pois a página atual exibe uma mensagem de modo debug ativado.

## 6. Escopo da primeira versão (MVP)

Minha recomendação é lançar inicialmente com cadastro, aprovação, login, catálogo digital e painel administrativo. Não precisamos implementar checkout ou gestão logística agora.

O ponto principal a definir é o nível de informação comercial que o cliente terá acesso.
