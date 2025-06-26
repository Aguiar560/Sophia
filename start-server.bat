@echo off
echo Iniciando o servidor...
cd server
start cmd /k "node server.js"
cd ..
echo Servidor iniciado em uma nova janela.
echo Iniciando o aplicativo React...
start cmd /k "npm start"