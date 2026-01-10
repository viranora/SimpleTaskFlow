import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      // --- STATE ---
      currentView: 'board', // 'board' | 'settings'
      workspaceName: "Sema's Workspace",
      tasks: [
        { 
          id: '1', 
          title: 'Örnek Proje Görevi', 
          description: 'Sistemi test etmek için oluşturuldu.', 
          status: 'TODO',
          priority: 'medium',
          dueDate: ''
        },
      ],
      
      // --- ACTIONS ---
      
      // Sayfa değiştir
      setView: (view) => set({ currentView: view }),

      // İsim değiştir
      setWorkspaceName: (name) => set({ workspaceName: name }),

      // Tüm veriyi uçur (Danger Zone)
      resetBoard: () => set({ tasks: [] }),

      addTask: (title, status) =>
        set((state) => ({
          tasks: [...state.tasks, { 
            id: uuidv4(), 
            title, 
            description: '', 
            status,
            priority: 'medium',
            dueDate: ''
          }],
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      setTasks: (newTasks) => set({ tasks: newTasks }),

      updateTask: (id, newTitle, newDescription, newPriority, newDueDate) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { 
              ...t, 
              title: newTitle, 
              description: newDescription, 
              priority: newPriority,
              dueDate: newDueDate
            } : t
          ),
        })),
    }),
    {
      name: 'notion-storage',
    }
  )
);