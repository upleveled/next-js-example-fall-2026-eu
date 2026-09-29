// Simulate a real database, which cannot be imported from Client Components
import 'server-only';

const animals = [
  {
    id: 1,
    firstName: 'Mochi',
    type: 'red panda',
    accessory: 'tiny yellow raincoat',
    birthDate: new Date('2021-04-17'),
  },
  {
    id: 2,
    firstName: 'Biscuit',
    type: 'capybara',
    accessory: 'striped bow tie',
    birthDate: new Date('2020-11-03'),
  },
  {
    id: 3,
    firstName: 'Pickle',
    type: 'otter',
    accessory: 'round sunglasses',
    birthDate: new Date('2022-07-28'),
  },
  {
    id: 4,
    firstName: 'Noodle',
    type: 'alpaca',
    accessory: 'sparkly wizard hat',
    birthDate: new Date('2019-02-14'),
  },
  {
    id: 5,
    firstName: 'Waffles',
    type: 'hedgehog',
    accessory: 'miniature backpack',
    birthDate: new Date('2023-09-09'),
  },
];

export function getAnimals() {
  return animals;
}

export function getAnimal(id) {
  const animal = animals.find((currentAnimal) => {
    return currentAnimal.id === id;
  });
  return animal;
}
