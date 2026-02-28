import { createTheme } from '@mui/material/styles'

export const getEmeraldCharcoalTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#166534',
        contrastText: '#ffffff',
      },
      success: {
        main: '#15803D',
      },
      warning: {
        main: '#B45309',
      },
      error: {
        main: '#B91C1C',
      },
      background:
        mode === 'light'
          ? {
              default: '#F6F7F9',
              paper: '#FFFFFF',
            }
          : {
              default: '#0F1412',
              paper: '#1A1F1C',
            },
      text:
        mode === 'light'
          ? {
              primary: '#111827',
              secondary: '#4B5563',
            }
          : {
              primary: '#E5E7EB',
              secondary: '#9CA3AF',
            },
      divider: mode === 'light' ? '#E5E7EB' : '#2A2F2C',
    },
    typography: {
      fontFamily: '"Plus Jakarta Sans", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 700,
        letterSpacing: '-0.5px',
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      body1: {
        fontSize: '0.95rem',
      },
      body2: {
        fontSize: '0.85rem',
        color: mode === 'light' ? '#4B5563' : '#9CA3AF',
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        letterSpacing: '0.3px',
      },
    },
    shape: {
      borderRadius: 4,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'all 0.2s ease-in-out',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            padding: '8px 18px',
            boxShadow: 'none',
          },
          containedPrimary: {
            boxShadow:
              mode === 'light'
                ? '0 4px 14px rgba(22, 101, 52, 0.25)'
                : '0 4px 20px rgba(22, 101, 52, 0.4)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border:
              mode === 'light' ? '1px solid #E5E7EB' : '1px solid #2A2F2C',
            boxShadow:
              mode === 'light'
                ? '0 4px 12px rgba(17, 24, 39, 0.05)'
                : '0 4px 20px rgba(0,0,0,0.4)',
            transition: 'transform 0.15s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#FFFFFF' : '#141917',
            color: mode === 'light' ? '#111827' : '#E5E7EB',
            borderBottom:
              mode === 'light' ? '1px solid #E5E7EB' : '1px solid #2A2F2C',
            boxShadow: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            borderRadius: 4,
          },
          colorPrimary: {
            backgroundColor: mode === 'light' ? '#DCFCE7' : '#064E3B',
            color: mode === 'light' ? '#166534' : '#A7F3D0',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 6,
            },
          },
        },
      },
    },
  })
