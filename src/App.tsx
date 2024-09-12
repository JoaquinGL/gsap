import React, { useRef } from 'react';
import HeroSection from './components/Hero/HeroSection';
import Container from './components/Basic/Container/Container';

const App: React.FC = () => {
  const secondSectionRef = useRef<HTMLDivElement>(null);

  const handleStartTransition = () => {
    if (secondSectionRef.current) {
      window.scrollTo({
        top: secondSectionRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='App'>
      <Container>
        <HeroSection
          startExitAnimation={false}
          onExitComplete={() => {}}
          onPressButtonCallback={handleStartTransition}
          title='Create, Inspire, Transform'
          subtitle='Explore my space of ideas, projects, and creative workshops.'
          ctaText='Enter'
        />
      </Container>
      <Container>
        <div ref={secondSectionRef}>
          <h1>Este es el paso dos</h1>
        </div>
      </Container>
    </div>
  );
};

export default App;
