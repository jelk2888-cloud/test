
import React, { useState, useEffect } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import { SCENE_SEQUENCE, SCENE_DURATION } from './constants';

const App: React.FC = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSceneIndex((prev) => (prev + 1) % SCENE_SEQUENCE.length);
    }, SCENE_DURATION);
    return () => clearInterval(interval);
  }, []);

  const sceneTitles: Record<string, string> = {
    UNIVERSE: '浩瀚宇宙 · COSMOS',
    BLACK_HOLE: '黑洞之核 · SINGULARITY',
    DNA_HELIX: '生命螺旋 · GENESIS',
    CELESTIAL_ORBIT: '星辰运转 · ORBIT',
    CONSTELLATION: '北斗指路 · ETERNITY'
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center items-center text-white">
      {/* Visualizer Background */}
      <ParticleCanvas currentScene={SCENE_SEQUENCE[currentSceneIndex]} />

      {/* Center UI - Subtle Scene Name */}
      <div className="z-10 transition-opacity duration-1000 ease-in-out pointer-events-none">
        <h1 className="text-2xl md:text-4xl font-sans font-light tracking-[0.5em] opacity-40 select-none animate-pulse">
          {sceneTitles[SCENE_SEQUENCE[currentSceneIndex]]}
        </h1>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-6 left-8 z-20 pointer-events-none">
        <div className="flex flex-col">
          <span className="text-cyan-400 text-sm md:text-base font-sans tracking-widest uppercase opacity-80">
            星幻实验室 Annie
          </span>
          <span className="text-white text-xs font-sans tracking-[0.2em] opacity-40 mt-1">
            by Gemini3
          </span>
        </div>
      </div>

      {/* Scene Indicators */}
      <div className="absolute bottom-6 right-8 z-20 flex space-x-3">
        {SCENE_SEQUENCE.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1 transition-all duration-500 rounded-full ${
              idx === currentSceneIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
