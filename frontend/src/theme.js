import { createMuiTheme } from '@material-ui/core/styles';
import { blue, green, grey } from '@material-ui/core/colors';
import { ptBR } from '@material-ui/core/locale';

// Incident App theme
const theme = createMuiTheme(
  {
    props: {
      MuiButtonBase: {
        disableRipple: true,
      },
    },
    overrides: {
      MuiToolbar: {
        root: {
          background: '#ba3a23',
          color: 'white',
        },
      },
    },
    typography: {
      htmlFontSize: 16,
      fontFamily: [
        'Poppins',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,

      h1: {
        fontSize: `3rem`,
      },
      h2: {
        fontSize: `2rem`,
      },
      h3: {
        fontSize: `1.75rem`,
      },
      h4: {
        fontSize: `1.5rem`,
      },
      h5: {
        fontSize: `1rem`,
      },
      h6: {
        fontSize: `3rem`,
      },
      subtitle1: {
        fontSize: `3rem`,
        textAlign: 'center',
      },
      subtitle2: {
        fontSize: `2rem`,
        textAlign: 'center',
      },
      subtitle3: {
        fontSize: `2rem`,
        textAlign: `center`,
      },
      uppercase: {
        textTransform: `uppercase`,
      },
    },
    palette: {
      primary: {
        main: `#363332`,
      },
      secondary: {
        main: `#ba3a23`,
      },
      success: {
        main: green.A700,
      },
      info: {
        main: blue.A400,
      },
      error: {
        main: `#ba3a23`,
      },
      confirmed: {
        main: blue.A400,
      },
      background: {
        default: `#ffffff`,
      },
      gray: {
        main: grey.A700,
      },
      level: {
        low: `#0097a7`,
        medium: `#ff9800`,
        high: `#ba3a23`,
      },
    },
  },
  ptBR
);

export default theme;
