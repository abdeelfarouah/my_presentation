export default function handler(req, res) {
  if (req.method === 'POST') {
    const { code } = req.body;
    if (code === '1234') { // digicode exemple
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
