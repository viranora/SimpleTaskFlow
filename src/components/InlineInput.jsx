import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

export default function InlineInput({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return onCancel(); // Boşsa iptal et
    onSubmit(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 bg-white p-2 rounded shadow-sm border border-blue-400">
      <input
        autoFocus
        type="text"
        placeholder="Görev adı girin..."
        className="w-full text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onCancel();
        }}
        onBlur={() => {
            // İstersen dışarı tıklayınca iptal etsin, istersen kaydetsin.
            // Şimdilik kullanıcıyı zorlamamak için burayı boş bırakıyorum.
        }}
      />
      <div className="flex justify-end gap-2 mt-2">
        <button 
          type="button" 
          onClick={onCancel}
          className="p-1 hover:bg-gray-100 rounded text-gray-500"
        >
          <X size={14} />
        </button>
        <button 
          type="submit" 
          className="p-1 bg-blue-500 hover:bg-blue-600 rounded text-white"
        >
          <Check size={14} />
        </button>
      </div>
    </form>
  );
}