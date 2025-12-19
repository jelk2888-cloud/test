
export enum AnimationScene {
  UNIVERSE = 'UNIVERSE',
  BLACK_HOLE = 'BLACK_HOLE',
  DNA_HELIX = 'DNA_HELIX',
  CELESTIAL_ORBIT = 'CELESTIAL_ORBIT',
  CONSTELLATION = 'CONSTELLATION'
}

export interface Particle {
  x: number;
  y: number;
  z: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  opacity: number;
}
