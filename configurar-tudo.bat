@echo off
echo =====================================================
echo    CONFIGURACAO AUTOMATICA - GUARDA-ROUPA SOPHIA
echo =====================================================
echo.

echo Passo 1: Instalando dependencias...
call npm install

echo.
echo Passo 2: Configurando o banco de dados...
echo.
echo IMPORTANTE: Voce precisa ter o MySQL instalado e configurado.
echo.
echo Voce tem duas opcoes:
echo.
echo 1) Se voce tem o MySQL Workbench instalado:
echo    - Abra o MySQL Workbench
echo    - Conecte ao seu servidor MySQL
echo    - Abra o arquivo server\setup.sql
echo    - Execute o script SQL
echo.
echo 2) Se voce tem o MySQL no PATH do sistema:
echo    - Execute o comando: mysql -u root -p1452 < server\setup.sql
echo.
echo Pressione qualquer tecla quando o banco de dados estiver configurado...
pause > nul

echo.
echo Passo 3: Iniciando o servidor...
start cmd /k "cd /d %~dp0 && node server\test-server.js"

echo.
echo Aguardando o servidor iniciar...
timeout /t 3 > nul

echo.
echo Passo 4: Verificando se o servidor esta funcionando...
start http://localhost:5000

echo.
echo Passo 5: Iniciando o aplicativo frontend...
start cmd /k "cd /d %~dp0 && npm start"

echo.
echo =====================================================
echo    CONFIGURACAO CONCLUIDA!
echo =====================================================
echo.
echo O aplicativo deve abrir automaticamente no navegador.
echo.
echo Se o navegador nao abrir, acesse:
echo - Frontend: http://localhost:3000
echo - Backend: http://localhost:5000
echo.
echo Para encerrar o aplicativo, feche as janelas de comando.
echo.
pause