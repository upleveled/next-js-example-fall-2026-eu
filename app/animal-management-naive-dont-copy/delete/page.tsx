import { notFound } from 'next/navigation';
import { deleteAnimalInsecure } from '../../../database/animals';
import { formatDate, getDaysUntilNextBirthday } from '../../../util/dates';

export const metadata = {
  title: 'Animal Management - Delete animal',
  description: 'Page to delete an animal',
};

export default async function AnimalManagementDeletePage(
  props: PageProps<'/animal-management-naive-dont-copy/delete'>,
) {
  // Next.js will pass `props.searchParams` from the URL
  // eg. ?firstName=ronald becomes
  // { firstName: 'ronald' }
  const searchParams = await props.searchParams;
  console.log(searchParams);

  if (typeof searchParams.id !== 'string') {
    return <div>Error: searchParams.id must be a string</div>;
  }

  const newAnimal = await deleteAnimalInsecure({
    id: Number(searchParams.id),
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
