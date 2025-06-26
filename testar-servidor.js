const http = require('http');

// Função para testar se o servidor está respondendo
function testServerConnection() {
  console.log('Testando conexão com o servidor Express...');
  
  // Tenta fazer uma requisição para o servidor
  const req = http.get('http://localhost:5000/api/test-connection', (res) => {
    console.log(`Status da resposta: ${res.statusCode}`);
    
    if (res.statusCode === 200) {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log('Resposta do servidor:', response);
          console.log('\n✅ Servidor está funcionando corretamente!');
        } catch (e) {
          console.error('❌ Erro ao processar resposta do servidor:', e.message);
        }
      });
    } else {
      console.error(`❌ Servidor respondeu com código de erro: ${res.statusCode}`);
    }
  });
  
  req.on('error', (error) => {
    console.error('❌ Erro ao conectar ao servidor:', error.message);
    console.log('\nVerifique se:');
    console.log('1. O servidor foi iniciado com "npm run server" ou "node server/server.js"');
    console.log('2. A porta 5000 está disponível e não bloqueada por firewall');
  });
  
  req.end();
}

testServerConnection();