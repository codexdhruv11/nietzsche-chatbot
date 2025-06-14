# Nietzsche AI - Philosophical Dialogue Bot

Nietzsche AI is an interactive chatbot that allows you to engage in philosophical discussions inspired by Friedrich Nietzsche's works. Powered by modern AI and styled with a Nietzschean aesthetic, this project brings 19th-century philosophy into the 21st century.

## Features

- 🧠 Philosophical dialogue with Nietzsche's perspective
- 🎨 Themed interface with dark academia aesthetics
- 💬 Starter prompts for meaningful conversations
- 🎙️ Voice input capability
- 📁 File upload support (images, PDFs)
- 📱 Responsive design for all devices
- ✨ Customized chat interface with Nietzsche-themed styling

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript
- **Chat Framework**: n8n Chat UI
- **Styling**: Custom CSS with Nietzsche-inspired color palette
- **AI Backend**: GPT-4 (via n8n webhook integration)

## Installation

To run this project locally:

1. Clone the repository:
```bash
git clone https://github.com/your-username/nietzsche-ai.git
cd nietzsche-ai
```

2. Start a local HTTP server (Python example):
```bash
python -m http.server 8000
```

3. Configure n8n backend:
- Set up your n8n workflow with GPT-4 integration
- Update the webhook URL in `script.js`:
```javascript
"n8nChatUrl": "YOUR_N8N_WEBHOOK_URL_HERE",
```

4. Open in browser:
```
[http://localhost:8000](https://codexdhruv11.github.io/nietzsche-chatbot/)
```

## Customization

You can customize various aspects of the chatbot:

### Theme Colors
Modify `style.css` to change the color scheme:
```css
body {
  background: linear-gradient(135deg, #181818 80%, #d4af37 100%);
}
```

### Chat Interface
Adjust chat settings in `script.js`:
```javascript
"theme": {
  "button": {
    "iconColor": "#373434",
    "backgroundColor": "#ffc8b8"
  },
  // ... other settings
}
```

### Starter Prompts
Edit the conversation starters:
```javascript
"starterPrompts": [
  "What is the will to power?",
  "What does 'God is dead' mean?",
  "How can I become who I am?"
],
```
## Acknowledgments

- Friedrich Nietzsche for his philosophical contributions
- n8n team for the chat UI framework
- All philosophers who continue to explore the human condition

---

> "Without music, life would be a mistake." - Friedrich Nietzsche

Engage with Nietzsche's philosophy through modern AI technology. Explore existential questions and challenge your perspectives with this unique chatbot experience.
