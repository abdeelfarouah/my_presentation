import { Resend } from 'resend';

const { RESEND_API_KEY, NOTIFY_TO, RESEND_FROM } = process.env;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Vérification de la configuration
    if (!resend) {
      return res.status(500).json({
        error: 'RESEND_API_KEY is not configured',
        configured: false
      });
    }

    if (!NOTIFY_TO) {
      return res.status(500).json({
        error: 'NOTIFY_TO is not configured',
        configured: false
      });
    }

    const fromEmail = RESEND_FROM && !RESEND_FROM.includes('@outlook.') && !RESEND_FROM.includes('@gmail.') && !RESEND_FROM.includes('@hotmail.')
      ? RESEND_FROM
      : 'RDV Bot <onboarding@resend.dev>';

    console.log('[Test Email] Configuration:', {
      hasResend: !!resend,
      notifyTo: NOTIFY_TO,
      fromEmail: fromEmail
    });

    // Envoi d'un email de test
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: NOTIFY_TO,
      subject: 'Test de notification - Portfolio',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #F26B2E;">Test de notification</h2>
          <p>Si vous recevez cet email, cela signifie que votre configuration est correcte !</p>
          <p><strong>Destinataire configuré:</strong> ${NOTIFY_TO}</p>
          <p><strong>Expéditeur:</strong> ${fromEmail}</p>
          <p><strong>Date du test:</strong> ${new Date().toLocaleString('fr-FR')}</p>
          <hr style="border: 1px solid #2B3E50; margin: 20px 0;">
          <p style="font-size: 0.9em; color: #666;">
            Ce message est un test depuis votre API portfolio.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('[Test Email] Erreur:', error);
      return res.status(400).json({
        success: false,
        error: error.message || 'Erreur lors de l\'envoi',
        details: error
      });
    }

    console.log('[Test Email] Email envoyé avec succès:', data?.id);

    return res.status(200).json({
      success: true,
      message: 'Email de test envoyé avec succès !',
      emailId: data?.id,
      to: NOTIFY_TO,
      from: fromEmail
    });

  } catch (error) {
    console.error('[Test Email] Erreur serveur:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Une erreur est survenue',
      details: error
    });
  }
}

