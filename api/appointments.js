let appointments = []; // mémoire temporaire (sera réinitialisée à chaque déploiement)

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(appointments);
  } else if (req.method === 'POST') {
    const { name, email, date } = req.body;
    if (!name || !email || !date) {
      return res.status(400).json({ error: 'Données manquantes' });
    }
    const appointment = { id: appointments.length + 1, name, email, date };
    appointments.push(appointment);
    res.status(200).json({ success: true, appointment });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
