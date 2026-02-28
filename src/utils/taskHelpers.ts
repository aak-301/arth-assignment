import { TASK_STATUSES, type Task, type TaskSections } from '../types/task'

export const createEmptySections = (): TaskSections => ({
  todo: [],
  pending: [],
  completed: [],
})

export const groupTasksByStatus = (tasks: Task[]): TaskSections => {
  const sections = createEmptySections()

  tasks.forEach((task) => {
    sections[task.status].push(task)
  })

  TASK_STATUSES.forEach((status) => {
    sections[status] = [...sections[status]]
  })

  return sections
}

