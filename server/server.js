const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Testar conexão com o banco de dados
app.get('/api/test-connection', async (req, res) => {
  const connected = await db.testConnection();
  if (connected) {
    res.json({ success: true, message: 'Conexão com o banco de dados estabelecida com sucesso!' });
  } else {
    res.status(500).json({ success: false, message: 'Erro ao conectar ao banco de dados' });
  }
});

// Rotas para roupas
app.get('/api/clothes', async (req, res) => {
  try {
    const clothes = await db.getAllClothes();
    res.json(clothes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rotas para tipos
app.get('/api/types', async (req, res) => {
  try {
    const types = await db.getTypes();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rotas para cores
app.get('/api/colors', async (req, res) => {
  try {
    const colors = await db.getColors();
    res.json(colors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rotas para tamanhos
app.get('/api/sizes', async (req, res) => {
  try {
    const sizes = await db.getSizes();
    res.json(sizes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para adicionar roupa
app.post('/api/clothes', async (req, res) => {
  try {
    const { typeId, colorId, sizeId } = req.body;
    const id = await db.addClothing(typeId, colorId, sizeId);
    res.status(201).json({ id, message: 'Roupa adicionada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para atualizar roupa
app.put('/api/clothes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { typeId, colorId, sizeId } = req.body;
    await db.updateClothing(id, typeId, colorId, sizeId);
    res.json({ message: 'Roupa atualizada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para excluir roupa
app.delete('/api/clothes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.deleteClothing(id);
    res.json({ message: 'Roupa excluída com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});