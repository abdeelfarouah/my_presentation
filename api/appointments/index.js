// Ce fichier est une API serverless pour gérer les rendez-vous
// Il utilise le système de Serverless Functions de Vercel

// Pour le développement local, nous utilisons un tableau en mémoire
// En production, vous devriez utiliser une base de données comme MongoDB, PostgreSQL, etc.
let appointments = [];

// Fonction utilitaire pour gérer les réponses HTTP
const respond = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
  body: JSON.stringify(body),
});

// Vérifier l'authentification (très basique, à améliorer en production)
const isAuthenticated = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return false;
  
  const token = authHeader.split(' ')[1];
  // En production, utilisez une vérification de token JWT ou similaire
  return token === process.env.ADMIN_TOKEN;
};

// Gestion des requêtes OPTIONS pour CORS
if (req.method === 'OPTIONS') {
  return respond(200, {});
}

// Gestion des différentes méthodes HTTP
export default async function handler(req, res) {
  const { method } = req;
  
  try {
    // Récupérer tous les rendez-vous (GET /api/appointments)
    if (method === 'GET') {
      if (!isAuthenticated(req)) {
        return respond(401, { error: 'Non autorisé' });
      }
      
      // Trier les rendez-vous par date
      const sortedAppointments = [...appointments].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      
      return respond(200, sortedAppointments);
    }
    
    // Créer un nouveau rendez-vous (POST /api/appointments)
    if (method === 'POST') {
      const { name, email, phone, date, message } = req.body;
      
      // Validation des données
      if (!name || !email || !phone || !date) {
        return respond(400, { error: 'Tous les champs obligatoires doivent être remplis' });
      }
      
      // Créer un nouvel ID (à remplacer par un ID unique dans une vraie base de données)
      const id = Date.now().toString();
      
      const newAppointment = {
        id,
        name,
        email,
        phone,
        date,
        message: message || '',
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      // Ajouter le rendez-vous (dans une vraie application, enregistrez dans une base de données)
      appointments.push(newAppointment);
      
      // Envoyer un email de confirmation (à implémenter)
      // await sendConfirmationEmail(newAppointment);
      
      return respond(201, newAppointment);
    }
    
    // Mettre à jour le statut d'un rendez-vous (PATCH /api/appointments/:id)
    if (method === 'PATCH') {
      if (!isAuthenticated(req)) {
        return respond(401, { error: 'Non autorisé' });
      }
      
      const { id } = req.query;
      const { status } = req.body;
      
      if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
        return respond(400, { error: 'Statut invalide' });
      }
      
      const appointmentIndex = appointments.findIndex(a => a.id === id);
      
      if (appointmentIndex === -1) {
        return respond(404, { error: 'Rendez-vous non trouvé' });
      }
      
      // Mettre à jour le statut
      appointments[appointmentIndex].status = status;
      
      // Envoyer une notification (à implémenter)
      // if (status === 'confirmed') {
      //   await sendConfirmationEmail(appointments[appointmentIndex]);
      // }
      
      return respond(200, appointments[appointmentIndex]);
    }
    
    // Méthode non autorisée
    return respond(405, { error: 'Méthode non autorisée' });
    
  } catch (error) {
    console.error('Erreur API:', error);
    return respond(500, { error: 'Erreur serveur interne' });
  }
}
