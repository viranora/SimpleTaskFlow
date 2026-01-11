import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock } from 'lucide-react'; 
import { PRIORITY_COLORS, formatDate, isOverdue } from '../utils'; 

export default function TaskCard({ task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { ...task },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityStyle = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium;
  
  // Günü geçmiş mi kontrolü
  const overdue = isOverdue(task.dueDate, task.status);
  const formattedDate = formatDate(task.dueDate);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group bg-white p-3 rounded shadow-sm border border-gray-200 hover:bg-gray-50 cursor-grab active:cursor-grabbing mb-2 relative touch-none flex flex-col gap-2"
    >
      {/* Üst Kısım: Öncelik */}
      <div className={`text-[10px] uppercase font-bold w-fit px-1.5 py-0.5 rounded ${priorityStyle.bg} ${priorityStyle.text}`}>
        {priorityStyle.label}
      </div>

      {/* Orta Kısım: Başlık */}
      <p className="text-sm text-gray-800 pointer-events-none font-medium leading-snug">
        {task.title}
      </p>
      
      {/* Alt Kısım: Tarih */}
      {formattedDate && (
        <div className={`flex items-center gap-1 text-[11px] font-medium mt-1 ${overdue ? 'text-red-600' : 'text-gray-400'}`}>
          <Clock size={12} />
          <span>{formattedDate}</span>
          {overdue && <span className="font-bold">(Gecikti!)</span>}
        </div>
      )}
    </div>
  );
}
