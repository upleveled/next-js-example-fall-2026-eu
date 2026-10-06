import Link from 'next/link';
import { getAnimalsInsecure } from '../../../database/animals';
import styles from './page.module.scss';

export const metadata = {
  title: 'Animal Management - Read all animals',
  description: 'Page to read all animals',
};

export default async function AnimalManagementAnimalsPage() {
  const animals = await getAnimalsInsecure();

  return (
    <div>
      <h1>Animals</h1>
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
            </li>
          );
        })}
      </ul>
    </div>
  );
}
