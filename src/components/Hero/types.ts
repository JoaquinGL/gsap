// src/components/types.ts

export interface HeroSectionProps {
  onExitComplete: () => void;
  startExitAnimation: boolean;
  onPressButtonCallback: () => void; 
  ctaText?: string;
  title?: string;
  subtitle?: string;
}
