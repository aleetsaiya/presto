import { createTheme } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const nord = {
  black: {
    0: '#4C566A',
    1: '#434C5E',
    2: '#3B4252',
    3: '#2E3440',
  },
  white: {
    0: '#F8F9FB',
    1: '#ECEFF4',
    2: '#E5E9F0',
    3: '#D8DEE9',
  },
  blue: {
    0: '#8FBCBB',
    1: '#88C0D0',
    2: '#81A1C1',
    3: '#5E81AC',
  },
  red: {
    0: '#f8eaec',
    1: '#Bf616A',
  },
  orange: '#D08770',
  yellow: '#EBCB8B',
  green: '#A3BE8C',
  purple: '#B48EAD',
};

type NordPalette = typeof nord;

declare module '@mui/material/styles' {
  interface PaletteOptions {
    nord?: NordPalette;
  }
  interface Palette {
    nord: NordPalette;
  }
}

export const theme = createTheme({
  palette: {
    nord: nord,
    primary: {
      main: nord.black[2],
    },
    secondary: {
      main: nord.black[1],
    },
    error: {
      main: nord.red[1],
    },
    warning: {
      main: nord.orange,
    },
    info: {
      main: nord.blue[3],
    },
    success: {
      main: nord.green,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--toastify-color-error': nord.red[1],
          '--toastify-color-success': nord.green,
          '--toastify-color-warning': nord.yellow,
          '--toastify-text-color-light': nord.black[1],
          '--toastify-toast-width': '450px',
        },
        body: {
          color: nord.black[3],
          backgroundColor: nord.white[0],
        },
      },
    },
  },
});
