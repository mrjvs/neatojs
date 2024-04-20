import { useState } from 'react';

export function SearchScreen() {
  const [input, setInput] = useState('');
  return (
    <div className="gd-bg-bgLight">
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        type="text"
        autoFocus
      />
    </div>
  );
}
