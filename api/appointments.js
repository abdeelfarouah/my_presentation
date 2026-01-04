import { sendEmailWithRetry, getSecureFromEmail, getNotifyTo } from './utils/email.js';

// ⚠️ ATTENTION: Dans un environnement serverless (Vercel), ce tableau est réinitialisé à chaque invocation
// Les rendez-vous ne sont PAS persistés entre les requêtes. Pour la production, utilisez une base de données
// (ex: Vercel KV, MongoDB, PostgreSQL, etc.)
// En développement local avec le serveur Express, les données persistent pendant l'exécution du serveur
let appointments = [];

async function sendNotificationEmail(appointment) {
  const when = new Date(appointment.date).toLocaleString('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'short'
  });

  const fromEmail = getSecureFromEmail('RDV Bot');
  const notifyTo = getNotifyTo();

  console.log('[Appointment] Envoi notification:', {
    from: fromEmail,
    to: notifyTo,
    appointmentId: appointment.id
  });

  const data = await sendEmailWithRetry({
    from: fromEmail,
    to: notifyTo,
    subject: `Nouveau rendez-vous: ${appointment.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #F26B2E;">Nouveau rendez-vous</h2>
        <p><strong>Nom:</strong> ${appointment.name}</p>
        <p><strong>Email:</strong> ${appointment.email}</p>
        <p><strong>Date:</strong> ${when}</p>
        <hr style="border: 1px solid #2B3E50; margin: 20px 0;">
        <p style="font-size: 0.9em; color: #666;">
          Ce message a été envoyé automatiquement depuis votre site portfolio.
        </p>
      </div>
    `
  });

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
      const notifyTo = getNotifyTo();
      
      console.log('[Appointment] Rendez-vous créé et notification envoyée:', {
        appointmentId: appointment.id,
        emailId: info?.id,
        to: notifyTo
      });

      return res.status(200).json({
        success: true,
        appointment,
        notification: info?.id || null,
        emailSent: true,
        emailTo: notifyTo
      });
    } catch (e) {
      console.error('[Appointment] Erreur lors de l\'envoi de l\'email:', {
        error: e?.message,
        stack: e?.stack,
        appointmentId: appointment.id
      });

      return res.status(200).json({
        success: true,
        appointment,
        notification: null,
        emailSent: false,
        emailError: e?.message || 'Erreur API'
      });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Méthode ${req.method} non autorisée`);
}