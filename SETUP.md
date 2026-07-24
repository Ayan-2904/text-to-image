# Text-to-Image AI Generation Setup Guide

## Architecture

This project has **two services**:

1. **Node.js Backend** (Port 5000) - API server
2. **Python Service** (Port 5001) - Local FLUX.1 image generation

## Prerequisites

- **Node.js** 16+ (for backend)
- **Python** 3.10-3.12 (Python 3.12 is recommended; Python 3.14 is not supported by the current PyTorch stack)
- **GPU** (NVIDIA with CUDA) - Recommended for faster generation (optional, will use CPU if not available)

## Installation

### 1. Backend Setup (Node.js)

```bash
cd backend
npm install
```

Create `.env` file in `backend/`:
```
PORT=5000
HF_TOKEN=hf_your_token_here
```

Before starting the Python service, open the [FLUX.1-dev model page](https://huggingface.co/black-forest-labs/FLUX.1-dev), sign in with the account that owns the token, and accept the model's access conditions. The token must have permission to read that gated repository. If the token was ever exposed publicly, revoke it and create a replacement.

### 2. Python Service Setup

**Install Python 3.12 first**, then install the dependencies with that interpreter:
```bash
py -3.12 -m pip install -r requirements.txt
```

**On Windows with GPU (CUDA):**
```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

**On Windows without GPU (CPU only):**
```bash
pip install torch torchvision torchaudio
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Ensure `frontend/.env` contains:
```
VITE_API_URL=http://localhost:5000
```

## Running the Application

### Terminal 1 - Python Image Generation Service
```bash
py -3.12 image_generator.py
```
This will:
- Download FLUX.1-dev model on first run (~50GB)
- Start Flask server on `http://localhost:5001`
- Pre-load the model for faster generation

The Python service reads `HF_TOKEN` from `backend/.env` and passes it to Diffusers. If access has not been approved, startup logs will contain a 401 gated-repository error and the Node API will return `503` with the model error.

### Terminal 2 - Node.js Backend
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5000`

### Terminal 3 - Frontend Dev Server
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

## How It Works

1. User enters a prompt in the UI
2. Frontend sends request to Node backend (`POST /generate`)
3. Backend forwards to Python service (`POST http://localhost:5001/generate`)
4. Python service generates image using FLUX.1 (runs locally on your machine)
5. Image is returned as base64 and displayed in the UI

## Troubleshooting

### Python Service Won't Start
- **Error: "No module named diffusers"** → Run: `pip install -r requirements.txt`
- **Error: unsupported Python version** → Install Python 3.12 and run `py -3.12 image_generator.py`
- **Error: CUDA out of memory** → Model uses too much VRAM. The code has CPU offloading enabled but may still need 10GB+ VRAM
- **Error: gated repo / 401** → Accept the FLUX.1-dev access conditions on Hugging Face and use a read token from that approved account
- **Error: Model download fails** → Internet connectivity issue, HuggingFace access issue, or the gated model terms were not accepted

### Image Generation Is Slow
- First request is slow (model loading) - subsequent requests are faster
- CPU generation takes 3-5 minutes per image
- GPU generation takes 30-60 seconds per image
- Ensure `enable_model_cpu_offload()` is in the code if using GPU with limited VRAM

### Backend Can't Connect to Python Service
- Ensure `py -3.12 image_generator.py` is running
- Check that port 5001 is not in use: `netstat -ano | findstr :5001`
- Windows Firewall might be blocking - add exception for Python

### Frontend Shows Placeholder Images
- Check Node backend logs for "Python service error"
- Verify Python service is running on port 5001
- Try accessing `http://localhost:5001` in browser to test Python service directly

## Environment Variables

**Backend (.env):**
```
PORT=5000  # Node server port
HF_TOKEN=hf_your_token_here  # Read token for the approved FLUX model
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:5000  # Backend API URL
```

## Model Information

**Model Used:** `black-forest-labs/FLUX.1-dev`
- Size: ~50GB (downloaded on first run)
- Quality: High-quality image generation
- License: Check HuggingFace model card for usage rights

## System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| RAM | 16GB | 32GB+ |
| GPU VRAM | 12GB | 24GB+ |
| Disk Space | 60GB | 100GB+ |
| GPU | Optional | NVIDIA with CUDA |

## Performance Notes

- **First request**: 1-2 minutes (model loads into memory)
- **Subsequent requests**: 30-60 seconds (GPU) or 3-5 minutes (CPU)
- The model stays loaded in memory between requests
- Restart `python image_generator.py` to free up memory

## API Endpoints

### Backend
- `GET /` - Health check
- `GET /health` - Service status
- `POST /generate` - Generate image from prompt

### Python Service
- `GET /` - Health check
- `POST /generate` - Generate image using FLUX.1

## Files Structure

```
project/
├── backend/              # Node.js Express server
│   ├── routes/
│   │   └── image.js     # Routes to Python service
│   ├── app.js           # Main server
│   ├── package.json
│   └── .env
├── frontend/            # React Vite app
│   ├── src/
│   │   ├── components/
│   │   └── services/
│   ├── package.json
│   └── .env
├── image_generator.py   # Python Flask service
└── requirements.txt     # Python dependencies
```
