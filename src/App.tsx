import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import Container from './components/Basic/Container/Container';
import HeroSection from './components/Hero/HeroSection';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const App = () => {
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Selecciona el contenedor principal para cambiar su fondo
    const appElement = appRef.current;

    // Configura el ScrollTrigger
    ScrollTrigger.create({
      trigger: secondSectionRef.current, // Inicia el trigger al acercarse a la segunda sección
      start: 'top bottom', // Inicia cuando la parte superior del segundo contenedor entra en el viewport
      end: 'top top', // Termina cuando la parte superior del segundo contenedor está en la parte superior del viewport
      scrub: 1, // Sincroniza la animación con el scroll
      onUpdate: (self) => {
        const progress = self.progress;

        gsap.to(appElement, {
          backgroundColor: gsap.utils.interpolate(
            'rgb(234, 234, 255)', // Color inicial
            'rgb(223, 113, 185)', // Color final
            progress, // Progreso del scroll (de 0 a 1)
          ),
          duration: 0.1, // Actualiza rápidamente en cada cambio
        });
      },
    });
  }, []);

  const handleStartTransition = () => {
    if (secondSectionRef.current) {
      const targetY = secondSectionRef.current.offsetTop; // La posición exacta de la segunda sección
      gsap.to(window, {
        scrollTo: { y: targetY }, // Scroll hasta la posición exacta del contenedor
        duration: 1, // Duración del scroll suave
        ease: 'power3.out', // Suavizado del desplazamiento
      });
    }
  };

  return (
    <div ref={appRef} className='App'>
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
      <Container isTransparent={true}>
        <div ref={secondSectionRef}></div>
      </Container>
    </div>
  );
};

export default App;
