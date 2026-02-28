import {
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'

type AppHeaderProps = {
  themeMode: 'light' | 'dark'
  onToggleTheme: () => void
}

export default function AppHeader({ themeMode, onToggleTheme }: AppHeaderProps) {
  const theme = useTheme()

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 1,
        bgcolor:
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.06)'
            : 'rgba(22, 101, 52, 0.08)',
        borderColor: theme.palette.divider,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h4"
          sx={{ fontFamily: '"Caveat", cursive', textAlign: 'left' }}
        >
          Task Manager
        </Typography>
        <IconButton onClick={onToggleTheme} aria-label="toggle theme">
          {themeMode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </IconButton>
      </Stack>
    </Paper>
  )
}

