import {
  Box,
  Card,
  CardContent,
  Chip,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import type { Task, TaskSections, TaskStatus } from '../../types/task'

const STATUS_STYLES: Record<
  TaskStatus,
  { label: string; color: 'default' | 'success' | 'warning' }
> = {
  todo: { label: 'Todo', color: 'default' },
  pending: { label: 'Pending', color: 'warning' },
  completed: { label: 'Completed', color: 'success' },
}

const toTitle = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1)

type TaskListProps = {
  isMobile: boolean
  visibleSections: TaskStatus[]
  sections: TaskSections
  canDragAndDrop: boolean
  onTaskClick: (task: Task) => void
  onCardDragStart: (sourceStatus: TaskStatus, sourceIndex: number) => void
  onCardDragEnd: () => void
  onColumnDrop: (destinationStatus: TaskStatus) => void
}

export default function TaskList({
  isMobile,
  visibleSections,
  sections,
  canDragAndDrop,
  onTaskClick,
  onCardDragStart,
  onCardDragEnd,
  onColumnDrop,
}: TaskListProps) {
  const theme = useTheme()

  const renderTaskCard = (
    task: Task,
    sourceStatus: TaskStatus,
    sourceIndex: number,
  ) => (
    <Card
      key={task.id}
      variant="outlined"
      onClick={() => onTaskClick(task)}
      draggable={canDragAndDrop}
      onDragStart={() => onCardDragStart(sourceStatus, sourceIndex)}
      onDragEnd={onCardDragEnd}
      sx={{
        minWidth: isMobile ? 260 : 'auto',
        borderRadius: 1,
        cursor: 'pointer',
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Typography variant="subtitle1">{task.title}</Typography>
            <Typography variant="caption" color="text.secondary">
              #{task.id.slice(0, 4)}
            </Typography>
          </Stack>

          <Typography variant="caption" color="text.secondary">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: 1,
            }}
          >
            <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
              {(task.tags ?? []).map((tag) => (
                <Chip
                  key={`${task.id}-${tag}`}
                  label={tag}
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: 1 }}
                />
              ))}
            </Stack>
            <Chip
              label={STATUS_STYLES[task.status].label}
              color={STATUS_STYLES[task.status].color}
              size="small"
              sx={{ borderRadius: 1 }}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )

  const renderEmptyCard = () => (
    <Card variant="outlined" sx={{ borderRadius: 1, minWidth: isMobile ? 260 : 'auto' }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          No tasks
        </Typography>
      </CardContent>
    </Card>
  )

  if (isMobile) {
    return (
      <Stack spacing={1.5}>
        {visibleSections.map((section) => (
          <Box
            key={section}
            onDragOver={(event) => {
              if (!canDragAndDrop) return
              event.preventDefault()
            }}
            onDrop={() => onColumnDrop(section)}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              {toTitle(section)}
            </Typography>

            <Stack spacing={1.5}>
              {sections[section].length > 0
                ? sections[section].map((task, index) =>
                    renderTaskCard(task, section, index),
                  )
                : renderEmptyCard()}
            </Stack>
          </Box>
        ))}
      </Stack>
    )
  }

  return (
    <Stack direction="row" spacing={2} alignItems="stretch">
      {visibleSections.map((section) => (
        <Paper
          key={section}
          variant="outlined"
          sx={{
            flex: 1,
            p: 1.5,
            borderRadius: 1,
            bgcolor:
              theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : '#f5f6f8',
            borderColor: theme.palette.divider,
            minHeight: 220,
          }}
          onDragOver={(event) => {
            if (!canDragAndDrop) return
            event.preventDefault()
          }}
          onDrop={() => onColumnDrop(section)}
        >
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
            {toTitle(section)}
          </Typography>

          <Stack spacing={1.5}>
            {sections[section].length > 0
              ? sections[section].map((task, index) =>
                  renderTaskCard(task, section, index),
                )
              : renderEmptyCard()}
          </Stack>
        </Paper>
      ))}
    </Stack>
  )
}

