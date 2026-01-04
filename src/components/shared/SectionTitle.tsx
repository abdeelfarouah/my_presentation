interface SectionTitleProps {
  children: React.ReactNode;
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="text-2xl sm:text-3xl font-display font-bold text-center text-text-main mb-4 sm:mb-6 md:mb-10">
      {children}
    </h2>
  );
}