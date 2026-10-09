import { notFound } from 'next/navigation';
import { createAnimalInsecure } from '../../../database/animals';
import { formatDate, getDaysUntilNextBirthday } from '../../../util/dates';

export const metadata = {
  title: 'Animal Management - Create animal',
  description: 'Page to create an animal',
};

export default async function AnimalManagementCreatePage(
  props: PageProps<'/animal-management-naive-dont-copy/create'>,
) {
  // Next.js will pass `props.searchParams` from the URL
  // eg. ?firstName=ronald becomes
  // { firstName: 'ronald' }
  const searchParams = await props.searchParams;
  console.log(searchParams);

  if (
    typeof searchParams.firstName !== 'string' ||
    typeof searchParams.type !== 'string' ||
    typeof searchParams.accessory !== 'string' ||
    typeof searchParams.birthDate !== 'string'
  ) {
    return (
      <div>
        Error: firstName, type, accessory and birthDate must all be strings
      </div>
    );
    // // This will trigger app/error.tsx
    // throw new Error(
    //   'firstName, type, accessory and birthDate must all be strings',
    // );
  }

  const newAnimal = await createAnimalInsecure({
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
        Created Animal: {newAnimal.firstName} (id {newAnimal.id})
      </h1>

      <div>{newAnimal.firstName}</div>
      <div>
        Birth date: {formatDate(newAnimal.birthDate)} (days until next birthday:{' '}
        {getDaysUntilNextBirthday(new Date(), newAnimal.birthDate)})
      </div>
    </div>
  );
}
