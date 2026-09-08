# Automação de Testes de API — GraphQL + PactumJS

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black)
![PactumJS](https://img.shields.io/badge/PactumJS-API%20Testing-6C63FF)
![Mocha](https://img.shields.io/badge/Mocha-Test%20Runner-8D6748?logo=mocha&logoColor=white)

## Sobre o projeto

Suíte de **automação de testes de API** criada para validar operações GraphQL, autenticação e respostas de serviços.

O foco está na validação funcional da API e na criação de cenários independentes, legíveis e reutilizáveis.

## Cenários validados

- Autenticação e obtenção de token JWT
- Execução de operações GraphQL autenticadas
- Validação de status e estrutura das respostas
- Verificação de campos esperados
- Reutilização de autenticação através de hooks
- Organização de cenários para manutenção da suíte

## Stack

| Tecnologia | Utilização |
|---|---|
| PactumJS | Automação e asserções de API |
| GraphQL | Tecnologia da API sob teste |
| Mocha | Execução dos testes |
| pactum-matchers | Validações dinâmicas |
| Node.js | Ambiente de execução |

## Exemplo de validação

```javascript
await pactum
  .spec()
  .post('/graphql')
  .withHeaders('Authorization', `Bearer ${authToken}`)
  .withBody({
    query: `query { usuarios { id nome email } }`
  })
  .expectStatus(200)
  .expectBodyContains('usuarios');
```

## Execução

```bash
git clone https://github.com/Pedro001979/ATD-API.git
cd ATD-API
npm install
npm test
```

## Competências demonstradas

- Testes funcionais de API
- Testes GraphQL
- Autenticação e JWT
- Validação de contratos e respostas
- Automação com JavaScript
- Organização e reutilização de cenários

## Autor

**Pedro Ricardo**  
QA Automation | API Testing | JavaScript | Cypress | Appium

[GitHub](https://github.com/Pedro001979) · [LinkedIn](https://www.linkedin.com/in/pedro-ricardo-6a3b76236/)

---

Licença: ISC
