const mysql = require('mysql2/promise');

async function testDatabaseConnection() {
  console.log('Testando conexão com o banco de dados MySQL...');
  
  try {
    // Configuração da conexão
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '1452',
      database: 'sophia_db'
    });
    
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
    
    // Testar se as tabelas existem
    console.log('\nVerificando tabelas do banco de dados...');
    
    const [tables] = await connection.query('SHOW TABLES');
    console.log('Tabelas encontradas:');
    tables.forEach(table => {
      const tableName = table[`Tables_in_sophia_db`];
      console.log(`- ${tableName}`);
    });
    
    // Fechar conexão
    await connection.end();
    console.log('\n✅ Teste concluído com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco de dados:', error.message);
    console.log('\nVerifique se:');
    console.log('1. O servidor MySQL está em execução');
    console.log('2. As credenciais estão corretas (usuário: root, senha: 1452)');
    console.log('3. O banco de dados sophia_db foi criado');
    console.log('\nPara criar o banco de dados, execute:');
    console.log('mysql -u root -p1452 < server/setup.sql');
  }
}

testDatabaseConnection();