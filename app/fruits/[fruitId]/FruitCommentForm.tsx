'use client';

import { useState } from 'react';
import { type FruitComment, updateComment } from './actions';

type Props = {
  fruitId: FruitComment['fruitId'];
  comment: FruitComment['comment'];
};

export default function FruitCommentForm(props: Props) {
  const [comment, setComment] = useState(props.comment);

  return (
    // 2. Form to run the Server Action
    <form>
      <textarea
        value={comment}
        onChange={(event) => {
          setComment(event.currentTarget.value);
        }}
      />
      <button
        formAction={async () => {
          await updateComment(props.fruitId, comment);
        }}
      >
        Save
      </button>
    </form>
  );
}
