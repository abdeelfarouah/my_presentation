export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Méthode non autorisée' 
    });
  }

  try {
    const { code } = req.body;
    
    if (!code || typeof code !== 'string') {
      return res.status(400).json({ 
        success: false, 
        error: 'Code manquant ou invalide' 
      });
    }

    const expectedCode = process.env.DIGICODE;
    
    if (!expectedCode) {
      console.error('DIGICODE is not set in environment variables');
      return res.status(500).json({ 
        success: false, 
        error: 'Configuration serveur incorrecte' 
      });
    }

    const isValid = code === expectedCode;
    
    return res.status(200).json({ 
      success: isValid,
      message: isValid ? 'Code valide' : 'Code invalide'
    });
    
  } catch (error) {
    console.error('Error in digicode verification:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Erreur lors de la vérification du code' 
    });
  }
}
