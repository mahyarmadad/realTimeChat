import {createTheme} from "@mui/material/styles";
import {COLORS} from "@Constants/colors";
const theme = createTheme({
  palette: {
    mode: "dark",
    primary:{
      main:COLORS.primary
    },
    background:{default:COLORS.background,paper:COLORS.paperBackground}
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "capitalize",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    // MuiContainer: {
    //   defaultProps: {
    //     maxWidth: "xl",
    //   },
    //   styleOverrides: {
    //     root: {
    //       paddingLeft: 24,
    //       paddingRight: 24,
    //     },
    //   },
    // },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

export default theme;
