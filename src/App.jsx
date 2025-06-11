import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getDesignTokens } from "./utils/theme";
import NavBar from "./components/NavBar";
import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  const [mode, setMode] = React.useState(
    !!localStorage.getItem("currentMode")
      ? localStorage.getItem("currentMode")
      : "light"
  );
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <NavBar setMode={setMode} />
        <CssBaseline />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
