import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
// Create a custom theme
const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif', // Use Quicksand as default
  },
  palette: {
    background: {
      default: "#ededed",
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
      <App />
      </SnackbarProvider>
    </ThemeProvider>
    </Router>
  </StrictMode>,
)