@echo off
echo 🧠 Starting MindBloom Backend Server...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.
    pause
    exit /b 1
)

REM Navigate to backend directory
cd backend

REM Check if virtual environment exists
if not exist "venv" (
    echo 📦 Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo 🔧 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo 📥 Installing dependencies...
pip install -r requirements.txt

REM Check if .env file exists
if not exist ".env" (
    echo ⚠️  .env file not found. Please create one with your OPENROUTER_API_KEY
    echo Example:
    echo OPENROUTER_API_KEY=your_api_key_here
    pause
    exit /b 1
)

REM Start the server
echo 🚀 Starting Flask server...
python app.py

pause
