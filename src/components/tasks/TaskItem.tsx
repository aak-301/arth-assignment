import { useEffect, useMemo, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { TASK_TAG_OPTIONS, type TaskStatus, type TaskTag } from '../../types/task'

type TaskItemValues = {
  taskId?: string
  title: string
  description?: string
  tags: TaskTag[]
  status: TaskStatus
  createdAt?: string
}

type TaskItemProps = {
  open: boolean
  mode: 'create' | 'view'
  initialValues?: TaskItemValues
  onClose: () => void
  onSubmit: (values: TaskItemValues) => void
  onDelete?: () => void
}

const DEFAULT_VALUES: TaskItemValues = {
  taskId: '',
  title: '',
  description: '',
  tags: [],
  status: 'todo',
  createdAt: '',
}

const STATUS_OPTIONS: TaskStatus[] = ['todo', 'pending', 'completed']

const toTitle = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1)

export default function TaskItem({
  open,
  mode,
  initialValues,
  onClose,
  onSubmit,
  onDelete,
}: TaskItemProps) {
  const [values, setValues] = useState<TaskItemValues>(DEFAULT_VALUES)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open) return
    setCopied(false)
    setValues({
      ...DEFAULT_VALUES,
      ...initialValues,
    })
  }, [initialValues, open])

  const heading = useMemo(
    () => (mode === 'create' ? 'Add Task' : 'Task Details'),
    [mode],
  )

  const canSave = values.title.trim().length > 0

  const handleSave = () => {
    if (!canSave) return
    onSubmit({
      title: values.title.trim(),
      description: values.description?.trim() || undefined,
      tags: values.tags,
      status: values.status,
      createdAt: values.createdAt,
    })
  }

  const handleCopyTaskId = async () => {
    if (!values.taskId) return
    await navigator.clipboard.writeText(values.taskId)
    setCopied(true)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{heading}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 0.5 }}>
          <TextField
            label="Title"
            value={values.title}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, title: event.target.value }))
            }
            fullWidth
          />
          <TextField
            label="Description"
            value={values.description ?? ''}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, description: event.target.value }))
            }
            fullWidth
            multiline
            minRows={3}
          />
          <TextField
            select
            label="Status"
            value={values.status}
            onChange={(event) =>
              setValues((prev) => ({
                ...prev,
                status: event.target.value as TaskStatus,
              }))
            }
            fullWidth
          >
            {STATUS_OPTIONS.map((status) => (
              <MenuItem key={status} value={status}>
                {toTitle(status)}
              </MenuItem>
            ))}
          </TextField>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Tags
            </Typography>
            <Select
              multiple
              size="small"
              value={values.tags}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  tags: event.target.value as TaskTag[],
                }))
              }
              renderValue={(selected) => (selected as string[]).join(', ')}
            >
              {TASK_TAG_OPTIONS.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Created Date: {values.createdAt || 'Not available'}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Task ID: {values.taskId || 'Not available'}
            </Typography>
            {values.taskId ? (
              <Button size="small" onClick={handleCopyTaskId}>
                {copied ? 'Copied' : 'Copy'}
              </Button>
            ) : null}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        {mode === 'view' && onDelete ? (
          <Button color="error" onClick={onDelete}>
            Delete
          </Button>
        ) : null}
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={!canSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

