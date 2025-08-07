@echo off
echo Starting MayDiv Backend...
echo.

REM Check if .env file exists
if not exist ".env" (
    echo Error: .env file not found!
    echo Please copy env.example to .env and configure it.
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

REM Start the server
echo Starting server on port 5000...
npm run dev 