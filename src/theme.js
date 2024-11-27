// src/theme.js
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { blue, deepOrange } from '@mui/material/colors';

let theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: deepOrange[500],
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h6: {
      fontWeight: 500,
    },
    body2: {
      fontSize: '1rem',
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
