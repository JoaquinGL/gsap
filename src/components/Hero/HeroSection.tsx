import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './styles.module.scss';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
      );
    }
  }, []);

  return (
    <div ref={heroRef} className={styles['c-hero-section']}>
      <h1>Welcome to My Landing Page</h1>
      <p>This is the hero section with GSAP animations.</p>
    </div>
  );
};

export default HeroSection;
