import { Resend } from 'resend';

const { RESEND_API_KEY, CONTACT_TO, RESEND_FROM } = process.env;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

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

    if (!CONTACT_TO) {
      return res.status(500).json({
        error: 'CONTACT_TO is not configured on the server',
      });
    }

    const { name, email, message } = req.body;

    // Validation basique
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }

    // Vérification de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Format d\'email invalide' });
    }

    // Utiliser le domaine par défaut de Resend si RESEND_FROM n'est pas configuré ou contient un domaine non vérifié
    // Les domaines vérifiés dans Resend sont généralement des domaines personnalisés
    // Le domaine par défaut onboarding@resend.dev fonctionne toujours
    // Détection robuste des domaines non vérifiés (outlook, gmail, hotmail, yahoo, etc.)
    const getFromEmail = () => {
      if (!RESEND_FROM) {
        return 'onboarding@resend.dev';
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
        return 'onboarding@resend.dev';
      }
      
      return RESEND_FROM;
    };
    
    const fromEmail = getFromEmail();

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: CONTACT_TO,
      reply_to: email,
      subject: `Nouveau message de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Message :</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
            Ce message a été envoyé depuis le formulaire de contact de votre site web.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Erreur Resend:', error);
      // Si l'erreur concerne un domaine non vérifié, réessayer avec le domaine par défaut
      if (error.message && error.message.includes('domain is not verified')) {
        console.warn('Domaine non vérifié détecté, utilisation du domaine par défaut Resend');
        const { data: retryData, error: retryError } = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: CONTACT_TO,
          reply_to: email,
          subject: `Nouveau message de ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Nouveau message de contact</h2>
              <p><strong>Nom :</strong> ${name}</p>
              <p><strong>Email :</strong> ${email}</p>
              <p><strong>Message :</strong></p>
              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
              <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
                Ce message a été envoyé depuis le formulaire de contact de votre site web.
              </p>
            </div>
          `,
        });
        if (retryError) {
          return res.status(400).json({ error: 'Erreur lors de l\'envoi du message' });
        }
        return res.status(200).json({ 
          success: true, 
          message: 'Message envoyé avec succès !' 
        });
      }
      return res.status(400).json({ error: 'Erreur lors de l\'envoi du message' });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Message envoyé avec succès !' 
    });
    
  } catch (error) {
    console.error('Erreur serveur:', error);
    return res.status(500).json({ 
      error: 'Une erreur est survenue lors de l\'envoi du message' 
    });
  }
}
