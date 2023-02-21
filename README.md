# Trybe Car Shop

# Contexto
Este projeto trata-se de uma API construida nos principios de POO para gerenciar uma concessionaria de veiculos.

Esse projeto e desenvolvido pela trybe, o objetivo é poder testar a capacidade de seus alunos de construir um backend orientado a objetos utilizando ferramentas como express e Docker e um banco NoSQL, neste caso o MongoDB.

### os arquivos aos quais eu sou responsavel:
* os presentes nas pastas `src` & `tests`

### :construction: Este projeto ainda sera refatorado :construction:

## Técnologias usadas
Back-end:
> Desenvolvido usando: NodeJS, TypeScript, ExpressJS, MongoDB, Mongoose

Testes:
> Desenvolvido usando: Mocha, Sinon, Chai


## Instalando Dependências

```bash
npm install
``` 

## Utilizando Docker
  - Lembre-se de parar o `mongo` se estiver usando localmente na porta padrão (`27017`), ou adapte, caso queria fazer uso da aplicação em containers
  - Esses serviços irão inicializar um container chamado `car_shop` e outro chamado `car_shop_db`.
```bash
docker-compose up -d
``` 
```bash
docker exec -it car_shop bash
``` 
```bash
npm install
``` 
## Executando aplicação

  ```
  npm run dev
  ```


## Executando Testes

  ```
    npm test
  ```
