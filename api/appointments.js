import nodemailer from 'nodemailer';

let appointments = []; // mémoire temporaire (sera réinitialisée à chaque déploiement)

async function sendNotificationEmail(appointment) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_TO } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !NOTIFY_TO) {
    return; // si non configuré, on ignore silencieusement
  }
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT, 10),
    secure: parseInt(SMTP_PORT, 10) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  const when = new Date(appointment.date).toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short' });
  const info = await transporter.sendMail({
    from: `RDV Bot <${SMTP_USER}>`,
    to: NOTIFY_TO,
    subject: `Nouveau rendez-vous: ${appointment.name}`,
    text: `Nom: ${appointment.name}\nEmail: ${appointment.email}\nDate: ${when}`,
    html: `<p><strong>Nom:</strong> ${appointment.name}</p><p><strong>Email:</strong> ${appointment.email}</p><p><strong>Date:</strong> ${when}</p>`,
  });
  return info;
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(appointments);
  } else if (req.method === 'POST') {
    const { name, email, date } = req.body;
    if (!name || !email || !date) {
      return res.status(400).json({ error: 'Données manquantes' });
    }
    const appointment = { id: appointments.length + 1, name, email, date };
    appointments.push(appointment);
    try {
      await sendNotificationEmail(appointment);
    } catch (_) {
      // ne bloque pas la création en cas d'échec d'email
    }
    res.status(200).json({ success: true, appointment });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
