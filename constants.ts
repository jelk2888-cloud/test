
import { AnimationScene } from './types';

export const COLORS = {
  WHITE: '#FFFFFF',
  CYAN: '#00FFFF',
  SILVER: '#A0D8EF'
};

export const PARTICLE_COUNT = 3000;
export const SCENE_DURATION = 5000; // 5 seconds

export const SCENE_SEQUENCE: AnimationScene[] = [
  AnimationScene.UNIVERSE,
  AnimationScene.BLACK_HOLE,
  AnimationScene.DNA_HELIX,
  AnimationScene.CELESTIAL_ORBIT,
  AnimationScene.CONSTELLATION
];

// Big Dipper Coordinates (scaled -1 to 1)
export const BIG_DIPPER_STARS = [
  { x: -0.8, y: -0.2, name: 'Dubhe' },
  { x: -0.6, y: -0.1, name: 'Merak' },
  { x: -0.4, y: 0.1, name: 'Phecda' },
  { x: -0.2, y: 0.2, name: 'Megrez' },
  { x: 0.0, y: 0.4, name: 'Alioth' },
  { x: 0.2, y: 0.5, name: 'Mizar' },
  { x: 0.4, y: 0.6, name: 'Alkaid' },
  { x: 0.6, y: -0.8, name: 'Polaris', isNorthStar: true }
];
