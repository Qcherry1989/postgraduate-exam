@echo off
chcp 65001 >nul
echo ==============================================
echo  启动后端服务 (端口 3000)
echo ==============================================
start cmd /k "cd /d "backend" && npm run start"

echo.
echo ==============================================
echo  启动前端页面 (端口 3001)
echo ==============================================
timeout /t 3 /nobreak >nul
start cmd /k "cd /d "frontend" && npm run start"

echo.
echo ==============================================
echo  ✅ 启动完成！
echo  前端访问：http://localhost:3001
echo  后端接口：http://localhost:3000
echo ==============================================
pause