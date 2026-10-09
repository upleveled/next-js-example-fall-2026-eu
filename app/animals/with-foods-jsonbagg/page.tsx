import Link from 'next/link';
import { getAnimalsWithFoodsJsonbAggInsecure } from '../../../database/animals';
import styles from './page.module.scss';

export const metadata = {
  title: 'Animals with Foods (jsonb_agg)',
  description: 'A list of animals for every occasion',
};

export default async function AnimalsWithFoodsJsonbAggPage() {
  const animals = await getAnimalsWithFoodsJsonbAggInsecure();

  return (
    <div>
      <h1>Animals with Foods (jsonb_agg)</h1>
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
