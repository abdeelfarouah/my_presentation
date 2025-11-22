import { LucideIcon } from 'lucide-react';

interface SocialIconProps {
  href: string;
  icon: LucideIcon;
  label: string;
  color: string;
}

export default function SocialIcon({ href, icon: Icon, label, color }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors`}
    >
      <Icon size={32} className={`${color} mb-4`} />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{label}</h3>
    </a>
  );
}