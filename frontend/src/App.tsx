import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Plataforma Educativa
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Funciones Cuadráticas
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Configuración inicial completada ✓
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default App;
