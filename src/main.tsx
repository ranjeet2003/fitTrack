import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Define a basic Material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#4F46E5', // Example primary color, adjust to your design
    },
    secondary: {
      main: '#6B7280', // Example secondary color
    },
    background: {
      default: '#1F2937', // Dark background for the app
      paper: '#FFFFFF', // Card background changed to white
    },
    text: {
      primary: '#212121', // Dark text color for contrast on white cards
      secondary: '#616161', // Medium text color
    },
    error: {
      main: '#EF4444', // Red error color
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif', // Assuming Inter is the font from index.css
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Prevent uppercase buttons by default
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Example shadow
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: '#6B7280', // Border color for outlined input
          },
          '&:hover fieldset': {
            borderColor: '#4F46E5 !important', // Hover border color
          },
          '&.Mui-focused fieldset': {
            borderColor: '#4F46E5 !important', // Focused border color
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#D1D5DB', // Label color
          '&.Mui-focused': {
            color: '#4F46E5', // Focused label color
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#D1D5DB', // Select icon color
        },
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
