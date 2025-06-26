const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Instalando dependências...');

// Instalar dependências do projeto
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('Dependências instaladas com sucesso!');
} catch (error) {
  console.error('Erro ao instalar dependências:', error);
  process.exit(1);
}

// Verificar se o diretório node_modules existe
if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.error('Erro: O diretório node_modules não foi criado. Verifique se o npm está instalado corretamente.');
  process.exit(1);
}

console.log('\nInstalando dependências adicionais...');

// Instalar dependências adicionais necessárias
const additionalDeps = ['mysql2', 'express', 'cors', 'axios', 'concurrently'];

try {
  execSync(`npm install ${additionalDeps.join(' ')} --save`, { stdio: 'inherit' });
  console.log('Dependências adicionais instaladas com sucesso!');
} catch (error) {
  console.error('Erro ao instalar dependências adicionais:', error);
  process.exit(1);
}

console.log('\nConfigurando o projeto...');

// Verificar se o diretório server existe
if (!fs.existsSync(path.join(__dirname, 'server'))) {
  console.error('Erro: O diretório server não existe. Verifique a estrutura do projeto.');
  process.exit(1);
}

console.log('\nConfiguração concluída com sucesso!');
console.log('\nPróximos passos:');
console.log('1. Configure o banco de dados MySQL executando o script SQL:');
console.log('   mysql -u root -p1452 < server/setup.sql');
console.log('2. Inicie o servidor backend:');
console.log('   npm run server');
console.log('3. Em outro terminal, inicie o frontend:');
console.log('   npm start');
console.log('4. Ou execute ambos simultaneamente:');
console.log('   npm run dev');
console.log('5. Acesse o aplicativo em http://localhost:3000');