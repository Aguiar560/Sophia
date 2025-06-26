const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

// Criar um servidor Express simples para teste
const app = express();
const PORT = 5000;

// Habilitar CORS para todas as rotas
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Servidor de teste funcionando!</h1><p>Acesse <a href="/test-db">/test-db</a> para testar o banco de dados</p>');
});

// Testar conexão com o banco de dados
app.get('/test-db', async (req, res) => {
  try {
    // Configuração da conexão
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '1452',
      database: 'sophia_db'
    });
    
    // Testar uma consulta simples
    const [tipos] = await connection.query('SELECT * FROM Tipos');
    const [cores] = await connection.query('SELECT * FROM Cores');
    const [tamanhos] = await connection.query('SELECT * FROM Tamanhos');
    
    // Fechar conexão
    await connection.end();
    
    res.json({ 
      success: true, 
      message: 'Conexão com o banco de dados estabelecida com sucesso!',
      data: {
        tipos,
        cores,
        tamanhos
      }
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao conectar ao banco de dados',
      error: error.message
    });
  }
});

// API simplificada para o frontend
app.get('/api/types', async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '1452',
      database: 'sophia_db'
    });
    const [rows] = await connection.query('SELECT * FROM Tipos');
    await connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/colors', async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '1452',
      database: 'sophia_db'
    });
    const [rows] = await connection.query('SELECT * FROM Cores');
    await connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/sizes', async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '1452',
      database: 'sophia_db'
    });
    const [rows] = await connection.query('SELECT * FROM Tamanhos');
    await connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/clothes', async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '1452',
      database: 'sophia_db'
    });
    
    const [rows] = await connection.query(`
      SELECT r.id, t.nome as type, c.nome as color, tm.nome as size
      FROM Roupas r
      JOIN Tipos t ON r.tipo_id = t.id
      JOIN Cores c ON r.cor_id = c.id
      JOIN Tamanhos tm ON r.tamanho_id = tm.id
    `);
    
    await connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log('=================================================');
  console.log(`  Servidor de teste rodando na porta ${PORT}`);
  console.log('=================================================');
  console.log('');
  console.log('URLs disponíveis:');
  console.log(`  - http://localhost:${PORT}         (página inicial)`);
  console.log(`  - http://localhost:${PORT}/test-db (teste do banco de dados)`);
  console.log(`  - http://localhost:${PORT}/api/types   (API de tipos)`);
  console.log(`  - http://localhost:${PORT}/api/colors  (API de cores)`);
  console.log(`  - http://localhost:${PORT}/api/sizes   (API de tamanhos)`);
  console.log(`  - http://localhost:${PORT}/api/clothes (API de roupas)`);
  console.log('');
  console.log('Pressione Ctrl+C para encerrar o servidor');
});