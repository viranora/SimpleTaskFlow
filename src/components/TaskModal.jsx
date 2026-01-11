import React, { useState } from 'react';
import { X, Trash2, Flag, Calendar } from 'lucide-react'; 
import { useStore } from '../store';
import { PRIORITY_COLORS } from '../utils';

export default function TaskModal({ task, onClose }) {
  const updateTask = useStore((state) => state.updateTask);
  const deleteTask = useStore((state) => state.deleteTask);
  
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState(task.priority || 'medium');
  const [dueDate, setDueDate] = useState(task.dueDate || ''); // Tarih state'i

  const handleSave = () => {
    updateTask(task.id, title, description, priority, dueDate); 
    onClose();
  };

  const handleDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2">
             <div className="flex bg-gray-200 p-1 rounded-md">
              {Object.keys(PRIORITY_COLORS).map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${
                    priority === p 
                      ? 'bg-white text-black shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {PRIORITY_COLORS[p].label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <button onClick={handleDelete} className="hover:bg-red-50 hover:text-red-600 p-2 rounded transition">
               <Trash2 size={18} />
            </button>
            <button onClick={onClose} className="hover:bg-gray-100 p-2 rounded transition">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex-1 overflow-y-auto">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-3xl font-bold w-full outline-none text-[#37352F] placeholder-gray-300 mb-6 bg-transparent"
            placeholder="Görev Başlığı"
          />
          
          {/* Metadata Bölümü */}
          <div className="flex flex-col gap-3 mb-6 p-4 bg-gray-50 rounded border border-gray-100">
             
             {/* Öncelik Göstergesi */}
             <div className="flex items-center gap-3">
                <div className="text-gray-400 w-5"><Flag size={18} /></div>
                <div className="text-sm text-gray-600 w-24">Öncelik</div>
                <div className={`text-sm font-bold ${PRIORITY_COLORS[priority].text}`}>
                   {PRIORITY_COLORS[priority].label}
                </div>
             </div>

             {/* Tarih Seçici */}
             <div className="flex items-center gap-3">
                <div className="text-gray-400 w-5"><Calendar size={18} /></div>
                <div className="text-sm text-gray-600 w-24">Bitiş Tarihi</div>
                <input 
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="text-sm bg-transparent outline-none text-gray-700 font-medium cursor-pointer"
                />
             </div>

          </div>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-64 outline-none resize-none text-gray-600 leading-relaxed bg-transparent text-sm"
            placeholder="Görev hakkında detaylar, notlar..."
          />
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button 
            onClick={handleSave}
            className="bg-[#2C2C2C] text-white px-6 py-2 rounded font-medium hover:bg-black transition shadow-lg text-sm"
          >
            Değişiklikleri Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}
