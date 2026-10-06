import { notFound } from 'next/navigation';
import { deleteAnimalInsecure } from '../../../database/animals';
import { formatDate, getDaysUntilNextBirthday } from '../../../util/dates';

export const metadata = {
  title: 'Animal Management - Delete animal',
  description: 'Page to delete an animal',
};

export default async function AnimalManagementDeletePage(props) {
  // Next.js will pass `props.searchParams` from the URL
  // eg. ?firstName=ronald becomes
  // { firstName: 'ronald' }
  const searchParams = await props.searchParams;
  console.log(searchParams);

  const newAnimal = await deleteAnimalInsecure({
    id: searchParams.id,
  });

  if (!newAnimal) {
    notFound();
  }

  return (
    <div>
      <h1>
        Deleted Animal: {newAnimal.firstName} (id {newAnimal.id})
      </h1>

      <div>{newAnimal.firstName}</div>
      <div>
        Birth date: {formatDate(newAnimal.birthDate)} (days until next birthday:{' '}
        {getDaysUntilNextBirthday(new Date(), newAnimal.birthDate)})
      </div>
    </div>
  );
}
