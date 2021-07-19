# Recipe API

## Utilização

Para executar a aplicação é necessário ter o docker e o docker-compose instalados.

Execute o comando `docker-compose up --build` para iniciar a aplicação.

Após a aplicação tiver sido iniciada é possível acessar o link [http://localhost:8080/recipes/](http://localhost:8080/recipes/) para realizar consultar na API.

## Endpoints

GET `/health` -
Retorna o status da aplicação

GET `/metrics` -
Retorna métricas da aplicação

GET `/recipes/?i={ingredient_1},{ingredient_2},{ingredient_3}` -
Retorna as receitas para os ingredientes informados (máximo 3)

## Desenvolvimento

Para executar a aplicação localmente é necessário criar um arquivo .env na raiz do projeto com uma variável GIPHY_API_KEY preenchida com um token de acesso da API do giphy.

O arquivo docker-compose.yml possui um token que pode ser utilizado para testes.

### Comandos

#### Install

```bash
yarn install
```

#### Start

```bash
yarn start
```

#### Start - prod

```bash
yarn start:prod
```

#### Build

```bash
yarn build
```

#### Tests

```bash
yarn test
```

#### Tests - coverage

```bash
yarn test:coverage
```

#### Prettier - format

```bash
yarn prettier:format
```

#### Prettier - check

```bash
yarn prettier:check
```

#### Lint

```bash
yarn lint
```
