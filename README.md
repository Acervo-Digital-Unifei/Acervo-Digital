# Acervo-Digital

*Comandos para executar o front*

Após baixar o projeto dever-se-á entrar na folder `front-end`
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

Após baixar o projeto dever-se-á entrar na folder `back-end` e instalar as dependências do projeto com npm install
```
cd Acervo-Digital/back-end
npm install
```

Crie um arquivo chamado `.env` dentro da pasta `back-end` e abra-o num editor de texto qualquer
```
touch .env
code .env
```

No arquivo aberto (`back-end/.env`), insira as seguintes variáveis de ambiente: 
```
DB_CONNECTION_URL=... #URL de conexão do MongoDB
JWT_SECRET=... #Secret do JWT, para autenticação dos usuários
SERVER_PORT=3000 #Porta da API back-end, caso omitida será 3000 por padrão
FRONTEND_CHANGE_PASSWORD_URL=... #URL do front-end em que o usuário fará a alteração de senha (será enviado por email)
FRONTEND_CHANGE_EMAIL_URL=... #URL do front-end em que o usuário fará a alteração de email (será enviado pelo atual email do usuário)
FRONTEND_CONFIRM_EMAIL_URL=... #URL do front-end para qual o usuário será redirecionado após clicar no link de confirmação de email
EMAIL_SERVICE="gmail" #Algum serviço específico implementado no nodemailer, pode ser omitida para configuração padrão
EMAIL_SMTP_HOST="smtp.gmail.com" #Host do servidor SMTP
EMAIL_SMTP_PORT=587 #Porta do servidor SMTP
EMAIL_SMTP_SECURE=true #true para utilizar o protocolo SMTP sobre TLS, false caso contrário
EMAIL_USERNAME="livrariaacervodigital@gmail.com" #Username do servidor SMTP
EMAIL_PASSWORD=... #Senha do servidor SMTP
```

E então executar com
```
npm run dev
```