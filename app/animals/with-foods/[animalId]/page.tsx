import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  type AnimalWithFoods,
  getAnimalWithFoodsInsecure,
} from '../../../../database/animals';

export async function generateMetadata(
  props: PageProps<'/animals/with-foods/[animalId]'>,
) {
  const params = await props.params;

  const [animal] = await getAnimalWithFoodsInsecure(Number(params.animalId));

  if (!animal) {
    notFound();
  }

  return {
    title: animal.firstName,
    description: `${animal.firstName} the ${animal.type}, with their ${animal.accessory}`,
  };
}

export default async function AnimalWithFoodsPage(
  props: PageProps<'/animals/with-foods/[animalId]'>,
) {
  const params = await props.params;

  const animalWithFoods = await getAnimalWithFoodsInsecure(
    Number(params.animalId),
  );

  console.log(animalWithFoods);

  const animal:
    | (AnimalWithFoods & {
        foods?: {
          id: AnimalWithFoods['foodId'];
          name: AnimalWithFoods['foodName'];
          type: AnimalWithFoods['foodType'];
        }[];
      })
    | undefined = animalWithFoods[0];

  if (animalWithFoods.length < 1 || !animal) {
    notFound();
  }

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
