# SimpleTaskFlow

A modern, minimalist, Notion-style Kanban board application built with React and Tailwind CSS. This project focuses on a clean user experience (UX) and efficient state management.

## ✨ Features

- **Drag & Drop Interface:** Smooth drag-and-drop functionality powered by `@dnd-kit`.
- **Persistent State:** Uses `Zustand` with local storage persistence to keep data safe after page reloads.
- **Smart Task Management:**
  - **Inline Creation:** Add tasks quickly without annoying pop-ups.
  - **Rich Metadata:** Set priorities (Low, Medium, High, Urgent) and Due Dates.
  - **Overdue Detection:** Visual indicators for missed deadlines.
- **View Management:** Switch between Board View and Settings.
- **Workspace Customization:** Dynamic workspace naming and "Danger Zone" to reset data.

## 🛠️ Tech Stack

- **Core:** React 19, Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand (w/ Middleware)
- **DnD Engine:** @dnd-kit (Core, Sortable, Utilities)
- **Icons:** Lucide React
- **Utils:** uuid, clsx, tailwind-merge

## ⚙️ Installation & Setup

1. **Clone the repository**
   git clone [https://github.com/KULLANICI_ADIN/SimpleProjectManagementProgramme.git](https://github.com/viranora/SimpleTaskFlow.git)
   cd SimpleTaskFlow
Install dependencies

npm install
Run the development server

npm run dev
## 📂 Project Structure
src/
├── components/
│   ├── Board.jsx       # Main Kanban logic & DragContext
│   ├── TaskCard.jsx    # Individual task item (Draggable)
│   ├── TaskModal.jsx   # Detailed edit view
│   ├── Sidebar.jsx     # Navigation & Workspace info
│   ├── Settings.jsx    # App configuration
│   └── InlineInput.jsx # Quick add feature
├── store.js            # Global state (Zustand)
├── utils.js            # Helper functions (Dates, Colors)
└── App.jsx             # Root layout

### by Sema
