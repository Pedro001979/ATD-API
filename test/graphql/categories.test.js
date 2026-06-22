const { spec, request } = require('pactum');
const { any } = require('pactum-matchers');

request.setBaseUrl('http://lojaebac.ebaconline.art.br');

describe('Testes de API GraphQL - Categorias', () => {
    let token;
    let categoriaId = "1"; 

    beforeEach(async () => {
        token = await spec()
            .post('/public/authUser')
            .withJson({
                email: "admin@admin.com",
                password: "admin123"
            })
            .returns('data.token');
    });

    // 1. ADICIONAR CATEGORIA
    it('Deve adicionar uma nova categoria', async () => {
        const resposta = await spec()
            .post('/graphql')
            .withHeaders('Authorization', `Bearer ${token}`)
            .withJson({
                query: 'mutation { addCategory(name: "Automotivo", photo: "http://imagens.com/foto.jpg") { name photo } }'
            })
            .expectStatus(200)
            // Teste de Contrato usando o matcher flexível nativo do Pactum
            .expectJsonMatch({
                data: {
                    addCategory: {
                        name: any(),
                        photo: any()
                    }
                }
            });

        if (resposta.body?.data?.addCategory?.id) {
            categoriaId = resposta.body.data.addCategory.id;
        }
    });

    // 2. EDITAR CATEGORIA
    it('Deve editar uma categoria', async () => {
        await spec()
            .post('/graphql')
            .withHeaders('Authorization', `Bearer ${token}`)
            .withJson({
                query: `mutation { editCategory(id: "${categoriaId}", name: "Automotivo Alterado", photo: "http://imagens.com/foto2.jpg") { name photo } }`
            })
            .expectStatus(200);
    });

    // 3. DELETAR CATEGORIA
    it('Deve deletar uma categoria', async () => {
        await spec()
            .post('/graphql')
            .withHeaders('Authorization', `Bearer ${token}`)
            .withJson({
                query: `mutation { deleteCategory(id: "${categoriaId}") { name } }`
            })
            .expectStatus(200);
    });
});