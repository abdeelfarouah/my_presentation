import { Resend } from 'resend';
import cookie from 'cookie';

const { RESEND_API_KEY, NOTIFY_TO, RESEND_FROM, EMAIL_MODE } = process.env;

// Instance Resend partagée
export const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// Domaines non vérifiés par Resend
const UNVERIFIED_DOMAINS = [
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

// Limites de rate limiting
const RATE_LIMITS = {
  email: {
    maxRequests: 3,
    windowMs: 3600000 // 1 heure
  },
  appointment: {
    maxRequests: 5,
    windowMs: 3600000 // 1 heure
  }
};

/**
 * Parse les cookies de la requête
 */
export function parseCookies(req) {
  const cookieHeader = req.headers.cookie || '';
  return cookie.parse(cookieHeader);
}

/**
 * Définit un cookie dans la réponse
 */
export function setCookie(res, name, value, options = {}) {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 3600, // 1 heure par défaut
    ...options
  };

  const serialized = cookie.serialize(name, value, cookieOptions);
  
  // Ajouter le cookie aux headers existants
  const existingCookies = res.getHeader('Set-Cookie') || [];
  const cookies = Array.isArray(existingCookies) ? existingCookies : [existingCookies];
  cookies.push(serialized);
  
  res.setHeader('Set-Cookie', cookies);
}

/**
 * Vérifie le rate limiting basé sur les cookies
 */
export function checkRateLimit(req, type = 'email') {
  const cookies = parseCookies(req);
  const cookieName = `rl_${type}`;
  const limit = RATE_LIMITS[type];

  if (!limit) {
    throw new Error(`Type de rate limit inconnu: ${type}`);
  }

  const rateLimitData = cookies[cookieName];
  
  if (!rateLimitData) {
    // Première requête
    return {
      allowed: true,
      remaining: limit.maxRequests - 1,
      resetAt: Date.now() + limit.windowMs
    };
  }

  try {
    const data = JSON.parse(decodeURIComponent(rateLimitData));
    const now = Date.now();

    // Fenêtre expirée, réinitialiser
    if (now > data.resetAt) {
      return {
        allowed: true,
        remaining: limit.maxRequests - 1,
        resetAt: now + limit.windowMs
      };
    }

    // Vérifier si limite atteinte
    if (data.count >= limit.maxRequests) {
      const waitTime = Math.ceil((data.resetAt - now) / 60000); // en minutes
      return {
        allowed: false,
        remaining: 0,
        resetAt: data.resetAt,
        retryAfter: waitTime
      };
    }

    // Incrémenter le compteur
    return {
      allowed: true,
      remaining: limit.maxRequests - data.count - 1,
      resetAt: data.resetAt,
      count: data.count + 1
    };

  } catch (e) {
    // Cookie corrompu, réinitialiser
    return {
      allowed: true,
      remaining: limit.maxRequests - 1,
      resetAt: Date.now() + limit.windowMs
    };
  }
}

/**
 * Met à jour le cookie de rate limiting
 */
export function updateRateLimit(res, type, rateLimitInfo) {
  const cookieName = `rl_${type}`;
  const data = {
    count: rateLimitInfo.count || 1,
    resetAt: rateLimitInfo.resetAt
  };

  setCookie(res, cookieName, JSON.stringify(data), {
    maxAge: Math.ceil((rateLimitInfo.resetAt - Date.now()) / 1000)
  });
}

/**
 * Détermine le destinataire selon le mode email
 * En mode non-prod, les emails vont au compte de dev
 */
export function getNotifyTo() {
  if (EMAIL_MODE !== 'prod') {
    return 'a.elfarouahdev@outlook.fr';
  }
  return NOTIFY_TO;
}

/**
 * Génère un email FROM sécurisé
 * Utilise le domaine par défaut Resend si domaine non vérifié
 */
export function getSecureFromEmail(defaultName = 'RDV Bot') {
  if (!RESEND_FROM) {
    return `${defaultName} <onboarding@resend.dev>`;
  }

  // Extraire l'email du format "Name <email>" ou juste email
  const emailMatch = RESEND_FROM.match(/<([^>]+)>/) || [null, RESEND_FROM];
  const email = emailMatch[1] || RESEND_FROM;
  const emailLower = email.toLowerCase();

  // Vérifier si le domaine est non vérifié
  const isUnverified = UNVERIFIED_DOMAINS.some(domain => emailLower.includes(domain));

  if (isUnverified) {
    console.warn(`[Email] Domaine non vérifié détecté: ${email}, fallback sur Resend`);
    return `${defaultName} <onboarding@resend.dev>`;
  }

  return RESEND_FROM;
}

/**
 * Envoie un email avec retry automatique si domaine non vérifié
 */
export async function sendEmailWithRetry({ from, to, subject, html, replyTo = null }) {
  if (!resend) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const emailPayload = {
    from,
    to,
    subject,
    html
  };

  if (replyTo) {
    emailPayload.reply_to = replyTo;
  }

  console.log('[Email] Envoi:', { from, to, subject });

  const { data, error } = await resend.emails.send(emailPayload);

  // Si erreur de domaine non vérifié, retry avec domaine par défaut
  if (error?.message?.includes('domain is not verified')) {
    console.warn('[Email] Retry avec domaine par défaut Resend');
    
    const retryPayload = {
      ...emailPayload,
      from: 'RDV Bot <onboarding@resend.dev>'
    };

    const { data: retryData, error: retryError } = await resend.emails.send(retryPayload);
    
    if (retryError) {
      console.error('[Email] Erreur lors du retry:', retryError);
      throw retryError;
    }
    
    console.log('[Email] Email envoyé avec succès (retry):', retryData?.id);
    return retryData;
  }

  if (error) {
    console.error('[Email] Erreur Resend:', error);
    throw error;
  }

  console.log('[Email] Email envoyé avec succès:', data?.id);
  return data;
}

/**
 * Valide une configuration email
 */
export function validateEmailConfig() {
  const errors = [];

  if (!RESEND_API_KEY) {
    errors.push('RESEND_API_KEY manquant');
  }

  if (!NOTIFY_TO) {
    errors.push('NOTIFY_TO manquant');
  }

  return {
    isValid: errors.length === 0,
    errors,
    config: {
      hasApiKey: !!RESEND_API_KEY,
      hasNotifyTo: !!NOTIFY_TO,
      hasResendFrom: !!RESEND_FROM,
      emailMode: EMAIL_MODE || 'prod'
    }
  };
}