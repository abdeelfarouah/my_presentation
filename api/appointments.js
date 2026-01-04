import { Resend } from 'resend';

const { RESEND_API_KEY, NOTIFY_TO, RESEND_FROM } = process.env;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// ⚠️ ATTENTION: Dans un environnement serverless (Vercel), ce tableau est réinitialisé à chaque invocation
// Les rendez-vous ne sont PAS persistés entre les requêtes. Pour la production, utilisez une base de données
// (ex: Vercel KV, MongoDB, PostgreSQL, etc.)
// En développement local avec le serveur Express, les données persistent pendant l'exécution du serveur
let appointments = [];

async function sendNotificationEmail(appointment) {
  if (!resend) {
    throw new Error('RESEND_API_KEY is not configured on the server');
  }

  if (!NOTIFY_TO) {
    throw new Error('NOTIFY_TO is not configured on the server');
  }

  const when = new Date(appointment.date).toLocaleString('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'short'
  });

  // Utiliser le domaine par défaut de Resend si RESEND_FROM n'est pas configuré ou contient un domaine non vérifié
  // Les domaines vérifiés dans Resend sont généralement des domaines personnalisés
  // Le domaine par défaut onboarding@resend.dev fonctionne toujours
  // Détection robuste des domaines non vérifiés (outlook, gmail, hotmail, yahoo, etc.)
  const getFromEmail = () => {
    if (!RESEND_FROM) {
      return 'RDV Bot <onboarding@resend.dev>';
    }
    
    // Extraire l'email si format "Name <email>" ou juste l'email
    const emailMatch = RESEND_FROM.match(/<([^>]+)>/) || [null, RESEND_FROM];
    const email = emailMatch[1] || RESEND_FROM;
    const emailLower = email.toLowerCase();
    
    // Liste des domaines non vérifiés
    const unverifiedDomains = [
      '@outlook.',
      '@gmail.',
      '@hotmail.',
      '@yahoo.',
      '@live.',
      '@msn.',
      '@icloud.',
      '@me.com',
      '@mac.com'
    ];
    
    const isUnverified = unverifiedDomains.some(domain => emailLower.includes(domain));
    
    if (isUnverified) {
      console.warn(`[Email] Domaine non vérifié détecté dans RESEND_FROM: ${email}, utilisation du domaine par défaut`);
      return 'RDV Bot <onboarding@resend.dev>';
    }
    
    return RESEND_FROM;
  };
  
  const fromEmail = getFromEmail();

  console.log('[Email] Tentative d\'envoi:', {
    from: fromEmail,
    to: NOTIFY_TO,
    subject: `Nouveau rendez-vous: ${appointment.name}`
  });

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: NOTIFY_TO,
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
    `,
  });

  if (error) {
    console.error('[Email] Erreur Resend:', error);
    // Si l'erreur concerne un domaine non vérifié, utiliser le domaine par défaut
    if (error.message && error.message.includes('domain is not verified')) {
      console.warn('[Email] Domaine non vérifié détecté, utilisation du domaine par défaut Resend');
      const { data: retryData, error: retryError } = await resend.emails.send({
        from: 'RDV Bot <onboarding@resend.dev>',
        to: NOTIFY_TO,
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
        `,
      });
      if (retryError) {
        console.error('[Email] Erreur lors du retry:', retryError);
        throw retryError;
      }
      console.log('[Email] Email envoyé avec succès (retry):', retryData?.id);
      return retryData;
    }
    throw error;
  }

  console.log('[Email] Email envoyé avec succès:', data?.id);
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
      console.log('[Appointment] Rendez-vous créé et notification envoyée:', {
        appointmentId: appointment.id,
        emailId: info?.id,
        to: NOTIFY_TO
      });
      return res.status(200).json({
        success: true,
        appointment,
        notification: info?.id || null,
        emailSent: true,
        emailTo: NOTIFY_TO
      });
    } catch (e) {
      console.error('[Appointment] Erreur lors de l\'envoi de l\'email:', {
        error: e?.message,
        stack: e?.stack,
        to: NOTIFY_TO,
        appointmentId: appointment.id
      });
      return res.status(200).json({
        success: true,
        appointment,
        notification: null,
        emailSent: false,
        emailError: e?.message || 'Erreur API',
        emailTo: NOTIFY_TO
      });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Méthode ${req.method} non autorisée`);
}
