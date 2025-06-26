# Guarda-Roupa da Sophia

Aplicativo para gerenciar o guarda-roupa da Sophia e armazenar vídeos de ultrasom.

## Funcionalidades

- Cadastro de roupas com tipo, tamanho e cor
- Visualização e filtragem das roupas cadastradas
- Upload e visualização de vídeos de ultrasom
- Interface amigável e responsiva

## Como executar o aplicativo

### Modo sem servidor (atual)

O aplicativo está configurado para funcionar sem servidor, usando dados mockados.

```bash
# Instalar dependências
npm install

# Iniciar o aplicativo
npm start
```

### Modo com servidor (configuração futura)

Para usar o aplicativo com o servidor e banco de dados:

1. Configure o banco de dados MySQL:
   - Execute o script `server/setup-database.bat`
   - Ou importe manualmente o arquivo `server/setup-database.sql`

2. Inicie o servidor:
   - Execute o script `server/start-server.bat`
   - Ou execute `node server/server.js`

3. Inicie o aplicativo:
   ```bash
   npm start
   ```

## Tecnologias utilizadas

- React
- TypeScript
- CSS
- Express (servidor)
- MySQL (banco de dados)