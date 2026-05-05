# Testes em APIs GraphQL com PactumJS

[![GitHub License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
![JavaScript](https://img.shields.io/badge/JavaScript-100%25-yellow.svg)
![Status](https://img.shields.io/badge/status-Active-brightgreen.svg)

## 📋 Descrição

Este projeto contém testes automatizados para APIs GraphQL utilizando o framework **PactumJS**. O objetivo é demonstrar como realizar testes eficientes e confiáveis em endpoints GraphQL, incluindo validação de esquemas, respostas e comportamentos. O foco está em **consultas (Queries)** e **autenticação (Mutations)**.

## 🎯 Objetivos

- ✅ Testar endpoints GraphQL com PactumJS
- ✅ Validar respostas GraphQL utilizando matchers
- ✅ Implementar testes de integração com autenticação
- ✅ Demonstrar boas práticas em testes de API GraphQL

## 🧪 O que foi testado?

- [x] **Autenticação (Mutation):** Realiza o login de um usuário administrativo, valida o sucesso da operação e armazena o token JWT.
- [x] **Listagem de Usuários (Query):** Utiliza o token armazenado para listar os usuários da plataforma, validando o status code e a estrutura dos dados retornados.

## 📦 Tecnologias Utilizadas

- **PactumJS** (v3.9.1) - Framework principal para testes de API
- **Mocha** (v11.7.5) - Test runner
- **pactum-matchers** (v1.2.0) - Validadores customizados para validações dinâmicas (JsonMatch)
- **Node.js** - Runtime JavaScript

## 🚀 Início Rápido

### Pré-requisitos

- Node.js (v14.x ou superior)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Pedro001979/Testes-em-APIs-GraphQL-com-PactumJS.git

# Navegue até o diretório do projeto
cd Testes-em-APIs-GraphQL-com-PactumJS

# Instale as dependências
npm install
```

### Executando os Testes

```bash
# Executar todos os testes
npm test

# Executar testes com modo verbose
npm test -- --reporter spec

# Executar teste específico
npx mocha ./test/graphql/seu-arquivo.test.js
```

## 📁 Estrutura do Projeto

```
Testes-em-APIs-GraphQL-com-PactumJS/
├── test/
│   └── graphql/              # Testes GraphQL
│       ├── *.test.js         # Arquivos de teste
│       └── README.md         # Documentação dos testes
├── package.json              # Dependências e scripts
├── README.md                 # Este arquivo
└── ...
```

## 📝 Exemplos de Uso

### Teste de Autenticação (Mutation)

```javascript
const pactum = require('pactum');

describe('GraphQL Authentication', () => {
  it('deve fazer login com sucesso', async () => {
    const response = await pactum
      .spec()
      .post('http://seu-graphql-api.com/graphql')
      .withBody({
        query: `
          mutation {
            login(email: "admin@example.com", password: "senha123") {
              token
              usuario {
                id
                nome
              }
            }
          }
        `
      })
      .expectStatus(200)
      .expectJsonMatch({
        data: {
          login: {
            token: pactum.like('jwt-token-aqui'),
            usuario: {
              id: pactum.like('123'),
              nome: pactum.like('Admin')
            }
          }
        }
      });
    
    // Armazenar token para próximos testes
    const token = response.json.data.login.token;
  });
});
```

### Teste de Listagem com Autenticação (Query)

```javascript
const pactum = require('pactum');

describe('GraphQL Queries', () => {
  let authToken;

  before(async () => {
    // Obter token de autenticação
    const loginResponse = await pactum
      .spec()
      .post('http://seu-graphql-api.com/graphql')
      .withBody({
        query: `mutation { login(email: "admin@example.com", password: "senha123") { token } }`
      })
      .expectStatus(200);
    
    authToken = loginResponse.json.data.login.token;
  });

  it('deve listar usuários com token válido', async () => {
    await pactum
      .spec()
      .post('http://seu-graphql-api.com/graphql')
      .withHeaders('Authorization', `Bearer ${authToken}`)
      .withBody({
        query: `
          query {
            usuarios {
              id
              nome
              email
            }
          }
        `
      })
      .expectStatus(200)
      .expectBodyContains('usuarios')
      .inspect();
  });
});
```

## 🧪 Dependências

| Pacote | Versão | Propósito |
|--------|--------|----------|
| pactum | ^3.9.1 | Framework principal para testes de API |
| pactum-matchers | ^1.2.0 | Validadores customizados e JsonMatch |
| mocha | ^11.7.5 | Test runner |

## 💡 Dicas Úteis

- Use `pactum-matchers` para validações complexas de respostas GraphQL
- Reutilize tokens de autenticação em múltiplos testes usando `before()` hooks
- Organize seus testes por funcionalidade em subdiretórios
- Utilize `beforeEach` e `afterEach` para setup/teardown
- Implemente helpers para queries GraphQL reutilizáveis

## 🔗 Recursos Úteis

- [Documentação PactumJS](https://pactumjs.github.io/)
- [Documentação GraphQL](https://graphql.org/)
- [Mocha Documentation](https://mochajs.org/)
- [Pactum Matchers](https://pactumjs.github.io/advanced/matchers.html)

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 👤 Autor

**Pedro Ricardo**

- GitHub: [@Pedro001979](https://github.com/Pedro001979)

## 📄 Licença

Este projeto está licenciado sob a Licença ISC - veja o arquivo LICENSE para detalhes.

---

**Última atualização:** 05/05/2026
