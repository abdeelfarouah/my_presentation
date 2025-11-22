interface SkillBarProps {
  name: string;
  level: number;
}

export default function SkillBar({ name, level }: SkillBarProps) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-gray-700">{name}</span>
        <span className="text-gray-500">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}