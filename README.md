# Testes Automatizados em APIs GraphQL com PactumJS 🚀

Este projeto foi desenvolvido como parte de um estudo sobre testes de API utilizando a biblioteca **PactumJS**, focado em consultas (Queries) e autenticação (Mutations) em um ambiente GraphQL.

## 🛠️ Tecnologias Utilizadas

* **Node.js**: Ambiente de execução.
* **Mocha**: Framework de testes.
* **PactumJS**: Biblioteca principal para testes de API.
* **Pactum-matchers**: Para validações dinâmicas de tipos e estruturas (JsonMatch).

## 🧪 O que foi testado?

- [x] **Autenticação (Mutation):** Realiza o login de um usuário administrativo, valida o sucesso da operação e armazena o token JWT.
- [x] **Listagem de Usuários (Query):** Utiliza o token armazenado para listar os usuários da plataforma, validando o status code e a estrutura dos dados retornados.

## 📦 Como rodar o projeto

1. Clone o repositório (opcional para outros usuários).
2. Instale as dependências:
   ```bash
   npm install
