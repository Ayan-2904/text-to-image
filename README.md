# 🚀 Text-to-Image AI Generator

A full-stack, modern AI Image Generation application built with a React frontend and an Express/Node.js backend. This platform allows users to seamlessly generate breathtaking images from textual descriptions using advanced AI generation techniques, featuring built-in authentication, caching, and a stunning UI.

## ✨ Features

- **🎨 AI Image Generation:** Generate high-quality images from text prompts.
- **🔐 Secure Authentication:** User signup and login system secured using JWT and bcrypt.
- **⚡ Fast & Optimized:** Uses Vite for blazing fast frontend delivery and Upstash Redis for backend caching to improve performance.
- **💾 Image History:** Registered users can view their past generated images securely saved in MongoDB.
- **📱 Responsive Design:** A beautiful, responsive user interface designed with modern web aesthetics.

## 🛠️ Technology Stack

### Frontend
- **React.js (v18)** - Component-based UI framework
- **Vite** - Next-generation frontend tooling
- **React Router** - Client-side routing
- **React Icons** - Built-in icon library

### Backend
- **Node.js & Express.js** - Robust backend server and API routing
- **MongoDB (Mongoose)** - NoSQL database for storing user data and generation history
- **JWT (JSON Web Tokens)** - Secure API authentication
- **Upstash Redis** - High-performance caching layer
- **bcryptjs** - Password hashing for secure user credentials
- **Python** - Integrated scripting for AI inference processes (`image_generator.py`)

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16+) and [Python 3](https://www.python.org/) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/Ayan-2904/text-to-image.git
cd text-to-image
```

### 2. Setup the Backend
Open a terminal and navigate to the backend directory:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and configure the necessary environment variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
# Add your AI service API keys here if applicable
```

Start the backend development server:
```bash
npm run dev
```
The server will run on `http://localhost:5000`.

### 3. Setup the Frontend
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`.

## 📦 Deployment
- **Frontend:** Pre-configured for seamless deployment to Vercel.
- **Backend:** Configured with `vercel.json` for Serverless Node.js deployment on Vercel.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check [issues page](https://github.com/Ayan-2904/text-to-image/issues).

## 📝 License
This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
