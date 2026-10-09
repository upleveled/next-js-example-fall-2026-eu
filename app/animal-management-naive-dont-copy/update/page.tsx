import { notFound } from 'next/navigation';
import { updateAnimalInsecure } from '../../../database/animals';
import { formatDate, getDaysUntilNextBirthday } from '../../../util/dates';

export const metadata = {
  title: 'Animal Management - Update animal',
  description: 'Page to update an animal',
};

export default async function AnimalManagementUpdatePage(
  props: PageProps<'/animal-management-naive-dont-copy/update'>,
) {
  // Next.js will pass `props.searchParams` from the URL
  // eg. ?firstName=ronald becomes
  // { firstName: 'ronald' }
  const searchParams = await props.searchParams;
  console.log(searchParams);

  if (
    typeof searchParams.id !== 'string' ||
    typeof searchParams.firstName !== 'string' ||
    typeof searchParams.type !== 'string' ||
    typeof searchParams.accessory !== 'string' ||
    typeof searchParams.birthDate !== 'string'
  ) {
    return (
      <div>
        Error: id, firstName, type, accessory and birthDate must all be strings
      </div>
    );
  }

  const newAnimal = await updateAnimalInsecure({
    id: Number(searchParams.id),
    firstName: searchParams.firstName,
    type: searchParams.type,
    accessory: searchParams.accessory,
    birthDate: new Date(searchParams.birthDate),
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
