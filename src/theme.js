import { createMuiTheme } from "@material-ui/core/styles";
import { red, cyan } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: cyan,
    secondary: red,
    error: {
      main: red.A400
    },
    background: {
      default: "#777774"
    }
  }
});

export default theme;
