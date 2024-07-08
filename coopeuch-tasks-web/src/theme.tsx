import { createTheme, Shadows } from "@mui/material/styles";

export const titleFont: string = "Poppins, sans-serif;";
export const bodyFont: string = "Sintony, sans-serif";

export const primaryColor: string = "#121212";
export const secondaryColor: string = "#1F1F1F";
export const white: string = "#E0E0E0";
export const lightPrimary: string = "#2C2C2C";

export const appTheme = createTheme({
  palette: {
    background: {
      default: primaryColor,
    },
    primary: {
      main: primaryColor,
      contrastText: white,
    },
    secondary: {
      main: secondaryColor,
      contrastText: white,
    },
    error: {
      main: "#D21D33",
      contrastText: "#FFF", // Color de error personalizado
    },
    warning: {
      main: "#FFC107", // Color de advertencia personalizado
    },
    success: {
      main: "#00C853", // Color de éxito personalizado
      contrastText: "#FFF",
    },
    info: {
      main: "#2196F3", // Color de información personalizado
    },
  },
  typography: {
    h1: { fontFamily: titleFont, fontSize: 50, color: white },
    h2: { fontFamily: titleFont, fontSize: 38, color: white },
    h3: { fontFamily: titleFont, fontSize: 30, color: white },
    h4: { fontFamily: titleFont, fontSize: 25, color: white },
    h5: { fontFamily: titleFont, fontSize: 20, color: white },
    h6: { fontFamily: titleFont, fontSize: 15, color: white },
    subtitle1: { fontFamily: bodyFont, color: "#D21D33" },
    caption: { fontFamily: bodyFont, fontSize: 18, color: "#D21D33" },
  },

  shadows: Array(25).fill("none") as Shadows,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "1.8rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: ".8rem",
          fontFamily: bodyFont,
          borderColor: "black",
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        sx: {
          "& .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${white}`,
          },
          "&:hover > .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${white}`,
          },
        },
      },
      styleOverrides: {
        root: {
          borderRadius: ".5em",
          color: white,
          backgroundColor: secondaryColor,
        },
        input: {
          "&:-webkit-autofill": {
            "-webkit-box-shadow": `0 0 0 100px ${white} inset`,
            "-webkit-text-fill-color": white,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: white,
          fontFamily: bodyFont,
          fontSize: 15,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: lightPrimary,
        },
      },
    },
    MuiDrawer: {
      defaultProps: {
        PaperProps: {
          sx: {
            backgroundColor: lightPrimary,
            color: white,
          },
        },
      },
    },
    MuiListItemText: {
      defaultProps: {
        primaryTypographyProps: {
          fontFamily: titleFont,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: secondaryColor,
        },
      },
    },
    MuiTableHead: {
      defaultProps: {
        sx: {
          borderRadius: "1.8rem",
        },
      },
      styleOverrides: {
        root: {
          color: primaryColor,
        },
      },
    },
    MuiTableCell: {
      defaultProps: {
        sx: {
          fontFamily: bodyFont,
        },
      },
      styleOverrides: {
        root: {
          borderColor: primaryColor,
        },
        head: {
          "&:first-of-type": {
            borderTopLeftRadius: ".3rem",
          },
          "&:last-child": {
            borderTopRightRadius: ".3rem",
          },
        },
      },
    },
    MuiPagination: {
      defaultProps: {
        sx: {
          "& .MuiPaginationItem-page": {
            color: white,
          },
          "& .MuiPaginationItem-root.MuiPaginationItem-icon": {
            color: white,
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        tag: {
          color: white,
          border: `1px solid ${secondaryColor}`,
        },
        option: {
          color: white, // Cambia el color de fondo de la lista desplegable a rojo
        },

        listbox: {
          borderRadius: "1.6em",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          border: `2px solid ${secondaryColor}`,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: white,
        },
      },
    },
    MuiBackdrop: {
      defaultProps: {
        sx: {
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          color: "#00C853", // Cambia el color de texto
        },
        standardError: {
          color: secondaryColor,
        },
        standardInfo: {
          color: "#2196F3",
        },
        standardWarning: {
          color: "#FFC107",
        },
        root: {
          backgroundColor: `rgba(0,0,0,.2)`,
          fontFamily: titleFont,
        },
      },
    },
  },
});
