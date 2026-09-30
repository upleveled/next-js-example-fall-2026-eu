'use client';

import { useState } from 'react';
import { updateComment } from './actions';

export default function FruitCommentForm(props) {
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
