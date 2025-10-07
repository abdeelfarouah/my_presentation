// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 4000;

// Middleware CORS pour ton frontend Vite
app.use(cors({
  origin: 'http://localhost:5173', // <-- doit correspondre exactement à ton frontend
  credentials: true
}));

app.use(bodyParser.json());

// Digicode via variable d'environnement
// Définir DIGICODE dans le fichier .env à la racine de `serveur` (ex: DIGICODE=1234)
app.post('/api/check-digicode', (req, res) => {
  const { code } = req.body || {};
  const expected = process.env.DIGICODE || '';

  if (typeof code !== 'string' || code.length === 0) {
    return res.status(400).json({ success: false, error: 'Code manquant' });
  }

  if (code === expected) {
    return res.json({ success: true });
  }

  return res.status(401).json({ success: false });
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
