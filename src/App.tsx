import HomePage from './pages/HomePage'

type AppProps = {
  themeMode: 'light' | 'dark'
  onToggleTheme: () => void
}

function App({ themeMode, onToggleTheme }: AppProps) {
  return <HomePage themeMode={themeMode} onToggleTheme={onToggleTheme} />
}

export default App
