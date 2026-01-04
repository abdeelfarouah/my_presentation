import { Experience } from '../../types/experience';
import SkillTag from '../shared/SkillTag';

export default function ExperienceCard({
  title,
  period,
  type,
  description,
  skills
}: Experience) {
  return (
    <div className="card">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h3 className="text-xl font-display font-semibold text-text-main">{title}</h3>
          <p className="text-text-secondary font-body">{period}</p>
        </div>
        <span className="inline-block px-3 py-1 mt-2 md:mt-0 rounded-full text-sm font-medium bg-accent/20 text-accent border border-accent/30 font-body">
          {type}
        </span>
      </div>
      
      <p className="text-text-secondary mb-4 font-body">{description}</p>
      
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillTag key={skill} skill={skill} />
        ))}
      </div>
    </div>
  );
}