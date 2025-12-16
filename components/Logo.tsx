'use client';

import Image from 'next/image';
import { useTheme } from './ThemeProvider';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

/**
 * Theme-aware Logo component
 * Automatically swaps between light and dark logo variants based on app theme
 * Supports both app-controlled theme (.dark class) and system preference
 * Cyan icon mark remains unchanged; only text color adapts for contrast
 */
export default function Logo({ 
  width = 160, 
  height = 40, 
  className = '',
  priority = false 
}: LogoProps) {
  const { theme, isReady } = useTheme();
  
  // Use dark logo when theme is dark and ready
  // Default to light logo during SSR/initial render to avoid hydration mismatch
  const logoSrc = isReady && theme === 'dark' ? '/logo-dark.svg' : '/logo.svg';

  return (
    <Image
      src={logoSrc}
      alt="Relay"
      width={width}
      height={height}
      priority={priority}
      className={`app-logo transition-opacity duration-200 ${className}`}
    />
  );
}

