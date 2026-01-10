import React from 'react';
import { Layout, Settings, PlusCircle } from 'lucide-react';
import { useStore } from '../store';

export default function Sidebar() {
  const currentView = useStore((state) => state.currentView);
  const setView = useStore((state) => state.setView);
  const workspaceName = useStore((state) => state.workspaceName);

  // Aktif menü elemanının stili
  const getButtonClass = (viewName) => `
    flex items-center gap-2 w-full p-2 text-sm rounded transition-colors
    ${currentView === viewName 
      ? 'bg-gray-200 text-gray-900 font-medium' 
      : 'text-gray-600 hover:bg-gray-100'
    }
  `;

  return (
    <div className="w-64 h-screen bg-[#F7F7F5] border-r border-gray-200 p-4 flex flex-col flex-shrink-0">
      {/* Dinamik Workspace İsmi */}
      <div className="flex items-center gap-2 mb-6 px-2 font-semibold text-gray-700 truncate">
        <div className="w-5 h-5 bg-orange-400 rounded flex-shrink-0 text-[10px] flex items-center justify-center text-white">
            {workspaceName.charAt(0).toUpperCase()}
        </div>
        <span className="truncate">{workspaceName}</span>
      </div>
      
      <div className="space-y-1">
        <button 
          onClick={() => setView('board')}
          className={getButtonClass('board')}
        >
          <Layout size={18} />
          <span>Board View</span>
        </button>
        
        <button 
          onClick={() => setView('settings')}
          className={getButtonClass('settings')}
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-200">
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 px-2 py-1 w-full">
          <PlusCircle size={16} />
          <span>New Page</span>
        </button>
      </div>
    </div>
  );
}