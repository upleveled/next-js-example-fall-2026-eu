'use client';

import { useState } from 'react';

const emojis = ['😀', '🥳', '🤖', '🐸', '🐶', '🦊', '🦄', '🐙'];

export default function GenerateButton() {
  const [emoji, setEmoji] = useState('😀');
  return (
    <button
      onClick={() => {
        setEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
      }}
    >
      generate {emoji}
    </button>
  );
}
