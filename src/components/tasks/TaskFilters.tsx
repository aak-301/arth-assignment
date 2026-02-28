import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import type { TaskFilter } from '../../types/task'

type TaskFiltersProps = {
  isMobile: boolean
  totalCount: number
  searchText: string
  filter: TaskFilter
  onSearchChange: (value: string) => void
  onFilterChange: (value: TaskFilter) => void
  onCreateTask: () => void
}

export default function TaskFilters({
  isMobile,
  totalCount,
  searchText,
  filter,
  onSearchChange,
  onFilterChange,
  onCreateTask,
}: TaskFiltersProps) {
  if (isMobile) {
    return (
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Button variant="contained" onClick={onCreateTask}>
            Add Task
          </Button>
          <Typography variant="body2" color="text.secondary">
            Total Tasks: {totalCount}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1.5}>
          <TextField
            size="small"
            placeholder="Search by title, description or task ID"
            value={searchText}
            onChange={(event) => onSearchChange(event.target.value)}
            sx={{ flex: 1 }}
          />

          <FormControl size="small" sx={{ width: 140 }}>
            <InputLabel id="task-filter-select-label">Filter</InputLabel>
            <Select
              labelId="task-filter-select-label"
              value={filter}
              label="Filter"
              onChange={(event) => onFilterChange(event.target.value as TaskFilter)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button variant="contained" onClick={onCreateTask}>
        Add Task
      </Button>

      <TextField
        size="small"
        placeholder="Search by title, description or task ID"
        value={searchText}
        onChange={(event) => onSearchChange(event.target.value)}
        sx={{ flex: 1 }}
      />

      <FormControl size="small" sx={{ width: 180 }}>
        <InputLabel id="task-filter-select-label">Filter</InputLabel>
        <Select
          labelId="task-filter-select-label"
          value={filter}
          label="Filter"
          onChange={(event) => onFilterChange(event.target.value as TaskFilter)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="body2" color="text.secondary">
        Total Tasks: {totalCount}
      </Typography>
    </Stack>
  )
}

