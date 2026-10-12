import { describe, expect, test } from '@jest/globals';
import { collapseAnimalWithFoods } from '../animalWithFoods';

describe('collapseAnimalWithFoods function', () => {
  test('collapses an array of animalWithFoods into a single animal object', () => {
    const animalWithFoods = [
      {
        id: 1,
        firstName: 'Fluffy',
        type: 'cat',
        accessory: 'collar',
        birthDate: new Date('2015-06-01'),
        foodId: 1,
        foodName: 'fish',
        foodType: 'meat',
      },
      {
        id: 1,
        firstName: 'Fluffy',
        type: 'cat',
        accessory: 'collar',
        birthDate: new Date('2015-06-01'),
        foodId: 2,
        foodName: 'milk',
        foodType: 'dairy',
      },
    ];

    const expectedAnimal = {
      id: 1,
      firstName: 'Fluffy',
      type: 'cat',
      accessory: 'collar',
      birthDate: new Date('2015-06-01'),
      foods: [
        { id: 1, name: 'fish', type: 'meat' },
        { id: 2, name: 'milk', type: 'dairy' },
      ],
    };

    expect(collapseAnimalWithFoods(animalWithFoods)).toStrictEqual(
      expectedAnimal,
    );
  });
});
