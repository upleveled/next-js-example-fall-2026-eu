import { notFound } from 'next/navigation';
import { getAnimal } from '../../../database/animals';
import { formatDate, getDaysUntilNextBirthday } from '../../../util/dates';

export async function generateMetadata(props) {
  const { animalId } = await props.params;

  const animal = getAnimal(Number(animalId));

  return {
    title: animal.firstName,
    description: `${animal.firstName} the ${animal.type} wearing a ${animal.accessory}`,
  };
}

export default async function AnimalPage(props) {
  // Next.js will pass `props.params` to each dynamic route segment
  const { animalId } = await props.params;

  console.log(animalId); // whatever comes after /animals/
  console.log(typeof animalId); // always a string

  // Destructuring is the shorter way to do this:
  // const animalId = (await props.params).animalId;

  const animal = getAnimal(Number(animalId));

  if (!animal) {
    notFound();
  }

  return (
    <div>
      <h1>
        {animal.firstName} (id {animal.id})
      </h1>
      <img
        src={`/animals/${animal.id}.avif`}
        alt={`${animal.firstName} the ${animal.type} wearing a ${animal.accessory}`}
        width="400"
      />
      <div>{animal.firstName}</div>
      <div>
        Birth date: {formatDate(animal.birthDate)} (days until next birthday:{' '}
        {getDaysUntilNextBirthday(new Date(), animal.birthDate)})
      </div>
    </div>
  );
}
