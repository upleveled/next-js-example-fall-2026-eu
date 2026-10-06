import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getAnimalInsecure,
  getAnimalWithFoodsJsonAggInsecure,
} from '../../../../database/animals';

export async function generateMetadata(props) {
  const params = await props.params;

  const animal = await getAnimalInsecure(Number(params.animalId));

  return {
    title: animal.firstName,
    description: `${animal.firstName} the ${animal.type}, with their ${animal.accessory}`,
  };
}

export default async function AnimalPage(props) {
  const params = await props.params;

  const animal = await getAnimalWithFoodsJsonAggInsecure(
    Number(params.animalId),
  );

  if (animal.length < 1 || !animal) {
    notFound();
  }

  return (
    <div>
      <div>
        <Image
          src={`/animals/${animal.id}.avif`}
          width="300"
          height="164"
          alt={`${animal.firstName} the ${animal.type}, with their ${animal.accessory}`}
        />
      </div>

      {animal.firstName}

      <div>
        Foods
        <ul>
          {animal.foods.map((food) => {
            return (
              <li key={`animal-foods-${food.name}-${food.id}`}>
                {food.name} ({food.type})
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
