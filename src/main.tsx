import { StrictMode, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { getEmeraldCharcoalTheme } from './theme/emeraldCharcoalTheme'
import './index.css'
import App from './App.tsx'

function Root() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark')
  const appTheme = useMemo(
    () => getEmeraldCharcoalTheme(themeMode),
    [themeMode],
  )

  const onToggleTheme = () => {
    setThemeMode((previousMode) =>
      previousMode === 'dark' ? 'light' : 'dark',
    )
  }

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <App themeMode={themeMode} onToggleTheme={onToggleTheme} />
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
