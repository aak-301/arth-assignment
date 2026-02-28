export const TASK_STATUSES = ['todo', 'pending', 'completed'] as const
export const TASK_TAG_OPTIONS = [
  'feature',
  'ui',
  'high-priority',
  'bug',
  'low-priority',
] as const

export type TaskStatus = (typeof TASK_STATUSES)[number]
export type TaskFilter = 'all' | 'pending' | 'completed'
export type TaskTag = (typeof TASK_TAG_OPTIONS)[number]

export type Task = {
  id: string
  title: string
  description?: string
  tags: TaskTag[]
  status: TaskStatus
  createdAt: string
  updatedAt: string
}

export type TaskSections = Record<TaskStatus, Task[]>

export type TaskState = {
  sections: TaskSections
  filter: TaskFilter
}

export type CreateTaskInput = {
  title: string
  description?: string
  tags?: TaskTag[]
  status?: TaskStatus
}

export type EditTaskInput = {
  id: string
  title?: string
  description?: string
  tags?: TaskTag[]
  status?: TaskStatus
}

export type MoveTaskInput = {
  sourceStatus: TaskStatus
  destinationStatus: TaskStatus
  sourceIndex: number
  destinationIndex: number
}

export type TaskAction =
  | { type: 'CREATE_TASK'; payload: CreateTaskInput }
  | { type: 'EDIT_TASK'; payload: EditTaskInput }
  | { type: 'DELETE_TASK'; payload: { id: string } }
  | { type: 'MOVE_TASK'; payload: MoveTaskInput }
  | { type: 'SET_FILTER'; payload: { filter: TaskFilter } }

