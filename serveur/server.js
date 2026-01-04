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
  origin: (origin, callback) => {
    const allowed = new Set([
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://localhost:5173',
      'http://127.0.0.1:5173',
    ]);

    if (!origin || allowed.has(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
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

app.post('/api/appointments', async (req, res) => {
  const { name, email, date } = req.body;
  if (!name || !email || !date) {
    return res.status(400).json({ error: 'Données manquantes' });
  }

  const appointment = { id: appointments.length + 1, name, email, date };
  appointments.push(appointment);

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_TO } = process.env;

  let emailSent = false;
  let emailError = null;
  let emailId = null;

  // Aligné avec le comportement de l'API Vercel : attendre l'envoi de l'email
  if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && NOTIFY_TO) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT, 10),
        secure: parseInt(SMTP_PORT, 10) === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      const when = new Date(appointment.date).toLocaleString('fr-FR', {
        dateStyle: 'full',
        timeStyle: 'short',
      });

      await transporter.verify();
      const info = await transporter.sendMail({
        from: `${appointment.name} <${SMTP_USER}>`,
        to: NOTIFY_TO,
        subject: 'Vous avez une demande de rendez-vous',
        text: `Nom: ${appointment.name}\nEmail: ${appointment.email}\nDate: ${when}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #F26B2E;">Vous avez une demande de rendez-vous</h2>
            <p><strong>Nom:</strong> ${appointment.name}</p>
            <p><strong>Email:</strong> ${appointment.email}</p>
            <p><strong>Date:</strong> ${when}</p>
            <hr style="border: 1px solid #2B3E50; margin: 20px 0;">
            <p style="font-size: 0.9em; color: #666;">
              Ce message a été envoyé automatiquement depuis votre site portfolio.
            </p>
          </div>
        `,
      });
      
      emailSent = true;
      emailId = info?.messageId || null;
      console.log('[Appointment] Notification email envoyée:', emailId);
    } catch (err) {
      emailError = err?.message || 'Erreur SMTP';
      console.error('[Appointment] Erreur SMTP:', err?.message);
    }
  }

  // Réponse alignée avec l'API Vercel
  return res.status(200).json({
    success: true,
    appointment,
    notification: emailId,
    emailSent,
    emailError,
    emailTo: NOTIFY_TO || null
  });
});

app.listen(PORT, () => console.log(`✅ Serveur en ligne sur http://localhost:${PORT}`));
