'use server';

import { cookies } from 'next/headers';
import type { Fruit } from '../../../database/fruits';
import { getCookie } from '../../../util/cookies';
import { parseJsonFruitComments } from '../../../util/json';

export type FruitComment = {
  fruitId: Fruit['id'];
  comment: string;
};

// 3. Server Action to set the cookie securely on the server
export async function updateComment(
  fruitId: FruitComment['fruitId'],
  comment: FruitComment['comment'],
) {
  // Update an existing value in our cookie
  // A) Get the current value
  const fruitComments =
    parseJsonFruitComments(await getCookie('fruitComments')) || [];

  // B) Retrieve matching comment from cookie
  const matchingFruitComment = fruitComments.find((fruitComment) => {
    return fruitComment.fruitId === fruitId;
  });

  if (matchingFruitComment) {
    // C) Update matching comment
    matchingFruitComment.comment = comment;
  } else {
    // D) Add comment if none are matching
    fruitComments.push({
      fruitId: fruitId,
      comment: comment,
    });
  }

  (await cookies()).set('fruitComments', JSON.stringify(fruitComments));
}
