export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: mode === "light" ? "#fff" : "#f3f3f3",
      light: mode === "light" ? "#666666" : "#ffffff",
      dark: mode === "light" ? "#000000" : "#c0c0c0",
    },
    secondary: {
      main: "#e0e0e0",
      light: "#ffffff",
      dark: "#aeaeae",
    },
    footer: {
      background: mode === "light" ? "#000" : "",
    },
    text: {
      primary: mode === "light" ? "#333333" : "#ffffff",
      secondary: mode === "light" ? "#666666" : "rgba(255,255,255,0.7)",
      disabled: mode === "light" ? "rgba(0,0,0,0.38)" : "rgba(255,255,255,0.5)",
      hint: mode === "light" ? "rgba(0,0,0,0.38)" : "rgba(255,255,255,0.5)",
    },
    divider: mode === "light" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)",
    border: {
      main: mode === "light" ? "#f3f3f3" : "#333",
      top: mode === "light" ? "#f3f3f3" : "#333",
      right: mode === "light" ? "#f3f3f3" : "#333",
      bottom: mode === "light" ? "#f3f3f3" : "#333",
      left: mode === "light" ? "#f3f3f3" : "#333",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
      "&:hover": {
        backgroundColor: mode === "light" ? "#ef5350" : "#c62828",
        opacity: 0.8,
      },
    },
    warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
      "&:hover": {
        backgroundColor: mode === "light" ? "#ff9800" : "#e65100",
        opacity: 0.8,
      },
    },
    info: {
      main: "#0288d1",
      light: "#03a9f4",
      dark: "#01579b",
      "&:hover": {
        backgroundColor: mode === "light" ? "#03a9f4" : "#01579b",
        opacity: 0.8,
      },
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
      "&:hover": {
        backgroundColor: mode === "light" ? "#4caf50" : "#1b5e20",
        opacity: 0.8,
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        outlined: {
          borderColor: mode === "light" ? "#333333" : "#f3f3f3",
          color: mode === "light" ? "#333333" : "#f3f3f3",
          "&:hover": {
            borderColor: mode === "light" ? "#666666" : "#ffffff",
            backgroundColor: "transparent",
          },
        },
        contained: {
          backgroundColor: mode === "light" ? "#15171a" : "#f3f3f3",
          color: mode === "light" ? "#ffffff" : "#333333",
          "&:hover": {
            backgroundColor: mode === "light" ? "#666666" : "#888",
          },
        },
        text: {
          color: mode === "light" ? "#333333" : "#f3f3f3",
          "&:hover": {
            backgroundColor: "transparent",
            color: mode === "light" ? "#666666" : "#ffffff",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: mode === "light" ? "#333333" : "#f3f3f3",
            },
            "&:hover fieldset": {
              borderColor: mode === "light" ? "#666666" : "#ffffff",
            },
            "&.Mui-focused fieldset": {
              borderColor: mode === "light" ? "#666666" : "#ffffff",
            },
          },
          "& .MuiInputLabel-root": {
            color: mode === "light" ? "#333333" : "#f3f3f3",
          },
          "& .MuiInputBase-input": {
            color: mode === "light" ? "#333333" : "#f3f3f3",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === "light" ? "#ffffff" : "#080414",
          m: { xs: 2, sm: 0 },
          // width: { xs: "90%", sm: "100%" },
          borderRadius: { xs: 2, sm: 0 },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: mode === "light" ? "#f3f3f3" : "#333333",
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "light" ? "#15171a" : "#f3f3f3",
          color: mode === "light" ? "#ffffff" : "#333333",
          "&:hover": {
            backgroundColor: mode === "light" ? "#666666" : "#888",
            color: mode === "light" ? "#ffffff" : "#000000",
          },
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          "& .MuiAlert-root": {
            backgroundColor: mode === "light" ? "#ffffff" : "#1e1e1e",
            color: mode === "light" ? "#333333" : "#ffffff",
          },
          "& .MuiAlert-standardSuccess": {
            backgroundColor: mode === "light" ? "#edf7ed" : "#1e4620",
            color: mode === "light" ? "#1e4620" : "#ffffff",
          },
          "& .MuiAlert-standardWarning": {
            backgroundColor: mode === "light" ? "#fff4e5" : "#663c00",
            color: mode === "light" ? "#663c00" : "#ffffff",
          },
          "& .MuiAlert-standardError": {
            backgroundColor: mode === "light" ? "#fdeded" : "#5f2120",
            color: mode === "light" ? "#5f2120" : "#ffffff",
          },
        },
      },
      defaultProps: {
        anchorOrigin: { vertical: "top", horizontal: "right" },
        autoHideDuration: 6000,
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          alignItems: "center",
        },
        icon: {
          opacity: 0.9,
        },
      },
    },
  },
});
