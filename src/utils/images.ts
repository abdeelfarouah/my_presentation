// Centralized image paths

// Helper function to ensure correct image paths
export const getImagePath = (path: string) => {
  // In Vercel, we need to use absolute paths
  return path.startsWith('http') ? path : `/${path.replace(/^\//, '')}`;
};

// Local images
export const PROFILE_IMAGE = getImagePath('images/cv.jpg');
export const NAV_IMAGE = getImagePath('images/profile.jpg');

// Remote project images
export const PROJECT_IMAGES = {
  CHIFOUMI: 'https://raw.githubusercontent.com/abdeelfarouah/chifoumi/refs/heads/main/image.png',
  POKEDEX: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&q=80&w=800&h=500',
  PUZZLE: 'https://raw.githubusercontent.com/abdeelfarouah/puzzle/refs/heads/main/hero.jpg?auto=format&fit=crop&q=800&w=800&h=500',
  SNAKE: 'https://raw.githubusercontent.com/abdeelfarouah/retro-snake-game/refs/heads/main/IMG_5666.jpeg'
};