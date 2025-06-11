import { ColorLensRounded } from "@mui/icons-material";

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
    },
    warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
    },
    info: {
      main: "#0288d1",
      light: "#03a9f4",
      dark: "#01579b",
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
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
            backgroundColor: mode === "light" ? "#666666" : "#ffffff",
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
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: mode === "light" ? "#333333" : "#f3f3f3",
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: mode === "light" ? "#333333" : "#f3f3f3",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          "& .MuiSwitch-track": {
            backgroundColor: mode === "light" ? "#cccccc" : "#666666",
          },
          "& .MuiSwitch-thumb": {
            backgroundColor: mode === "light" ? "#333333" : "#f3f3f3",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: mode === "light" ? "#333333" : "#f3f3f3",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: mode === "light" ? "#666666" : "#ffffff",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: mode === "light" ? "#666666" : "#ffffff",
          },
          color: mode === "light" ? "#333333" : "#f3f3f3",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "light" ? "#ffffff" : "#1e1e1e",
          borderColor: mode === "light" ? "#f3f3f3" : "#333333",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === "light" ? "#ffffff" : "#080414",
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
            backgroundColor: mode === "light" ? "#666666" : "#ffffff",
            color: mode === "light" ? "#ffffff" : "#333333",
          },
        },
      },
    },
  },
});
