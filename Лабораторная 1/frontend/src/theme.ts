import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#1f6b45", contrastText: "#f6f3ec" },
    secondary: { main: "#c4622d", contrastText: "#fffaf4" },
    background: { default: "#f4f1ea", paper: "#fffcf7" },
    text: { primary: "#1a2420", secondary: "#5c6b64" },
    divider: "#e4ddd2",
  },
  typography: {
    fontFamily: '"Manrope", "Segoe UI", sans-serif',
    h4: {
      fontFamily: '"Literata", Georgia, serif',
      fontWeight: 560,
      letterSpacing: "-0.03em",
    },
    button: { fontWeight: 700 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: "none", fontWeight: 700 } },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "none" } },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: "#e4ddd2" },
        head: { fontWeight: 700, color: "#5c6b64" },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: { root: { backgroundColor: "#fffcf7" } },
    },
  },
});
