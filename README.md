# slug-store-API# <p align = "center"> API SlugStore </p>

<p align="center">
   <img src="https://www.cora.com.br/blog/wp-content/uploads/2021/08/api-open-banking.png"/>
   <img src="https://static.wikia.nocookie.net/slugterra/images/b/bb/Burpy.PNG/revision/latest?cb=20130703232921&path-prefix=pt-br"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-SergioTrajano-4dae71?style=flat-square" />
   <img src="https://img.shields.io/badge/author-HannahEbb-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/SergioTrajano/slug-store?color=4dae71&style=flat-square" />
</p>


##  :clipboard: Descrição

API do e-commerce SlugStore. A partir dela é possivel realizar cadastro e login, adicionar produtos ao carrinho. Cadastrar produtos e realizar compras.

***

## :computer:	 Tecnologias e Conceitos

- REST APIs
- JWTs & refresh tokens
- Node.js
- JavaScript
- MongoDB with Mongoose

***

## :rocket: Rotas

```yml
POST /users
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body:{
        "nome": "Lorem ipsum",
        "email": "lorem@gmail.com",
        "senha": "loremipsum"
    }
    - response: retorna statusCode 422 para body invalido;
                retorna statusCode 409 caso o email já esteja em uso;
                retorna statusCOde 201 para cadastro realizado com sucesso;
```
    
```yml 
GET /users
    - Rota para fazer login
    - headers: {}
    - body: {
         "email": "lorem@gmail.com",
         "senha": "loremipsum"
    }
    - response: retorna statusCode 422 caso o body seja invalido;
                retorna statusCode 404 para email invalido;
                retorna statusCode 403 para senha invalida;
                retorna statusCode 200 e um objeto no formato { name: "nome-do-usuario", token: "token-do-usuario" }
```
    
Todas rotas autenticadas retornam statusCode 422 para headers invalido!

```yml 
PUT /cart (autenticada)
    - Rota adicionar todo um carrinho ao banco de dados, quando o usuario tem itens no carrinho e faz login.
    - headers: { "Authorization": "Bearer $token" }
    - body: array com os itens do carrinho
    - response: retorna statusCode 200 e o carrinho atualizado;
```

```yml
PUT /cart/add (autenticada)
    - Rota para adicionar itens ao carrinho;
    - headers: { "Authorization": "Bearer $token" }
    - body: objeto com os dados do produto;
    - response: retorna statusCode 404 caso o usuario não possua carrinho cadastrado;
                retorna sttusCode 200 e um array com os dados do carrinho atualizado;
``` 

```yml
DELETE /cart/:item (autenticada)
    - Rota para excluir item do carrinho;
    - headers: { "Authorization": "Bearer $token" }
    - body: {};
    - response: retorna statusCode 404 caso não exista carrinho com o id especificado;
                retorna statusCode 200 e um array que representa o carrinho atualizado;
```
 
```yml
DELETE /cart (autenticada)
    - Rota para esvaziar o carrinho do usuario;
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: retorna statusCode 404 caso o usuario não possua carrinho cadastrado;
                retorna statusCode 200 para carrinho esvaziado com sucesso;
```
 
```yml
POST /order (autenticada)
    - Rota para deletar um usuário pelo id
    - headers: { "Authorization": "Bearer $token" }
    - body: {
          itens: array com itens a serem comprados,
          valor: total da compra,
          formaPagamento: modalidade de pagamento (credito ou debito),
          paymentData: {
              numero: numero do cartão,
              codigo: codigo de segurança do cartão,
              validade: validade do cartão,
          },
    }
    response: retorna statusCode 200 para compra realizada;
```

```yml
POST /products
    - Rota para cadastrar um produto;
    - headers: { "Authorization": "Bearer $token" }
    - body: {
           product: dadosProduto.product,
           type: tipo do produto,
           image: imagem do produto,
           price: preço do produto,
           description: descrição do produto,
           quantity: quantidade
         }
    - response: retorna statusCode 201 para produto cadastrado com sucesso;
```
 
```yml
GET /products 
    - Rota para listar os produtos de uma determianda categoria;
    - headers: { "Authorization": "Bearer $token", type: tipo do produto }
    - body: {}
    - response: retorna statusCode 200 e um array contendo todos os produtos da categoria;
```
 
```yml
GET /products/:id 
    - Rota para pegar os dados de um produto
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: retorna statusCode 200 e os dados do produto do id especificado;
```
 
```yml
PUT /products (autenticada)
    - Rota para diminuir no estoque os itens comprados;
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: retorna statusCode 404 caso o usuario não tenha realizado pedidos;
                retorna statusCode 200 para estoque atualizado com sucesso;
``` 

***

## 🏁 Rodando a aplicação

Certifique-se que voce tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/SergioTrajano/slug-store-API
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```
Em um terminal inicie o servidor do mongo com:

```
mongod --dbpath ~/.mongo
```

Finalizado o processo, é só inicializar o servidor
```
npm start
```

:stop_sign: Não esqueça de repetir os passos acima com o [repositório](https://github.com/SergioTrajano/slug-store) que contem a interface da aplicação, para testar o projeto por completo.
