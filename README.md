# fullStack-crud
Crud fullStack feito com React no Front e PHP no Back.

Passo a passo para instalar o projeto.

# Backend

Para a construção do backend foi utilizado as seguintes ferramentas:
* PHP v7.3.8
* Codeigniter v3.1.11
* Apache v2.4.8
* MySQL v5.7.27

Para instalar o backend, basta subir o banco de dados (crud.sql), ir em
application/config/database.php e configurar as linhas 10, 11 e 12 de acordo com as credenciais configuradas localmente. Também é preciso colocar a pasta do projeto no servidor, como já citado foi utilizado o apache, portando a pasta padrão é /var/www/html/. Dependendo de como ficar a organização das pastas dentro do servidor, é necessário configurar a url base do projeto também. Para isso basta ir em application/config/config.php e trocar na linha 27 de acordo com a disposição das pastas. Após isso o backend já deve funcionar.

# Frontend

Para a construção do frontend foi utilizado as seguintes ferramentas:
* Npm v6.5.0
* Create-react-app
* ReactJS

Para instalar o frontend, não é necessário colocar a pasta em nenhum lugar específico, basta rodar o comando npm install dentro da pasta para instalar todas as dependências, após isso basta rodar o comando npm start para iniciar a aplicação. Um passo a mais é necessário caso a url base do servidor seja modificada, é necessário trocar a url de dentro do front para conseguir fazer as requisições corretamente, para isso basta modificar a constante baseUrl dentro dos seguintes arquivos: src/pages/Adicionar/index.js, src/pages/Listar/index.js e src/pages/Editar/index.js.


