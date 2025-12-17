interface SkillCardProps {
  title: string;
  skills: string[];
}

export default function SkillCard({ title, skills }: SkillCardProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">{title}</h3>
      <div className="grid grid-cols-2 gap-2">
        {skills.map((skill) => (
          <div
            key={skill}
            className="bg-gray-100 px-3 py-2 rounded-lg text-gray-700 text-sm"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}