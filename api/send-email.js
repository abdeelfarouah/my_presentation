import { Resend } from 'resend';

const {
  RESEND_API_KEY,
  NOTIFY_TO,
  RESEND_FROM,
  EMAIL_MODE
} = process.env;

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// 🔑 DESTINATAIRE SELON LE MODE
const getNotifyTo = () => {
  // Resend MODE TEST → uniquement l’email du compte
  if (EMAIL_MODE !== 'prod') {
    return 'a.elfarouahdev@outlook.fr';
  }
  return NOTIFY_TO;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!resend) {
      return res.status(500).json({
        error: 'RESEND_API_KEY is not configured on the server',
      });
    }

    if (!NOTIFY_TO) {
      return res.status(500).json({
        error: 'NOTIFY_TO is not configured on the server',
      });
    }

    const { name, email, message } = req.body;

    // Validation basique
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Tous les champs sont obligatoires',
      });
    }

    // Vérification email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Format d'email invalide",
      });
    }

    // FROM sécurisé
    const getFromEmail = () => {
      if (!RESEND_FROM) {
        return 'Portfolio <onboarding@resend.dev>';
      }

      const emailMatch =
        RESEND_FROM.match(/<([^>]+)>/) || [null, RESEND_FROM];

      const fromEmail = emailMatch[1] || RESEND_FROM;
      const emailLower = fromEmail.toLowerCase();

      const unverifiedDomains = [
        '@outlook.',
        '@gmail.',
        '@hotmail.',
        '@yahoo.',
        '@live.',
        '@msn.',
        '@icloud.',
        '@me.com',
        '@mac.com',
      ];

      if (unverifiedDomains.some(d => emailLower.includes(d))) {
        console.warn(
          `[Email] Domaine non vérifié détecté (${fromEmail}), fallback Resend`
        );
        return 'Portfolio <onboarding@resend.dev>';
      }

      return RESEND_FROM;
    };

    const fromEmail = getFromEmail();
    const notifyTo = getNotifyTo();

    // 🔍 LOG DE DEBUG
    console.log('[EMAIL DEBUG]', {
      EMAIL_MODE,
      to: notifyTo,
      from: fromEmail,
      reply_to: email,
    });

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: notifyTo,
      reply_to: email,
      subject: `Nouveau message de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Nouveau message de contact</h2>
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
      `,
    });

    if (error) {
      console.error('[Resend Error]', error);
      return res.status(400).json({
        error: "Erreur lors de l'envoi du message",
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Message envoyé avec succès !',
      emailId: data?.id || null,
    });

  } catch (err) {
    console.error('[Server Error]', err);
    return res.status(500).json({
      error: "Une erreur est survenue lors de l'envoi du message",
    });
  }
}
