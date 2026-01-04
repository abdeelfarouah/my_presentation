import { 
  sendEmailWithRetry, 
  getSecureFromEmail, 
  getNotifyTo, 
  validateEmailConfig,
  checkRateLimit,
  updateRateLimit
} from './utils/email.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Vérifier le rate limiting
    const rateLimit = checkRateLimit(req, 'email');
    
    if (!rateLimit.allowed) {
      console.warn('[Contact] Rate limit atteint:', {
        retryAfter: rateLimit.retryAfter,
        resetAt: new Date(rateLimit.resetAt).toISOString()
      });

      return res.status(429).json({
        error: 'Trop de messages envoyés',
        message: `Veuillez réessayer dans ${rateLimit.retryAfter} minute(s)`,
        retryAfter: rateLimit.retryAfter,
        resetAt: rateLimit.resetAt
      });
    }

    // Validation de la configuration
    const configCheck = validateEmailConfig();
    if (!configCheck.isValid) {
      return res.status(500).json({
        error: 'Configuration email incomplète',
        details: configCheck.errors
      });
    }

    const { name, email, message } = req.body;

    // Validation basique
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Tous les champs sont obligatoires'
      });
    }

    // Validation des longueurs
    if (name.length > 100) {
      return res.status(400).json({
        error: 'Le nom est trop long (max 100 caractères)'
      });
    }

    if (message.length > 5000) {
      return res.status(400).json({
        error: 'Le message est trop long (max 5000 caractères)'
      });
    }

    // Vérification email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Format d'email invalide"
      });
    }

    const fromEmail = getSecureFromEmail('RDV Bot');
    const notifyTo = getNotifyTo();

    console.log('[Contact] Envoi message:', {
      from: fromEmail,
      to: notifyTo,
      replyTo: email,
      remaining: rateLimit.remaining
    });

    // Mettre à jour le rate limit
    updateRateLimit(res, 'email', rateLimit);

    const data = await sendEmailWithRetry({
      from: fromEmail,
      to: notifyTo,
      replyTo: email,
      subject: `Nouveau message de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #F26B2E;">Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Message :</strong></p>
          <div style="background:#f5f5f5;padding:15px;border-radius:5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="margin-top:20px;font-size:0.9em;color:#666;">
            Message envoyé depuis le formulaire de contact du site.
          </p>
        </div>
      `
    });

    return res.status(200).json({
      success: true,
      message: 'Message envoyé avec succès !',
      emailId: data?.id || null,
      rateLimit: {
        remaining: rateLimit.remaining,
        resetAt: rateLimit.resetAt
      }
    });

  } catch (err) {
    console.error('[Contact] Erreur:', err);
    return res.status(500).json({
      error: "Une erreur est survenue lors de l'envoi du message",
      details: err?.message
    });
  }
}