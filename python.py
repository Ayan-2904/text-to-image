import os

PROJECT_NAME = "text-to-image-ai"

folders = [
    f"{PROJECT_NAME}/frontend",
    f"{PROJECT_NAME}/frontend/public",
    f"{PROJECT_NAME}/frontend/src",
    f"{PROJECT_NAME}/frontend/src/assets",
    f"{PROJECT_NAME}/frontend/src/components",
    f"{PROJECT_NAME}/frontend/src/services",

    f"{PROJECT_NAME}/backend",
    f"{PROJECT_NAME}/backend/routes",
]

files = [
    f"{PROJECT_NAME}/frontend/package.json",
    f"{PROJECT_NAME}/frontend/vite.config.js",
    f"{PROJECT_NAME}/frontend/.env",

    f"{PROJECT_NAME}/frontend/src/App.jsx",
    f"{PROJECT_NAME}/frontend/src/App.css",
    f"{PROJECT_NAME}/frontend/src/main.jsx",
    f"{PROJECT_NAME}/frontend/src/index.css",

    f"{PROJECT_NAME}/frontend/src/components/Navbar.jsx",
    f"{PROJECT_NAME}/frontend/src/components/PromptForm.jsx",
    f"{PROJECT_NAME}/frontend/src/components/ImageCard.jsx",
    f"{PROJECT_NAME}/frontend/src/components/Loader.jsx",
    f"{PROJECT_NAME}/frontend/src/components/Footer.jsx",

    f"{PROJECT_NAME}/frontend/src/services/api.js",

    f"{PROJECT_NAME}/backend/app.js",
    f"{PROJECT_NAME}/backend/package.json",
    f"{PROJECT_NAME}/backend/.env",
    f"{PROJECT_NAME}/backend/routes/image.js",

    f"{PROJECT_NAME}/README.md",
    f"{PROJECT_NAME}/.gitignore",
]

# Create folders
for folder in folders:
    os.makedirs(folder, exist_ok=True)

# Create files
for file in files:
    with open(file, "w", encoding="utf-8") as f:
        pass

print("=" * 60)
print("✅ Project structure created successfully!")
print("=" * 60)
print(PROJECT_NAME)
print("│")
print("├── frontend/")
print("├── backend/")
print("├── README.md")
print("└── .gitignore")
print("=" * 60)