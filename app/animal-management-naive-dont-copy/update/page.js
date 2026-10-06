import { notFound } from 'next/navigation';
import { updateAnimalInsecure } from '../../../database/animals';
import { formatDate, getDaysUntilNextBirthday } from '../../../util/dates';

export const metadata = {
  title: 'Animal Management - Update animal',
  description: 'Page to update an animal',
};

export default async function AnimalManagementUpdatePage(props) {
  // Next.js will pass `props.searchParams` from the URL
  // eg. ?firstName=ronald becomes
  // { firstName: 'ronald' }
  const searchParams = await props.searchParams;
  console.log(searchParams);

  const newAnimal = await updateAnimalInsecure({
    id: searchParams.id,
    firstName: searchParams.firstName,
    type: searchParams.type,
    accessory: searchParams.accessory,
    birthDate: searchParams.birthDate,
  });

  if (!newAnimal) {
    notFound();
  }

  return (
    <div>
      <h1>
        Updated Animal: {newAnimal.firstName} (id {newAnimal.id})
      </h1>

      <div>{newAnimal.firstName}</div>
      <div>
        Birth date: {formatDate(newAnimal.birthDate)} (days until next birthday:{' '}
        {getDaysUntilNextBirthday(new Date(), newAnimal.birthDate)})
      </div>
    </div>
  );
}
