// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// Middleware CORS pour ton frontend Vite
app.use(cors({
  origin: 'http://localhost:5173', // <-- doit correspondre exactement à ton frontend
  credentials: true
}));

app.use(bodyParser.json());

// Digicode
app.post('/api/check-digicode', (req, res) => {
  const { code } = req.body;
  if (code === '1234') { // exemple de digicode
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Rendez-vous
let appointments = [];
app.get('/api/appointments', (req, res) => {
  res.json(appointments);
});

app.post('/api/appointments', (req, res) => {
  const appointment = { id: appointments.length + 1, ...req.body };
  appointments.push(appointment);
  res.json({ success: true, appointment });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
