import { notFound } from 'next/navigation';
import { getFruit } from '../../../database/fruits';
import { getCookie } from '../../../util/cookies';
import FruitCommentForm from './FruitCommentForm';

export async function generateMetadata(props) {
  const { fruitId } = await props.params;

  const fruit = getFruit(Number(fruitId));

  return {
    title: fruit.firstName,
    description: `${fruit.firstName} the ${fruit.type} wearing a ${fruit.accessory}`,
  };
}

export default async function FruitPage(props) {
  const params = await props.params;
  const fruitId = Number(params.fruitId);
  const fruit = getFruit(fruitId);

  if (!fruit) {
    notFound();
  }

  const fruitComments = (await getCookie('fruitComments')) || [];

  const fruitComment = fruitComments.find((comment) => {
    return comment.fruitId === fruitId;
  });

  return (
    <div>
      <h1>
        {fruit.emoji} {fruit.name} (id {fruit.id})
      </h1>
      <div>{fruit.name}</div>
      <FruitCommentForm fruitId={fruitId} comment={fruitComment?.comment} />
    </div>
  );
}
