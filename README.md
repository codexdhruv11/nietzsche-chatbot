# 🧠 Nietzsche Chatbot

A philosophical chatbot powered by React, Vite, and Express, styled with Tailwind CSS and Material UI. This chatbot is designed to simulate meaningful, Nietzschean conversations with users, and offers features like PDF export and chart visualizations.

## 🌐 Live Demo

[Click here to view the live app](https://codexdhruv11.github.io/nietzsche-chatbot/)

> *(Note: This only includes the frontend. Backend must be deployed separately on services like Render, Railway, or Vercel.)*

---

## 🚀 Features

- 💬 Chat interface inspired by Nietzsche's philosophy
- 🧾 Export conversations as PDF (via `html2canvas` + `jspdf`)
- 📊 Visualize ideas using Chart.js
- 🌈 Styled using Tailwind CSS and Material UI
- ⚡ Fast development with Vite

---

## 📦 Tech Stack

| Frontend    | Backend    | Styling         | Extras             |
|-------------|------------|------------------|---------------------|
| React 18    | Express.js | Tailwind CSS     | html2canvas, jspdf |
| Vite        | Node.js    | MUI (Material UI)| Chart.js           |

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/codexdhruv11/nietzsche-chatbot.git
cd nietzsche-chatbot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

To run the backend (Express server):

```bash
npm run server
```

---

## 📁 Project Structure

```
├── public/           # Static assets
├── src/              # React components and logic
├── dist/             # Production build (after `vite build`)
├── index.js          # Express backend entry point
├── vite.config.js    # Vite config
├── package.json      # Project dependencies and scripts
```

---

## 📄 Scripts

| Script        | Description                      |
|---------------|----------------------------------|
| `npm run dev` | Start frontend in dev mode       |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production build locally |
| `npm run server` | Run Express backend server     |

---

## 📤 Deployment

### GitHub Pages (Frontend Only)

```bash
npm run build
npx gh-pages -d dist
```

Make sure `vite.config.js` includes:

```js
base: '/nietzsche-chatbot/',
```

---

## 🙏 Acknowledgements

- Inspired by the philosophical writings of **Friedrich Nietzsche**
- Built with ❤️ using open-source libraries

---

## 📃 License

MIT License

---

## 👤 Author

**Dhruv Kaushik**  
[GitHub: @codexdhruv11](https://github.com/codexdhruv11)
