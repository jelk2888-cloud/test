
import { Particle } from '../types';
import { COLORS, BIG_DIPPER_STARS } from '../constants';

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const updateParticleTargets = (
  particles: Particle[], 
  scene: string, 
  width: number, 
  height: number,
  time: number
) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = Math.min(width, height) * 0.4;

  particles.forEach((p, i) => {
    switch (scene) {
      case 'UNIVERSE': {
        // Random starfield with slow drift
        const seed = i * 137.5;
        const radius = Math.sqrt(Math.random()) * scale * 1.5;
        const angle = seed;
        p.targetX = centerX + Math.cos(angle) * radius;
        p.targetY = centerY + Math.sin(angle) * radius;
        p.targetZ = (Math.random() - 0.5) * 200;
        p.color = Math.random() > 0.8 ? COLORS.CYAN : COLORS.WHITE;
        break;
      }
      case 'BLACK_HOLE': {
        // Swirling vortex
        const angle = (i / particles.length) * Math.PI * 20 + time * 0.001;
        const dist = (i / particles.length) * scale * 0.8 + 20;
        const wobble = Math.sin(time * 0.002 + i) * 10;
        p.targetX = centerX + Math.cos(angle) * (dist + wobble);
        p.targetY = centerY + Math.sin(angle) * (dist + wobble) * 0.3; // Flat disk
        p.targetZ = Math.sin(angle) * 20;
        p.color = i % 10 === 0 ? COLORS.WHITE : COLORS.CYAN;
        break;
      }
      case 'DNA_HELIX': {
        // Intertwined double helix
        const strand = i % 2;
        const t = (i / particles.length) * 2 - 1;
        const helixAngle = t * Math.PI * 4 + (strand * Math.PI) + time * 0.001;
        const helixRadius = scale * 0.3;
        p.targetX = centerX + Math.cos(helixAngle) * helixRadius;
        p.targetY = centerY + t * scale;
        p.targetZ = Math.sin(helixAngle) * helixRadius;
        p.color = strand === 0 ? COLORS.CYAN : COLORS.WHITE;
        break;
      }
      case 'CELESTIAL_ORBIT': {
        // Sun, Earth, Moon
        if (i < particles.length * 0.4) {
          // Sun (Center)
          const angle = Math.random() * Math.PI * 2;
          const r = Math.random() * 50;
          p.targetX = centerX + Math.cos(angle) * r;
          p.targetY = centerY + Math.sin(angle) * r;
          p.color = COLORS.WHITE;
        } else if (i < particles.length * 0.8) {
          // Earth
          const earthAngle = time * 0.0005;
          const orbitR = scale * 0.7;
          const localAngle = Math.random() * Math.PI * 2;
          const localR = Math.random() * 20;
          p.targetX = centerX + Math.cos(earthAngle) * orbitR + Math.cos(localAngle) * localR;
          p.targetY = centerY + Math.sin(earthAngle) * orbitR + Math.sin(localAngle) * localR;
          p.color = COLORS.CYAN;
        } else {
          // Moon
          const earthAngle = time * 0.0005;
          const orbitR = scale * 0.7;
          const moonOrbitR = 40;
          const moonAngle = time * 0.002;
          const localAngle = Math.random() * Math.PI * 2;
          const localR = Math.random() * 8;
          p.targetX = centerX + Math.cos(earthAngle) * orbitR + Math.cos(moonAngle) * moonOrbitR + Math.cos(localAngle) * localR;
          p.targetY = centerY + Math.sin(earthAngle) * orbitR + Math.sin(moonAngle) * moonOrbitR + Math.sin(localAngle) * localR;
          p.color = COLORS.WHITE;
        }
        break;
      }
      case 'CONSTELLATION': {
        // Big Dipper + North Star
        const starIdx = i % BIG_DIPPER_STARS.length;
        const star = BIG_DIPPER_STARS[starIdx];
        const spread = (i / particles.length) * 40 - 20;
        p.targetX = centerX + star.x * scale + spread;
        p.targetY = centerY + star.y * scale + spread;
        p.color = star.isNorthStar ? COLORS.CYAN : COLORS.WHITE;
        // Brightness variation
        p.opacity = star.isNorthStar ? 1.0 : 0.6 + Math.random() * 0.4;
        break;
      }
    }
  });
};
