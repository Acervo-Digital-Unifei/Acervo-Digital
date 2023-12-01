# Acervo-Digital

*Comandos para executar o front*

Após baixar o projeto dever-se-á entrar no folder `front-end`
```
cd Acervo-Digital/front-end/
```

Depois instale as dependências do projeto com 
```
npm install
```

e então executar com
```
npm run dev
```
------------------------------------------------------------------
*Comandos para executar o back*

Após baixar o projeto dever-se-á entrar no folder `back-end/src`
```
cd Acervo-Digital/back-end/src
```

Instale as dependências do projeto com 
```
npm install
```

Crie um arquivo `.env` dentro da pasta `back-end/src` e abra-o num editor de texto qualquer
```
touch .env
code .env
```

Insira as variáveis de ambiente referentes a secret do JSON Webtoken, a URL de conexão do MongoDB e a porta em que a API irá servir
```
DB_CONNECTION_URL=...
JWT_SECRET=...
SERVER_PORT=3000
```

E então executar com
```
npm run dev
```