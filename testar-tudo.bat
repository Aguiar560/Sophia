@echo off
echo ===================================================
echo    TESTE DE CONEXAO - GUARDA-ROUPA DA SOPHIA
echo ===================================================
echo.
echo Este script vai testar:
echo 1. A conexao com o banco de dados MySQL
echo 2. A conexao com o servidor Express
echo.
echo Pressione qualquer tecla para iniciar...
pause > nul

cls
echo ===================================================
echo    TESTE 1: CONEXAO COM O BANCO DE DADOS
echo ===================================================
echo.

node testar-conexao.js

echo.
echo Pressione qualquer tecla para continuar...
pause > nul

cls
echo ===================================================
echo    TESTE 2: INICIANDO O SERVIDOR
echo ===================================================
echo.
echo Iniciando o servidor Express...
echo.
echo O servidor sera iniciado em uma nova janela.
echo Aguarde alguns segundos...
echo.

start cmd /k "cd /d %~dp0 && node server/server.js"

timeout /t 5 /nobreak > nul

cls
echo ===================================================
echo    TESTE 3: CONEXAO COM O SERVIDOR
echo ===================================================
echo.

node testar-servidor.js

echo.
echo ===================================================
echo    RESULTADO FINAL
echo ===================================================
echo.
echo Se todos os testes passaram, o sistema esta pronto para uso!
echo.
echo Para iniciar o aplicativo completo, execute:
echo   iniciar.bat
echo.
pause