// test.js
const { spec } = require('pactum');

it('Deve autenticar os usuarios corretamente', async () => {
    await spec()
        .post('http://lojaebac.ebaconline.art.br/graphql')
        .withHeaders('Content-Type', 'application/json') // Adicione esta linha
        .withGraphQLQuery(`
        mutation authUser($email: String, $password: String) {
            authUser(email: $email, password: $password) {
              success
              token
            }
          }
    `)
        .withGraphQLVariables({
            email: "admin@admin.com",
            password: "admin123"
        })
        .expectStatus(200)
        .expectJson('data.authUser.success', true )
        
});