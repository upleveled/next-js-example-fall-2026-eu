import type { AnimalWithFoods } from '../database/animals';
import type { Animal } from '../migrations/00000-createTableAnimals';

export function collapseAnimalWithFoods(animalWithFoods: AnimalWithFoods[]) {
  const firstAnimalWithFoods = animalWithFoods[0]!;
  const animal: Animal & {
    foods?: {
      id: AnimalWithFoods['foodId'];
      name: AnimalWithFoods['foodName'];
      type: AnimalWithFoods['foodType'];
    }[];
  } = {
    id: firstAnimalWithFoods.id,
    firstName: firstAnimalWithFoods.firstName,
    type: firstAnimalWithFoods.type,
    accessory: firstAnimalWithFoods.accessory,
    birthDate: firstAnimalWithFoods.birthDate,
  };

  animal.foods = animalWithFoods
    .map(({ foodId, foodName, foodType }) => {
      // Return null if food info not present
      if (!foodId) return null;
      return {
        id: foodId,
        name: foodName,
        type: foodType,
      };
    })
    // Remove any array items that don't contain food information
    .filter((food) => food !== null);

  return animal;
}
