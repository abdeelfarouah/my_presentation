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
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{period}</p>
        </div>
        <span className="inline-block px-3 py-1 mt-2 md:mt-0 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
          {type}
        </span>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillTag key={skill} skill={skill} />
        ))}
      </div>
    </div>
  );
}