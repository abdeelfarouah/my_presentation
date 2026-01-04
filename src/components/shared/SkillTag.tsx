interface SkillTagProps {
  skill: string;
}

export default function SkillTag({ skill }: SkillTagProps) {
  return (
    <span className="px-2 py-1 bg-bg-secondary border border-border-color rounded text-sm text-text-secondary hover:text-accent hover:border-accent transition-all font-body">
      {skill}
    </span>
  );
}