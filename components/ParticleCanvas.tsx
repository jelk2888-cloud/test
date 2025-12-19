
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { AnimationScene, Particle } from '../types';
import { PARTICLE_COUNT, COLORS } from '../constants';
import { updateParticleTargets } from '../utils/physics';

interface Props {
  currentScene: AnimationScene;
}

const ParticleCanvas: React.FC<Props> = ({ currentScene }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>();

  // Initialize particles
  useEffect(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        z: 0,
        targetX: Math.random() * window.innerWidth,
        targetY: Math.random() * window.innerHeight,
        targetZ: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        size: Math.random() * 1.5 + 0.5,
        color: COLORS.WHITE,
        opacity: Math.random() * 0.8 + 0.2
      });
    }
    particlesRef.current = particles;
  }, []);

  const animate = (time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; // Trail effect
    ctx.fillRect(0, 0, width, height);

    // Update target positions based on scene
    updateParticleTargets(particlesRef.current, currentScene, width, height, time);

    // Render particles
    particlesRef.current.forEach(p => {
      // Smooth movement towards target
      p.vx = (p.targetX - p.x) * 0.05;
      p.vy = (p.targetY - p.y) * 0.05;
      
      p.x += p.vx;
      p.y += p.vy;

      // Add slight jitter for organic feel
      const jitter = (Math.random() - 0.5) * 0.5;
      
      ctx.beginPath();
      ctx.arc(p.x + jitter, p.y + jitter, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [currentScene]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0"
    />
  );
};

export default ParticleCanvas;
