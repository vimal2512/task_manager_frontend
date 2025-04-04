import React from 'react';
import { useState } from 'react';

export default function TestInput() {
  const [value, setValue] = useState('');
  return (
    <div style={{ margin: '2rem', border: '3px solid red' }}>
      <input
        value={value}
        onChange={(e) => {
          console.log('Typed:', e.target.value);
          setValue(e.target.value);
        }}
      />
      <p>Live Value: {value}</p>
    </div>
  );
}