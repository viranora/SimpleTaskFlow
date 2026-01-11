import React, { useState } from 'react';
import {
  DndContext,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useStore } from '../store';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import InlineInput from './InlineInput'; 
import { Plus } from 'lucide-react';

const COLUMNS = [
  { id: 'TODO', title: 'To Do', color: 'bg-red-100 text-red-700' },
  { id: 'IN_PROGRESS', title: 'In Progress', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'DONE', title: 'Done', color: 'bg-green-100 text-green-700' },
];

export default function Board() {
  const tasks = useStore((state) => state.tasks);
  const setTasks = useStore((state) => state.setTasks);
  const addTask = useStore((state) => state.addTask);
  
  const [activeTask, setActiveTask] = useState(null);
  
  // Hangi sütunda ekleme yapılıyor? (Örn: 'TODO' veya null)
  const [addingToColumn, setAddingToColumn] = useState(null); 

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeTask = tasks.find((t) => t.id === activeId);
    const overTask = tasks.find((t) => t.id === overId);

    if (!activeTask) return;

    if (overTask) {
      if (activeTask.status !== overTask.status) {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);
        
        const updatedTasks = [...tasks];
        updatedTasks[activeIndex].status = overTask.status;
        setTasks(arrayMove(updatedTasks, activeIndex, overIndex));
      }
    } else {
      const isOverColumn = COLUMNS.some((col) => col.id === overId);
      if (isOverColumn && activeTask.status !== overId) {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const updatedTasks = [...tasks];
        updatedTasks[activeIndex].status = overId;
        setTasks(arrayMove(updatedTasks, activeIndex, activeIndex));
      }
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId !== overId) {
      const oldIndex = tasks.findIndex((t) => t.id === activeId);
      const newIndex = tasks.findIndex((t) => t.id === overId);
      setTasks(arrayMove(tasks, oldIndex, newIndex));
    }
  };

  return (
    <div className="flex-1 p-8 h-screen overflow-x-auto relative">
      <h1 className="text-3xl font-bold text-[#37352F] mb-8">Proje Yönetimi</h1>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 h-full">
          {COLUMNS.map((col) => (
            <div key={col.id} className="w-72 flex-shrink-0 flex flex-col">
              {/* Sütun Başlığı */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${col.color}`}>
                    {col.title}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {tasks.filter((t) => t.status === col.id).length}
                  </span>
                </div>
                {/* Başlıktaki + butonu */}
                <button 
                  onClick={() => setAddingToColumn(col.id)}
                  className="hover:bg-gray-200 p-1 rounded transition"
                >
                  <Plus size={16} className="text-gray-500" />
                </button>
              </div>

              {/* Sürüklenebilir Alan */}
              <SortableContext
                id={col.id}
                items={tasks.filter((t) => t.status === col.id).map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex-1 min-h-[100px] pb-4">
                  {tasks
                    .filter((task) => task.status === col.id)
                    .map((task) => (
                      <div key={task.id} onClick={() => setActiveTask(task)}>
                        <TaskCard task={task} />
                      </div>
                    ))}
                  
                  {/* Eğer bu sütun ekleme modundaysa Input göster, değilse Buton göster */}
                  {addingToColumn === col.id ? (
                    <InlineInput 
                      onSubmit={(title) => {
                        addTask(title, col.id);
                        setAddingToColumn(null); // Ekleme bitince kapat
                      }}
                      onCancel={() => setAddingToColumn(null)}
                    />
                  ) : (
                    <button 
                      onClick={() => setAddingToColumn(col.id)}
                      className="flex items-center gap-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 w-full p-2 rounded text-sm mt-1 transition"
                    >
                      <Plus size={14} /> New
                    </button>
                  )}

                </div>
              </SortableContext>
            </div>
          ))}
        </div>
      </DndContext>

      {/* Detay Modalı */}
      {activeTask && (
        <TaskModal 
          task={activeTask} 
          onClose={() => setActiveTask(null)} 
        />
      )}
    </div>
  );
}
