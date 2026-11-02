# Nordeva — Loja Virtual em React

Loja virtual (SPA) com catálogo vindo de uma API simulada, busca, detalhe do
produto, carrinho compartilhado por Context API e checkout com pagamento
**apenas simulado** no navegador. Evolução do projeto `checkout-react`.

## Problema que resolve

Permite ao cliente navegar pelo catálogo, encontrar produtos, montar o próprio
carrinho e finalizar a compra, com respostas instantâneas na tela.

## Links

- Deploy: **(informar o link da Netlify/Vercel aqui)**
- Board Kanban (Trello): **(informar o link do board aqui)**

## Tecnologias e técnicas

| Tecnologia | Uso |
| --- | --- |
| React + Vite (JavaScript) | SPA, componentes funcionais, hooks |
| React Router DOM | Rota de layout (`Outlet`), rota dinâmica `/produtos/:id`, rota privada `/pagamento`, página 404 |
| Context API + custom hooks | `CarrinhoContext` + `useCarrinho` (`useMemo`/`useCallback` nos totais e funções do contexto) |
| json-server | API simulada (`db.json`) consumida com `fetch` + `useEffect` + `useState` |
| React Hook Form + Zod | Validação do formulário de pagamento |
| CSS Modules | Estilização dos componentes (`*.module.css`), mobile-first |
| Material UI | `Badge` com a quantidade de itens no Header |
| PropTypes | Validação das props dos componentes |
| Vitest | Testes unitários das regras de negócio (mesma API do Jest) |

Justificativa de dependências extras: `@emotion/react` e `@emotion/styled` são
dependências obrigatórias do `@mui/material`.

## Como executar

Pré-requisito: Node.js 18+.

```bash
npm install
npm run api    # terminal 1 — json-server em http://localhost:3001
npm run dev    # terminal 2 — aplicação em http://localhost:5173
```

Outros scripts: `npm test` (testes), `npm run build` (produção), `npm run preview`.

### Variáveis de ambiente (json-server x db.json)

| Variável | Efeito |
| --- | --- |
| `VITE_USAR_JSON_SERVER=true` | usa o json-server (`.env.development`, padrão do `npm run dev`) |
| `VITE_USAR_JSON_SERVER=false` | lê o `db.json` direto no front-end (`.env.production`, usado no deploy) |
| `VITE_API_URL` | endereço do json-server (padrão `http://localhost:3001`) |

## Mapa de rotas

| Rota | Página | Observação |
| --- | --- | --- |
| `/` | — | Redireciona para `/produtos` |
| `/produtos` | Produtos | Lista da API + busca |
| `/produtos/:id` | DetalheProduto | Lê o id com `useParams` |
| `/carrinho` | Carrinho | Itens do contexto, quantidades e total |
| `/pagamento` | Pagamento | Privada: só com itens no carrinho |
| `/sucesso` | Sucesso | Confirma e limpa o carrinho |
| `/falha` | Falha | "tentativa de golpe" + "Tentar novamente" (mantém o carrinho) |
| `*` | NaoEncontrada | 404 |

## Regra da simulação

Cartão com 16 dígitos válidos é aprovado, exceto quando **todos os dígitos são
iguais** (ex.: `1111 1111 1111 1111`): a compra vai para `/falha`.

## Estrutura

```
loja-react/
├── db.json
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx            (BrowserRouter + CarrinhoProvider)
    ├── App.jsx             (rotas)
    ├── components/         atoms · molecules · organisms · templates (Atomic Design)
    ├── pages/
    ├── routes/             RotaPrivada.jsx
    ├── contexts/           CarrinhoContext.jsx
    ├── hooks/              useCarrinho · useProdutos · usePagamento
    ├── services/           api.js
    ├── utils/              moeda · carrinho · busca · pagamento (+ __tests__)
    └── assets/styles/
```

## Testes

`npm test` executa os testes de `formatarMoeda`, `filtrarProdutos`, funções do
carrinho (`adicionarProduto`, `alterarQuantidadeItem`, totais) e
`todosDigitosIguais`, cobrindo caminhos felizes e tristes.

## Melhorias possíveis

Tema claro/escuro, busca na URL (`useSearchParams`), filtro por categoria e
ordenação por preço, carrinho persistente no `localStorage`, `useDebounce` e
testes de componente com React Testing Library.
