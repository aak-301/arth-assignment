# Task Manager App

A responsive task management application to create, organize, search, and track tasks with local persistence.

## Repository

- GitHub: `https://github.com/aak-301/arth-assignment`
- Hosted Demo: `https://arth-assignment.onrender.com`

## Tech Stack

- React + TypeScript
- Vite
- MUI (Material UI)
- Zustand (state management + persistence middleware)

## Setup Instructions

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Implemented Features

### Core Features

- Create, edit, and delete tasks
- Mark tasks as completed by status update
- Filters: `All`, `Pending`, `Completed`
- Local persistence using Zustand + localStorage

### Functional Fields Per Task

- Title
- Description (optional)
- Status (`todo`, `pending`, `completed`)
- Created date
- Tags (optional enhancement)

### UX

- Mobile responsive layout
- Theme toggle (light/dark)
- Visual distinction with status chips
- Debounced search

### Optional Enhancements Implemented

- Drag-and-drop task movement across columns
- Search by title, description, task ID, and tags
- Categories/tags with preset options:
  - `feature`
  - `ui`
  - `high-priority`
  - `bug`
  - `low-priority`

## Key Decisions and Tradeoffs

- **Zustand over Redux:** chosen for simpler setup and faster iteration while keeping predictable action-based updates.
- **Component refactor for maintainability:** split UI into focused components (`AppHeader`, `TaskFilters`, `TaskList`, modal) to improve SRP and readability.
- **Native drag-and-drop:** lightweight and dependency-free, though it provides less advanced UX than dedicated DnD libraries.
- **Debounced search (300ms):** reduces unnecessary filtering work while typing.
- **UUID task IDs:** ensures stable identity across reorder/edit/delete and persistence.

## Project Structure (High Level)

```text
src/
  components/
    layout/AppHeader.tsx
    tasks/TaskFilters.tsx
    tasks/TaskItem.tsx
    tasks/TaskList.tsx
  data/mockTasks.ts
  hooks/useTasks.ts
  pages/HomePage.tsx
  theme/emeraldCharcoalTheme.ts
  types/task.ts
```
