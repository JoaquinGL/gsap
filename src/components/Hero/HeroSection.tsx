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
        headingRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' },
      )
      .fromTo(
        paragraphRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' },
        '-=1',
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.3)' },
        '-=0.5',
      )
      .fromTo(
        splineContainerRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.3)' },
        '-=0.5',
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
