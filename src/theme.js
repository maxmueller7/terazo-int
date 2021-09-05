import { createTheme } from '@material-ui/core';
import { teal, orange } from '@material-ui/core/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: orange[500],
    },
  },
});
