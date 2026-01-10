import React, { useState } from 'react';
import { useStore } from '../store';
import { Save, Trash2, AlertTriangle } from 'lucide-react';

export default function Settings() {
  const workspaceName = useStore((state) => state.workspaceName);
  const setWorkspaceName = useStore((state) => state.setWorkspaceName);
  const resetBoard = useStore((state) => state.resetBoard);
  
  const [nameInput, setNameInput] = useState(workspaceName);

  const handleSaveName = () => {
    setWorkspaceName(nameInput);
    alert('Çalışma alanı ismi güncellendi!');
  };

  const handleReset = () => {
    if (window.confirm('DİKKAT: Tüm görevler kalıcı olarak silinecek. Emin misin?')) {
      resetBoard();
      alert('Pano sıfırlandı.');
    }
  };

  return (
    <div className="flex-1 p-12 h-screen overflow-y-auto bg-white">
      <h1 className="text-3xl font-bold text-[#37352F] mb-8 pb-4 border-b border-gray-200">
        Ayarlar
      </h1>

      <div className="max-w-2xl space-y-12">
        
        {/* Workspace Ayarları */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Çalışma Alanı</h2>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Çalışma Alanı Adı
            </label>
            <div className="flex gap-4">
              <input 
                type="text" 
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
              />
              <button 
                onClick={handleSaveName}
                className="flex items-center gap-2 bg-[#2C2C2C] text-white px-4 py-2 rounded text-sm font-medium hover:bg-black transition"
              >
                <Save size={16} />
                Güncelle
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Bu isim sol menüde (Sidebar) görünecektir.
            </p>
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <h2 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
            <AlertTriangle size={20} />
            Tehlikeli Bölge
          </h2>
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h3 className="font-medium text-red-800 mb-2">Tüm Görevleri Sıfırla</h3>
            <p className="text-sm text-red-600/80 mb-4">
              Bu işlem geri alınamaz. Panodaki tüm görevler ve veriler kalıcı olarak silinecektir.
            </p>
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 bg-white border border-red-300 text-red-600 px-4 py-2 rounded text-sm font-medium hover:bg-red-600 hover:text-white transition"
            >
              <Trash2 size={16} />
              Panoyu Temizle
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}