import { createTheme } from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const nord = {
  black: {
    0: '#2E3440',
    1: '#3B4252',
    2: '#434C5E',
    3: '#4C566A',
  },
  white: {
    0: '#F8F9FB',
    1: '#D8DEE9',
    2: '#E5E9F0',
    3: '#ECEFF4',
  },
  blue: {
    0: '#8FBCBB',
    1: '#88C0D0',
    2: '#81A1C1',
    3: '#5E81AC',
  },
  red: '#Bf616A',
  orange: '#D08770',
  yellow: '#EBCB8B',
  green: '#A3BE8C',
  purple: '#B48EAD',
};

type NordPalette = typeof nord;

declare module '@mui/material/styles' {
  interface PaletteOptions {
    nord: NordPalette
  }
  interface Palette {
    nord: NordPalette
  }
}

export const theme = createTheme({
  palette: {
    nord: nord,
    primary: {
      main: nord.black[1],
    },
    secondary: {
      main: nord.black[2],
    },
    error: {
      main: nord.red,
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
        body: {
          color: nord.black[3],
          backgroundColor: nord.white[0],
        },
      },
    },
  },
});
