import Link from 'next/link';
import { getFruits } from '../../database/fruits';
import { getCookie } from '../../util/cookies';
import { parseJsonFruitComments } from '../../util/json';
import styles from './page.module.scss';

export const metadata = {
  title: 'Fruits',
  description: 'A list of fruits for every occasion',
};

export default async function FruitsPage() {
  const fruits = getFruits();

  const fruitComments =
    parseJsonFruitComments(await getCookie('fruitComments')) || [];

  return (
    <div>
      <h1>Fruits</h1>
      <ul className={styles.fruitsList}>
        {fruits.map((fruit) => {
          const fruitComment = fruitComments.find((comment) => {
            return comment.fruitId === fruit.id;
          });
          return (
            <li key={fruit.id}>
              <Link href={`/fruits/${fruit.id}`}>
                {fruit.emoji} {fruit.name}
              </Link>
              <div>{fruitComment?.comment}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
