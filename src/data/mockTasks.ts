import type { Task } from '../types/task'

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Create assignment repository',
    description: 'Set up React + TypeScript + MUI project',
    tags: ['feature', 'ui'],
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Build CRUD state actions',
    description: 'Add create, edit, delete, and drag-drop handlers',
    tags: ['feature', 'high-priority'],
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Submit GitHub repo link',
    description: 'Prepare README and submission details',
    tags: ['low-priority'],
    status: 'completed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

