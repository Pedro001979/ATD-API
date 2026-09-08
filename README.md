# API Test Automation — GraphQL + PactumJS

![JavaScript](https://img.shields.io/badge/JavaScript-100%25-F7DF1E?logo=javascript&logoColor=black)
![PactumJS](https://img.shields.io/badge/PactumJS-API%20Testing-6C63FF)
![Mocha](https://img.shields.io/badge/Mocha-Test%20Runner-8D6748?logo=mocha&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue)

> API automation project demonstrating functional and integration testing of GraphQL endpoints with authentication and response validation.

## Overview

This project uses **PactumJS** and **Mocha** to automate GraphQL API scenarios. The suite focuses on authentication flows, JWT handling, query validation and structured response assertions.

## Scenarios

- **Authentication mutation** — validates successful administrative login and JWT token retrieval.
- **Authenticated query** — uses the token to access protected user data.
- **Response validation** — checks status codes, response structure and expected fields.
- **Reusable setup** — demonstrates authentication through Mocha hooks for dependent scenarios.

## Tech Stack

| Technology | Purpose |
|---|---|
| PactumJS | API automation and assertions |
| Mocha | Test runner |
| pactum-matchers | Dynamic response validation |
| Node.js | Runtime |
| GraphQL | API technology under test |

## Getting Started

### Requirements

- Node.js 14+ (or a current LTS version)
- npm or yarn
- Access to the GraphQL API environment used by the tests

### Installation

```bash
git clone https://github.com/Pedro001979/ATD-API.git
cd ATD-API
npm install
```

### Run tests

```bash
npm test
```

For verbose Mocha output:

```bash
npm test -- --reporter spec
```

## Example

A typical PactumJS scenario validates an authenticated GraphQL operation by combining the request body, authorization header and expected response structure:

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

## QA Engineering Focus

This repository highlights skills in:

- API functional testing
- GraphQL testing
- Authentication and JWT flows
- Contract/response validation
- Test organization and reusable setup
- JavaScript-based automation

## Author

**Pedro Ricardo**  
QA Automation | JavaScript | API Testing | Cypress | Appium

[![GitHub](https://img.shields.io/badge/GitHub-Pedro001979-181717?logo=github)](https://github.com/Pedro001979)

## License

ISC
