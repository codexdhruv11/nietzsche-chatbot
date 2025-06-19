const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from the chatbot server!');
});

app.listen(port, () => {
  console.log(`Chatbot server running at http://localhost:3000`);
});
