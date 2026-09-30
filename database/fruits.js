// Simulate a real database, which cannot be imported from Client Components
import 'server-only';

const fruits = [
  { id: 1, name: 'Apple', emoji: '🍎' },
  { id: 2, name: 'Banana', emoji: '🍌' },
  { id: 3, name: 'Orange', emoji: '🍊' },
  { id: 4, name: 'Strawberry', emoji: '🍓' },
  { id: 5, name: 'Watermelon', emoji: '🍉' },
  { id: 6, name: 'Grapes', emoji: '🍇' },
  { id: 7, name: 'Pineapple', emoji: '🍍' },
  { id: 8, name: 'Kiwi', emoji: '🥝' },
];

// const fruitComments = [
//   { fruitId: 1, comment: 'tasty' }
// ]

export function getFruits() {
  return fruits;
}

export function getFruit(id) {
  const fruit = fruits.find((currentFruit) => {
    return currentFruit.id === id;
  });
  return fruit;
}
