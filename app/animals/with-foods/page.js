import Link from 'next/link';
import { getAnimalsWithFoodsInsecure } from '../../../database/animals';
import styles from './page.module.scss';

export const metadata = {
  title: 'Animals',
  description: 'A list of animals for every occasion',
};

export default async function AnimalsWithFoodsPage() {
  const animalsWithFoods = await getAnimalsWithFoodsInsecure();

  const animals = animalsWithFoods.reduce(
    (/** @type {Animal[]} */ acc, animalWithFood) => {
      const id = animalWithFood.id;

      const animal = acc.find((foundAnimal) => foundAnimal.id === id);

      if (animal) {
        animal.foods.push({
          id: animalWithFood.foodId,
          name: animalWithFood.foodName,
          type: animalWithFood.foodType,
        });
        return acc;
      }

      const newAnimal = {
        id: animalWithFood.id,
        firstName: animalWithFood.firstName,
        type: animalWithFood.type,
        accessory: animalWithFood.accessory,
        birthDate: animalWithFood.birthDate,
        foods: [],
      };

      if (animalWithFood.foodId) {
        newAnimal.foods.push({
          id: animalWithFood.foodId,
          name: animalWithFood.foodName,
          type: animalWithFood.foodType,
        });
      }

      return [...acc, newAnimal];
    },
    [],
  );

  return (
    <div>
      <h1>Animals with Foods</h1>
      <ul className={styles.animalsList}>
        {animals.map((animal) => {
          return (
            <li key={animal.id}>
              <Link href={`/animals/${animal.id}`}>
                <img
                  src={`/animals/${animal.id}.avif`}
                  alt={`${animal.firstName} the ${animal.type} wearing a ${animal.accessory}`}
                />
                <span>{animal.firstName}</span>
              </Link>
              <ul>
                {animal.foods.map((food) => {
                  return <li key={food.id}>{food.name}</li>;
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
