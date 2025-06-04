import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getDesignTokens } from "./utils/theme";
import NavBar from "./components/NavBar";
import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [mode, setMode] = React.useState(
    !!localStorage.getItem("currentMode")
      ? localStorage.getItem("currentMode")
      : "light"
  );
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <NavBar setMode={setMode} />
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
