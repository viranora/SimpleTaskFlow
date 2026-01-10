import React from 'react';
import Sidebar from './components/Sidebar';
import Board from './components/Board';
import Settings from './components/Settings'; // Yeni import
import { useStore } from './store';

function App() {
  const currentView = useStore((state) => state.currentView);

  return (
    <div className="flex w-full h-full bg-white">
      <Sidebar />
      
      {/* Koşullu Render: Hangi view seçiliyse onu göster */}
      {currentView === 'board' ? <Board /> : <Settings />}
      
    </div>
  );
}

export default App;