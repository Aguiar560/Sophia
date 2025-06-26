@echo off
color 0A
cls
echo =====================================================
echo    GUARDA-ROUPA DA SOPHIA - INICIALIZACAO RAPIDA
echo =====================================================
echo.
echo Este script vai iniciar o aplicativo completo.
echo.
echo IMPORTANTE: O banco de dados MySQL deve estar configurado.
echo Se voce ainda nao configurou o banco de dados, leia o
echo arquivo "configurar-banco.txt" para instruções.
echo.
echo Pressione qualquer tecla para continuar ou CTRL+C para cancelar...
pause > nul

cls
echo =====================================================
echo    INICIANDO O SERVIDOR...
echo =====================================================
echo.
echo Iniciando o servidor na porta 5000...
start cmd /k "cd /d %~dp0 && node server\test-server.js"

echo.
echo Aguardando o servidor iniciar...
timeout /t 3 > nul

cls
echo =====================================================
echo    INICIANDO O FRONTEND...
echo =====================================================
echo.
echo Iniciando o aplicativo React na porta 3000...
start cmd /k "cd /d %~dp0 && npm start"

cls
echo =====================================================
echo    APLICATIVO INICIADO COM SUCESSO!
echo =====================================================
echo.
echo O navegador deve abrir automaticamente em alguns segundos.
echo.
echo Se o navegador nao abrir, acesse:
echo - Frontend: http://localhost:3000
echo - Backend: http://localhost:5000
echo.
echo Para encerrar o aplicativo, feche as janelas de comando
echo ou pressione CTRL+C em cada uma delas.
echo.
echo Pressione qualquer tecla para abrir o aplicativo no navegador...
pause > nul

start http://localhost:3000