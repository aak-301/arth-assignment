import { useEffect, useMemo, useState } from 'react'
import { Box, Container, Stack, useMediaQuery, useTheme } from '@mui/material'
import AppHeader from '../components/layout/AppHeader'
import TaskFilters from '../components/tasks/TaskFilters'
import TaskItem from '../components/tasks/TaskItem'
import TaskList from '../components/tasks/TaskList'
import { useTasks } from '../hooks/useTasks'
import type { Task, TaskFilter, TaskStatus, TaskTag } from '../types/task'

const SECTION_ORDER: TaskStatus[] = ['todo', 'pending', 'completed']

type HomePageProps = {
  themeMode: 'light' | 'dark'
  onToggleTheme: () => void
}

export default function HomePage({ themeMode, onToggleTheme }: HomePageProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [searchText, setSearchText] = useState('')
  const [debouncedSearchText, setDebouncedSearchText] = useState('')
  const [dragTaskMeta, setDragTaskMeta] = useState<{
    sourceStatus: TaskStatus
    sourceIndex: number
  } | null>(null)
  const { state, filteredSections, actions } = useTasks()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const canDragAndDrop = state.filter === 'all'

  const totalCount = useMemo(
    () => state.sections.todo.length + state.sections.pending.length + state.sections.completed.length,
    [state.sections.completed.length, state.sections.pending.length, state.sections.todo.length],
  )

  const visibleSections = useMemo<TaskStatus[]>(
    () => (state.filter === 'all' ? SECTION_ORDER : [state.filter]),
    [state.filter],
  )

  const matchesSearch = (task: Task, query: string): boolean => {
    const title = task.title.toLowerCase()
    const description = (task.description ?? '').toLowerCase()
    const taskId = task.id.toLowerCase()
    const tags = (task.tags ?? []).join(' ').toLowerCase()
    return (
      title.includes(query) ||
      description.includes(query) ||
      tags.includes(query) ||
      taskId.includes(query) ||
      taskId.slice(0, 4).includes(query)
    )
  }

  const searchedSections = useMemo(() => {
    const query = debouncedSearchText.trim().toLowerCase()
    if (!query) return filteredSections

    return {
      todo: filteredSections.todo.filter((task) => matchesSearch(task, query)),
      pending: filteredSections.pending.filter((task) => matchesSearch(task, query)),
      completed: filteredSections.completed.filter((task) =>
        matchesSearch(task, query),
      ),
    }
  }, [debouncedSearchText, filteredSections])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchText(searchText)
    }, 300)

    return () => window.clearTimeout(timeoutId)
  }, [searchText])

  const onCreateTask = (values: {
    title: string
    description?: string
    tags: TaskTag[]
    status: TaskStatus
    createdAt?: string
  }) => {
    actions.createTask({
      title: values.title,
      description: values.description,
      tags: values.tags,
      status: values.status,
    })
    setIsCreateModalOpen(false)
  }

  const onUpdateTask = (values: {
    title: string
    description?: string
    tags: TaskTag[]
    status: TaskStatus
    createdAt?: string
  }) => {
    if (!selectedTask) return

    actions.editTask({
      id: selectedTask.id,
      title: values.title,
      description: values.description,
      tags: values.tags,
      status: values.status,
    })
    setSelectedTask(null)
  }

  const onDeleteTask = () => {
    if (!selectedTask) return
    actions.deleteTask(selectedTask.id)
    setSelectedTask(null)
  }

  const onCardDragStart = (sourceStatus: TaskStatus, sourceIndex: number) => {
    if (!canDragAndDrop) return
    setDragTaskMeta({ sourceStatus, sourceIndex })
  }

  const onColumnDrop = (destinationStatus: TaskStatus) => {
    if (!canDragAndDrop || !dragTaskMeta) return

    actions.moveTask({
      sourceStatus: dragTaskMeta.sourceStatus,
      destinationStatus,
      sourceIndex: dragTaskMeta.sourceIndex,
      destinationIndex: state.sections[destinationStatus].length,
    })

    setDragTaskMeta(null)
  }

  return (
    <Container maxWidth={false} disableGutters sx={{ pt: 0, px: 0, pb: 4 }}>
      <Stack spacing={3}>
        <AppHeader themeMode={themeMode} onToggleTheme={onToggleTheme} />

        <Box sx={{ px: { xs: 1.5, sm: 2.5 } }}>
          <Stack spacing={3}>
            <TaskFilters
              isMobile={isMobile}
              totalCount={totalCount}
              searchText={searchText}
              filter={state.filter}
              onSearchChange={setSearchText}
              onFilterChange={(filter: TaskFilter) => actions.setFilter(filter)}
              onCreateTask={() => setIsCreateModalOpen(true)}
            />

            <TaskList
              isMobile={isMobile}
              visibleSections={visibleSections}
              sections={searchedSections}
              canDragAndDrop={canDragAndDrop}
              onTaskClick={setSelectedTask}
              onCardDragStart={onCardDragStart}
              onCardDragEnd={() => setDragTaskMeta(null)}
              onColumnDrop={onColumnDrop}
            />
          </Stack>
        </Box>
      </Stack>

      <TaskItem
        open={isCreateModalOpen}
        mode="create"
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={onCreateTask}
      />
      <TaskItem
        open={Boolean(selectedTask)}
        mode="view"
        initialValues={
          selectedTask
            ? {
                title: selectedTask.title,
                description: selectedTask.description,
                tags: selectedTask.tags ?? [],
                status: selectedTask.status,
                createdAt: new Date(selectedTask.createdAt).toLocaleDateString(),
                taskId: selectedTask.id,
              }
            : undefined
        }
        onClose={() => setSelectedTask(null)}
        onSubmit={onUpdateTask}
        onDelete={onDeleteTask}
      />
    </Container>
  )
}

