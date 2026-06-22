const { spec, request } = require('pactum');

request.setBaseUrl('http://lojaebac.ebaconline.art.br');

describe('Testes de API GraphQL - Produtos', () => {
    let token;
    let produtoId = "1"; 

    beforeEach(async () => {
        token = await spec()
            .post('/public/authUser')
            .withJson({
                email: "admin@admin.com",
                password: "admin123"
            })
            .returns('data.token');
    });

    // 1. ADICIONAR PRODUTO
    it('Deve adicionar um novo produto', async () => {
        const resposta = await spec()
            .post('/graphql')
            .withHeaders('Authorization', `Bearer ${token}`)
            .withJson({
                query: 'mutation { addProduct(name: "Teclado Mecanico", description: "RGB Switch Blue", price: 299.90, quantity: 10, visible: true) { name description price quantity visible } }'
            })
            .expectStatus(200);

        if (resposta.body?.data?.addProduct?.id) {
            produtoId = resposta.body.data.addProduct.id;
        }
    });

    // 2. EDITAR PRODUTO
    it('Deve editar um produto existente', async () => {
        await spec()
            .post('/graphql')
            .withHeaders('Authorization', `Bearer ${token}`)
            .withJson({
                query: `mutation { editProduct(id: "${produtoId}", name: "Teclado Alterado", description: "Nova descricao", price: 250.00, quantity: 5, visible: true) { name price } }`
            })
            .expectStatus(200);
    });

    // 3. DELETAR PRODUTO
    it('Deve deletar um produto existente', async () => {
        await spec()
            .post('/graphql')
            .withHeaders('Authorization', `Bearer ${token}`)
            .withJson({
                query: `mutation { deleteProduct(id: "${produtoId}") { name } }`
            })
            .expectStatus(200);
    });
});