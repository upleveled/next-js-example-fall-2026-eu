import { notFound } from 'next/navigation';
import { getFruit } from '../../../database/fruits';
import { getCookie } from '../../../util/cookies';
import { parseJsonFruitComments } from '../../../util/json';
import FruitCommentForm from './FruitCommentForm';

export async function generateMetadata(props: PageProps<'/fruits/[fruitId]'>) {
  const { fruitId } = await props.params;

  const fruit = getFruit(Number(fruitId));

  if (!fruit) {
    notFound();
  }

  return {
    title: `${fruit.emoji} ${fruit.name}`,
    description: `Page for ${fruit.emoji} ${fruit.name}`,
  };
}

export default async function FruitPage(props: PageProps<'/fruits/[fruitId]'>) {
  const params = await props.params;
  const fruitId = Number(params.fruitId);
  const fruit = getFruit(fruitId);

  if (!fruit) {
    notFound();
  }

  const fruitComments =
    parseJsonFruitComments(await getCookie('fruitComments')) || [];

  const fruitComment = fruitComments.find((comment) => {
    return comment.fruitId === fruitId;
  });

  return (
    <div>
      <h1>
        {fruit.emoji} {fruit.name} (id {fruit.id})
      </h1>
      <div>{fruit.name}</div>
      <FruitCommentForm
        fruitId={fruitId}
        comment={fruitComment?.comment || ''}
      />
    </div>
  );
}
