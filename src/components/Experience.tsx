import Container from './shared/Container';
import SectionTitle from './shared/SectionTitle';
import ExperienceList from './experience/ExperienceList';
import { experiences } from '../data/experiences';

export default function Experience() {
  return (
    <section className="py-4 sm:py-6 md:py-8 bg-gray-50 dark:bg-gray-800">
      <Container>
        <div className="max-w-5xl mx-auto px-2 sm:px-4">
          <SectionTitle>Parcours professionnel</SectionTitle>
          <ExperienceList experiences={experiences} />
        </div>
      </Container>
    </section>
  );
}
