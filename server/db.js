const mysql = require('mysql2/promise');

// Configuração da conexão com o banco de dados
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1452',
  database: 'sophia_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Função para testar a conexão
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    connection.release();
    return true;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    return false;
  }
}

// Funções para interagir com as tabelas
async function getAllClothes() {
  try {
    const [rows] = await pool.query(`
      SELECT r.id, t.nome as type, c.nome as color, tm.nome as size
      FROM Roupas r
      JOIN Tipos t ON r.tipo_id = t.id
      JOIN Cores c ON r.cor_id = c.id
      JOIN Tamanhos tm ON r.tamanho_id = tm.id
    `);
    return rows;
  } catch (error) {
    console.error('Erro ao buscar roupas:', error);
    throw error;
  }
}

async function getTypes() {
  try {
    const [rows] = await pool.query('SELECT * FROM Tipos');
    return rows;
  } catch (error) {
    console.error('Erro ao buscar tipos:', error);
    throw error;
  }
}

async function getColors() {
  try {
    const [rows] = await pool.query('SELECT * FROM Cores');
    return rows;
  } catch (error) {
    console.error('Erro ao buscar cores:', error);
    throw error;
  }
}

async function getSizes() {
  try {
    const [rows] = await pool.query('SELECT * FROM Tamanhos');
    return rows;
  } catch (error) {
    console.error('Erro ao buscar tamanhos:', error);
    throw error;
  }
}

async function addClothing(typeId, colorId, sizeId) {
  try {
    const [result] = await pool.query(
      'INSERT INTO Roupas (tipo_id, cor_id, tamanho_id) VALUES (?, ?, ?)',
      [typeId, colorId, sizeId]
    );
    return result.insertId;
  } catch (error) {
    console.error('Erro ao adicionar roupa:', error);
    throw error;
  }
}

async function updateClothing(id, typeId, colorId, sizeId) {
  try {
    await pool.query(
      'UPDATE Roupas SET tipo_id = ?, cor_id = ?, tamanho_id = ? WHERE id = ?',
      [typeId, colorId, sizeId, id]
    );
    return true;
  } catch (error) {
    console.error('Erro ao atualizar roupa:', error);
    throw error;
  }
}

async function deleteClothing(id) {
  try {
    await pool.query('DELETE FROM Roupas WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Erro ao excluir roupa:', error);
    throw error;
  }
}

module.exports = {
  testConnection,
  getAllClothes,
  getTypes,
  getColors,
  getSizes,
  addClothing,
  updateClothing,
  deleteClothing
};