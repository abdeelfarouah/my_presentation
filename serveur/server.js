// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
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
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_TO } = process.env;
  if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && NOTIFY_TO) {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT, 10),
      secure: parseInt(SMTP_PORT, 10) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    const when = new Date(appointment.date).toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short' });
    transporter.sendMail({
      from: `RDV Bot <${SMTP_USER}>`,
      to: NOTIFY_TO,
      subject: `Nouveau rendez-vous: ${appointment.name}`,
      text: `Nom: ${appointment.name}\nEmail: ${appointment.email}\nDate: ${when}`,
      html: `<p><strong>Nom:</strong> ${appointment.name}</p><p><strong>Email:</strong> ${appointment.email}</p><p><strong>Date:</strong> ${when}</p>`,
    }).catch(() => {});
  }
  res.json({ success: true, appointment });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
