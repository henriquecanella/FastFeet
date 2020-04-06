<h1 align="center">
  <img alt="GoStack" width="500px" title="GoStack" src=".github/logo.png" />
</h1>

<p align="center">Código referente a aplicação FastFeet, desenvolvida durante o bootcamp GoStack da Rocketseat</p>



## :rocket: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [React Native](https://reactnative.dev/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL](https://www.postgresql.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://github.com/expressjs/express)
- [Redis](https://redis.io/)
- [Bee-Queue](https://github.com/bee-queue/bee-queue)

## :computer: Instalação e execução

Faça um clone desse repositório.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

### Backend

- Entre na pasta utilizando o comando a partir da raiz do projeto: `cd backend`;
- Execute então o comando: `docker-compose up -d` para montar o ambiente da aplicação;
- Utilize o comando `yarn` para baixar as dependencias do projeto;
- Crie um arquivo `.env` e preencha com base nas informações do arquivo `.env.example`
- Para executar as migrations utilize: `yarn sequelize db:migrate`;
- Para executar as seeds utilize: `yarn sequelize db:seed:all`;
- Para executar o servidor utilize o comando: `yarn dev`;
- Para executar os background jobs utilize o comando: `yarn queue`;

---

### Front-end

- A partir da raiz do projeto execute o comando: `cd frontend`;
- Para baixar as dependências utilize o comando: `yarn`;
- Para iniciar a aplicação execute: `yarn start`;

---

### Mobile (projeto não configurado para execução em IOS)

- A partir da raiz do projeto execute o comando: `cd mobile`;
- Para baixar as dependências utilize o comando: `yarn`;
- Dentro da pasta services atualize o arquivo `api.js` trocando a `baseURL` para o seu endereço de ip local, exemplo: `baseURL: 'http://192.168.0.101:3333'`;
- Dentro da pasta config atualize o arquivo `ReactotronConfig.js` trocando o `host` para seu endereço de ip local, exemplo: `host: '192.168.0.101'`;
- **OBS:** caso esteja utilizando um emulador como genymotion ou o padrão do android studio substitua o endereço de IP pelo referente ao emulador;
- Para executar o aplicativo, com o emulador ou aparelho físico conectado utilize os comandos: `yarn start` e `yarn android`;
- **OBS:** Caso as imagens da aplicação não apareçam tente executar o comando: `adb reverse tcp:3333 tcp:3333`;

---

## 🤔 Como contribuir

- Faça um fork desse repositório;
- Crie uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`;
- Faça push para a sua branch: `git push origin minha-feature`;