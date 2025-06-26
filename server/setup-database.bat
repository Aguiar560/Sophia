@echo off
echo Configurando o banco de dados...
mysql -u root -p1452 < setup-database.sql
if %ERRORLEVEL% EQU 0 (
  echo Banco de dados configurado com sucesso!
) else (
  echo Erro ao configurar o banco de dados.
  echo Verifique se o MySQL está instalado e se a senha está correta.
)
pause