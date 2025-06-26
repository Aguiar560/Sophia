@echo off
echo Verificando se a porta 5000 esta em uso...
echo.
netstat -ano | findstr :5000
echo.
echo Se aparecer algum resultado acima, significa que a porta 5000 ja esta em uso.
echo Nesse caso, voce precisa encerrar o processo ou mudar a porta do servidor.
echo.
echo Para encerrar o processo, anote o numero PID (ultima coluna) e execute:
echo taskkill /F /PID numero_do_pid
echo.
pause