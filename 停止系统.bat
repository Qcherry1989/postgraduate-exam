@echo off
chcp 65001 >nul
echo 正在关闭所有服务...
taskkill /f /im node.exe >nul 2>&1
echo ✅ 服务已全部关闭
echo.
pause