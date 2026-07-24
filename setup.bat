@echo off
REM Quick setup and startup script for Text-to-Image AI

echo ============================================
echo Text-to-Image AI - Setup & Run
echo ============================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python not found. Please install Python 3.10+ from python.org
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found. Please install Node.js 16+ from nodejs.org
    pause
    exit /b 1
)

echo Python version:
python --version

echo Node.js version:
node --version

echo.
echo Step 1: Installing Python dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: Failed to install Python dependencies
    pause
    exit /b 1
)

echo.
echo Step 2: Setting up Backend...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo Step 3: Setting up Frontend...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo ============================================
echo Setup Complete!
echo ============================================
echo.
echo Now run these commands in separate terminals:
echo.
echo Terminal 1 (Python Image Service):
echo   python image_generator.py
echo.
echo Terminal 2 (Node Backend):
echo   cd backend ^& npm run dev
echo.
echo Terminal 3 (React Frontend):
echo   cd frontend ^& npm run dev
echo.
echo Then open: http://localhost:5173
echo.
pause
