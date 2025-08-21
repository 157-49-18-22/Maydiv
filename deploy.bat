@echo off
chcp 65001 >nul
echo 🚀 Maydiv Deployment Script
echo ==========================

:menu
echo.
echo Choose deployment option:
echo 1) Deploy to Vercel
echo 2) Deploy to Hostinger
echo 3) Clear cache
echo 4) Reinstall dependencies
echo 5) Exit
echo.

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto vercel
if "%choice%"=="2" goto hostinger
if "%choice%"=="3" goto clear_cache
if "%choice%"=="4" goto reinstall_deps
if "%choice%"=="5" goto exit
echo ❌ Invalid choice. Please try again.
goto menu

:vercel
echo 📦 Building for Vercel...
call npm run build
echo.
echo 🚀 Deploying to Vercel...
echo Please push your changes to GitHub:
echo git add .
echo git commit -m "Update for Vercel deployment"
echo git push origin main
echo.
echo Vercel will automatically deploy from GitHub
pause
goto menu

:hostinger
echo 📦 Building for Hostinger...
call npm run build:hostinger
echo.
echo 📁 Static build created in 'out' folder
echo 📤 Upload the 'out' folder contents to Hostinger via FTP
echo.
echo FTP Upload Instructions:
echo 1. Connect to your Hostinger FTP
echo 2. Navigate to public_html folder
echo 3. Upload all contents from the 'out' folder
echo 4. Replace existing files if prompted
pause
goto menu

:clear_cache
echo 🧹 Clearing cache...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out
call npm cache clean --force
echo ✅ Cache cleared successfully
pause
goto menu

:reinstall_deps
echo 📦 Reinstalling dependencies...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
call npm install
echo ✅ Dependencies reinstalled successfully
pause
goto menu

:exit
echo 👋 Goodbye!
pause
exit
