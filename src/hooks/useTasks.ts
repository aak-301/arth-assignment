import { useMemo } from 'react'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { TASKS_STORAGE_KEY } from '../constants/storageKeys'
import { MOCK_TASKS } from '../data/mockTasks'
import type {
  CreateTaskInput,
  EditTaskInput,
  MoveTaskInput,
  Task,
  TaskState,
} from '../types/task'
import { groupTasksByStatus } from '../utils/taskHelpers'

const initialState: TaskState = {
  sections: groupTasksByStatus(MOCK_TASKS),
  filter: 'all',
}

const generateTaskId = (): string => crypto.randomUUID()

type TaskStore = TaskState & {
  createTask: (payload: CreateTaskInput) => void
  editTask: (payload: EditTaskInput) => void
  deleteTask: (id: string) => void
  moveTask: (payload: MoveTaskInput) => void
  setFilter: (filter: TaskState['filter']) => void
}

const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      ...initialState,
      createTask: (payload) =>
        set((state) => {
          const now = new Date().toISOString()
          const status = payload.status ?? 'todo'
          const task: Task = {
            id: generateTaskId(),
            title: payload.title.trim(),
            description: payload.description?.trim(),
            tags: payload.tags ?? [],
            status,
            createdAt: now,
            updatedAt: now,
          }

          return {
            sections: {
              ...state.sections,
              [status]: [task, ...state.sections[status]],
            },
          }
        }),
      editTask: (payload) =>
        set((state) => {
          const { id, title, description, tags, status } = payload
          let existingTask: Task | null = null
          let sourceStatus: keyof TaskState['sections'] | null = null

          for (const sectionStatus of Object.keys(state.sections) as Array<
            keyof TaskState['sections']
          >) {
            const found = state.sections[sectionStatus].find((task) => task.id === id)
            if (found) {
              existingTask = found
              sourceStatus = sectionStatus
              break
            }
          }

          if (!existingTask || !sourceStatus) {
            return state
          }

          const nextStatus = status ?? existingTask.status
          const updatedTask: Task = {
            ...existingTask,
            title: title?.trim() ?? existingTask.title,
            description:
              description !== undefined
                ? description.trim()
                : existingTask.description,
            tags: tags ?? existingTask.tags ?? [],
            status: nextStatus,
            updatedAt: new Date().toISOString(),
          }

          if (nextStatus === sourceStatus) {
            return {
              sections: {
                ...state.sections,
                [sourceStatus]: state.sections[sourceStatus].map((task) =>
                  task.id === id ? updatedTask : task,
                ),
              },
            }
          }

          return {
            sections: {
              ...state.sections,
              [sourceStatus]: state.sections[sourceStatus].filter(
                (task) => task.id !== id,
              ),
              [nextStatus]: [updatedTask, ...state.sections[nextStatus]],
            },
          }
        }),
      deleteTask: (id) =>
        set((state) => ({
          sections: {
            todo: state.sections.todo.filter((task) => task.id !== id),
            pending: state.sections.pending.filter((task) => task.id !== id),
            completed: state.sections.completed.filter((task) => task.id !== id),
          },
        })),
      moveTask: (payload) =>
        set((state) => {
          const { sourceStatus, destinationStatus, sourceIndex, destinationIndex } =
            payload
          const sourceTasks = [...state.sections[sourceStatus]]
          const destinationTasks =
            sourceStatus === destinationStatus
              ? sourceTasks
              : [...state.sections[destinationStatus]]

          const [moved] = sourceTasks.splice(sourceIndex, 1)
          if (!moved) return state

          const movedTask: Task = {
            ...moved,
            status: destinationStatus,
            updatedAt: new Date().toISOString(),
          }
          destinationTasks.splice(destinationIndex, 0, movedTask)

          if (sourceStatus === destinationStatus) {
            return {
              sections: {
                ...state.sections,
                [sourceStatus]: destinationTasks,
              },
            }
          }

          return {
            sections: {
              ...state.sections,
              [sourceStatus]: sourceTasks,
              [destinationStatus]: destinationTasks,
            },
          }
        }),
      setFilter: (filter) => set({ filter }),
    }),
    {
      name: TASKS_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ sections: state.sections, filter: state.filter }),
    },
  ),
)

export const useTasks = () => {
  const sections = useTaskStore((store) => store.sections)
  const filter = useTaskStore((store) => store.filter)
  const createTask = useTaskStore((store) => store.createTask)
  const editTask = useTaskStore((store) => store.editTask)
  const deleteTask = useTaskStore((store) => store.deleteTask)
  const moveTask = useTaskStore((store) => store.moveTask)
  const setFilter = useTaskStore((store) => store.setFilter)

  const state = useMemo(
    () => ({
      sections,
      filter,
    }),
    [filter, sections],
  )

  const filteredSections = useMemo(() => {
    if (filter === 'all') {
      return sections
    }

    return {
      todo: [],
      pending: filter === 'pending' ? sections.pending : [],
      completed: filter === 'completed' ? sections.completed : [],
    }
  }, [filter, sections])

  return {
    state,
    filteredSections,
    actions: {
      createTask,
      editTask,
      deleteTask,
      moveTask,
      setFilter,
    },
  }
}

