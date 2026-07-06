@echo off
cd /d "%~dp0"
echo HanfuSite - 静态服务启动 at http://localhost:5173
echo 按 Ctrl+C 停止
npx serve dist\build\h5 -l 5173
