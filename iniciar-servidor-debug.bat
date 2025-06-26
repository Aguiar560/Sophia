@echo off
echo Iniciando o servidor em modo de depuracao...
echo.
echo Este script vai iniciar apenas o servidor backend com mais informacoes de depuracao.
echo.
echo Pressione Ctrl+C para encerrar.
echo.
set DEBUG=express:*
node server/server.js