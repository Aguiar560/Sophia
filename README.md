# Guarda-Roupa da Sophia

Aplicativo para gerenciar o guarda-roupa da Sophia, desenvolvido com React, TypeScript e MySQL.

## Funcionalidades

- Adicionar novas peças de roupa
- Editar peças existentes
- Excluir peças
- Filtrar por tipo, cor e tamanho
- Persistência de dados em banco MySQL

## Requisitos

- Node.js (versão 14 ou superior)
- MySQL (versão 5.7 ou superior)

## Configuração do Banco de Dados

1. Certifique-se de que o MySQL está instalado e em execução
2. Configure o banco de dados usando o script SQL fornecido:
   ```
   mysql -u root -p1452 < server/setup.sql
   ```
   Ou abra o arquivo `server/setup.sql` em um cliente MySQL e execute-o

## Como executar

1. Clone este repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Inicie o servidor backend:
   ```
   npm run server
   ```
4. Em outro terminal, inicie o frontend:
   ```
   npm start
   ```
5. Ou execute ambos simultaneamente:
   ```
   npm run dev
   ```
6. Abra [http://localhost:3000](http://localhost:3000) no navegador

## Estrutura do Projeto

- `src/` - Código fonte do frontend React
- `server/` - Código fonte do backend Node.js
  - `server.js` - Servidor Express
  - `db.js` - Conexão com o banco de dados MySQL
  - `setup.sql` - Script para configuração do banco de dados

## Tecnologias utilizadas

- React
- TypeScript
- Node.js
- Express
- MySQL
- Axios para chamadas de API

## Configuração do Banco de Dados

O aplicativo está configurado para conectar ao MySQL com as seguintes credenciais:

- Username: root
- Hostname: localhost
- Port: 3306
- Password: 1452
- Database: sophia_db

Se você precisar alterar essas configurações, edite o arquivo `server/db.js`.