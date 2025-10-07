import nodemailer from 'nodemailer';

let appointments = []; // stockage temporaire

async function sendNotificationEmail(appointment) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_TO } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !NOTIFY_TO) {
    console.warn('⚠️ Variables SMTP manquantes, notification ignorée.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465, // false pour 587
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    requireTLS: true,       // ✅ STARTTLS forcé pour Outlook
    logger: true,           // ✅ pour voir les logs SMTP
    debug: true             // ✅ détails de connexion
  });

  console.log('→ Vérification de la connexion SMTP...');
  await transporter.verify();
  console.log('✅ SMTP vérifié, envoi en cours...');

  const when = new Date(appointment.date).toLocaleString('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'short'
  });

  const info = await transporter.sendMail({
    from: SMTP_USER, // ✅ Outlook exige "from" = adresse authentifiée
    to: NOTIFY_TO,
    subject: `Nouveau rendez-vous: ${appointment.name}`,
    text: `Nom: ${appointment.name}\nEmail: ${appointment.email}\nDate: ${when}`,
    html: `
      <p><strong>Nom:</strong> ${appointment.name}</p>
      <p><strong>Email:</strong> ${appointment.email}</p>
      <p><strong>Date:</strong> ${when}</p>
    `,
  });

  console.log('✉️ Notification email envoyée:', info.messageId);
  return info;
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(appointments);
  }

  if (req.method === 'POST') {
    const { name, email, date } = req.body;
    if (!name || !email || !date) {
      return res.status(400).json({ error: 'Données manquantes' });
    }

    const appointment = { id: appointments.length + 1, name, email, date };
    appointments.push(appointment);

    try {
      const info = await sendNotificationEmail(appointment);
      return res.status(200).json({
        success: true,
        appointment,
        notification: info ? info.messageId : null,
      });
    } catch (e) {
      console.error('❌ Erreur envoi email:', e);
      return res.status(200).json({
        success: true,
        appointment,
        notification: null,
        emailError: e?.message || 'SMTP error',
      });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Méthode ${req.method} non autorisée`);
}
