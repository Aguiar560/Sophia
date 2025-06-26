const db = require('./db');

async function testConnection() {
  try {
    const connected = await db.testConnection();
    console.log('Teste de conexão:', connected ? 'Sucesso' : 'Falha');
    
    if (connected) {
      try {
        const types = await db.getTypes();
        console.log('Tipos encontrados:', types.length);
        
        const colors = await db.getColors();
        console.log('Cores encontradas:', colors.length);
        
        const sizes = await db.getSizes();
        console.log('Tamanhos encontrados:', sizes.length);
        
        const clothes = await db.getAllClothes();
        console.log('Roupas encontradas:', clothes.length);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }
  } catch (error) {
    console.error('Erro no teste de conexão:', error);
  }
  
  process.exit();
}

testConnection();