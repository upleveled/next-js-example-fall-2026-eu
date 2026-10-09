import sjon from 'secure-json-parse';
import type { FruitComment } from '../app/fruits/[fruitId]/actions';

export function parseJsonFeatureBanner(json: string | null | undefined) {
  if (!json) return undefined;
  try {
    return sjon(json) as boolean;
  } catch {
    return undefined;
  }
}

export function parseJsonFruitComments(json: string | null | undefined) {
  if (!json) return undefined;
  try {
    return sjon(json) as FruitComment[];
  } catch {
    return undefined;
  }
}
