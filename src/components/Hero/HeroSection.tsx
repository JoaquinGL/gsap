import React, { useEffect, useRef, Suspense } from 'react';
import { gsap } from 'gsap';
import styles from './styles.module.scss';
import { HeroSectionProps } from './types';

// Usamos React.lazy para cargar Spline de manera asíncrona
const Spline = React.lazy(() => import('@splinetool/react-spline'));

const HeroSection: React.FC<HeroSectionProps> = ({
  onExitComplete,
  startExitAnimation,
  onPressButtonCallback,
  title,
  subtitle,
  ctaText,
}) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const splineContainerRef = useRef<HTMLDivElement>(null);
  const scene = 'https://prod.spline.design/elVVkjEYO7m4X3wL/scene.splinecode';

  useEffect(() => {
    // Animación de entrada
    const timeline = gsap.timeline();

    timeline
      .fromTo(
        splineContainerRef.current,
        {
          opacity: 0,
          scale: 0.8,
          yPercent: -20, // Aparece ligeramente por encima
        },
        {
          opacity: 1,
          scale: 1,
          yPercent: -20, // Se mantiene en esta posición durante la animación inicial
          duration: 2,
          ease: 'elastic.out(1, 0.3)', // Efecto de rebote inicial
        },
      )
      .to(splineContainerRef.current, {
        yPercent: 0, // Se desplaza a su posición final (parte inferior)
        duration: 1.5, // Duración del desplazamiento
        ease: 'power3.out', // Suavizado del desplazamiento
        // Se solapan las animaciones siguientes con esta
      })
      // Animaciones de los textos mientras el spline se desplaza
      .fromTo(
        headingRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' },
        '-=1.5', // Se solapa justo cuando comienza el desplazamiento del spline
      )
      .fromTo(
        paragraphRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' },
        '-=1.25', // Se solapa un poco antes de que termine el heading
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.3)' },
        '-=1', // Se solapa ligeramente después de la aparición del párrafo
      );
  }, []);

  useEffect(() => {
    if (startExitAnimation && heroRef.current) {
      // Animación de salida
      gsap.to(heroRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.in',
        onComplete: onExitComplete,
      });
    }
  }, [startExitAnimation, onExitComplete]);

  return (
    <div ref={heroRef} className={styles['c-hero-section']}>
      <div className={styles.textContainer}>
        <h1 ref={headingRef}>{title}</h1>
        <p ref={paragraphRef}>{subtitle}</p>
        {ctaText && (
          <button
            ref={buttonRef}
            className={styles['c-hero-button']}
            onClick={onPressButtonCallback}
          >
            {ctaText}
          </button>
        )}
      </div>
      <div ref={splineContainerRef} className={styles.splineContainer}>
        <Suspense fallback={<div>Loading...</div>}>
          <Spline scene={scene} />
        </Suspense>
      </div>
    </div>
  );
};

export default HeroSection;
