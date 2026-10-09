import { notFound } from 'next/navigation';
import { getAnimalInsecure } from '../../../../database/animals';
import { formatDate, getDaysUntilNextBirthday } from '../../../../util/dates';

export const metadata = {
  title: 'Animal Management - Read single animal',
  description: 'Page to read single animal',
};

export default async function AnimalManagementAnimalPage(
  props: PageProps<'/animal-management-naive-dont-copy/read/[animalId]'>,
) {
  // Next.js will pass `props.params` to each dynamic route segment
  const { animalId } = await props.params;

  console.log(animalId); // whatever comes after /animals/
  console.log(typeof animalId); // always a string

  // Destructuring is the shorter way to do this:
  // const animalId = (await props.params).animalId;

  const animal = await getAnimalInsecure(Number(animalId));

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
