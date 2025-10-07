import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

let appointments = [];

async function sendNotificationEmail(appointment) {
  const { NOTIFY_TO } = process.env;
  if (!NOTIFY_TO) return;

  const when = new Date(appointment.date).toLocaleString('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'short'
  });

  const { data, error } = await resend.emails.send({
    from: 'RDV Bot <onboarding@resend.dev>', // adresse par défaut fournie
    to: NOTIFY_TO,
    subject: `Nouveau rendez-vous: ${appointment.name}`,
    html: `
      <p><strong>Nom:</strong> ${appointment.name}</p>
      <p><strong>Email:</strong> ${appointment.email}</p>
      <p><strong>Date:</strong> ${when}</p>
    `,
  });

  if (error) throw error;
  return data;
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
        notification: info?.id || null,
      });
    } catch (e) {
      console.error('Erreur email:', e);
      return res.status(200).json({
        success: true,
        appointment,
        notification: null,
        emailError: e?.message || 'Erreur API',
      });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Méthode ${req.method} non autorisée`);
}
