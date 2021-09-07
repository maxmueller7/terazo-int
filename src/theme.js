import { createTheme, responsiveFontSizes } from '@material-ui/core';
import { teal, orange } from '@material-ui/core/colors';

let theme = createTheme({
  palette: {
    background: {
      default: '#f6f6f6',
    },
    primary: {
      main: teal[500],
    },
    secondary: {
      main: orange[500],
    },
  },
});

theme = responsiveFontSizes(theme);
export default theme;
