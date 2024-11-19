import { randomBytes } from 'node:crypto';

export function generateText(): string {
  return randomBytes(generateRandomInt(1, 4)).toString('hex');
}

function generateRandomInt(min: number, max: number): number {
  const minVal = Math.ceil(min);
  const maxVal = Math.floor(max);
  return Math.floor(Math.random() * (maxVal - minVal + 1) + minVal); 
}