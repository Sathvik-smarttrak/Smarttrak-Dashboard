# SmartTrak Dashboard

SmartTrak Dashboard is an Electron-based desktop application for monitoring and controlling tracker devices. This app loads environment configurations from a `.env` file and builds into a portable `.exe` for Windows.

## 🧰 Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- Git
- Windows OS

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Sathvik-smarttrak/Smarttrak-Dashboard.git
cd Smarttrak-Dashboard
````

### 2. Install Dependencies

```bash
npm i
```

### 3. Configure `.env`

Edit your `.env` file in the root directory:

```env
SERVER_URL=""
MINIMISE_SHORTCUT="Control+M"
CLOSE_SHORTCUT="Control+Q"
INFO_SHORTCUT="Control+I"
RELOAD_SHORTCUT="Control+R"
URL_SHORTCUT="Control+U"
```

## 🧪 Development

To run the app in development mode:

```bash
npm start
```

## 📦 Building the App

To build a portable `.exe` version:

```bash
npm run dist
```

> The build output will be located in the `dist/` folder.

---

If you got an error go with the below step

## ⚡ Run Build Command as Administrator

```powershell
Start-Process cmd -ArgumentList "/k cd `"$PWD`" && npm run dist" -Verb RunAs
```

## 🔧 Project Structure

```
Smarttrak-Dashboard/
├── index.js
├── .env
├── .gitattributes
├── .gitignore
├── icon.ico
├── package.json
├── package-lock.json
├── node_modules/
├── dist/         ← Output folder after build
└── README.md
```


## 📄 License

ISC License
© 2025 Smarttrak Ai
