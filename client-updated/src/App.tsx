import { useCallback, useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import styled from "styled-components";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { WindowContextProvider } from "./context/WindowContextProvider";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import { Home } from "./pages/Home";
import { Vehicles } from "./pages/Vehicles";
import { Trucks } from "./pages/Trucks";
import { Containers } from "./pages/Containers";
import { Users } from "./pages/users";
import { PaletteMode } from "@mui/material";
import { LoginDialog } from "./components/LoginDialog";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
const Wrapper = styled.section`
  display: flex;
  min-height: 100vh;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const MainContainer = styled.section`
  flex-grow: 1;
  padding: 20px 16px 30px 16px;
  .cardHeader {
    font-family: Anton;
  }
`;
export const Themes = {
  DARK: "dark",
  LIGHT: "light",
};

export const App = () => {
  const { user, login } = useAuth();
  const [mode, setMode] = useState<PaletteMode>(
    localStorage.getItem("prefferDarkMode") === "1" ? "dark" : "light"
  );
  const setUser = useCallback(() => {
      login({
        id: "1",
        email: "trayanstyoanov@abv.bg",
        name: "trayan"
      })
  }, [login])
  useEffect(() => {
    setUser()
  }, [setUser])

  const themeToggler = () => {
    mode === Themes.LIGHT ? setMode("dark") : setMode("light");
  };
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  useEffect(() => {
    localStorage.setItem(
      "prefferDarkMode",
      (mode === Themes.DARK ? 1 : 0).toString()
    );
  }, [mode]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ThemeProvider theme={mode === Themes.LIGHT ? lightTheme : darkTheme}>
        <LoginDialog />

        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <>
            <GlobalStyles />
            <Wrapper>
              <WindowContextProvider>
                <Sidebar theme={mode} themeToggler={themeToggler} />
                <MainContainer>
                  <Header />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/vehicles" element={<Vehicles />} />
                    <Route path="/trucks" element={<Trucks />} />
                    <Route path="/containers" element={<Containers />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/settings" element={<Users />} />
                  </Routes>
                </MainContainer>
              </WindowContextProvider>
            </Wrapper>
          </>
        </MuiThemeProvider>
      </ThemeProvider>
    </AuthContext.Provider>
  );
};
