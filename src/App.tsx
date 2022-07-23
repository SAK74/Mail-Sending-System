import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { TopPanel } from "./components/TopPanel";
import { Subscribers, Mails, Dashboard, Loggin } from './pages';
import { setUnlogged } from "./pages/loggin/logginSlice";
import { useReduxDispatch, useReduxSelector } from "./store";
import "./styles.css";

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark'
  }
}
export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = createTheme(darkMode ? darkTheme : {});
  const { isLogged } = useReduxSelector(state => state.loggin);
  const dispatch = useReduxDispatch();
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <TopPanel changeMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={!isLogged ? <Loggin /> : <Navigate to="subscribers" />} />
            <Route path="subscribers" element={isLogged ? <Subscribers /> : <Loggin />} />
            <Route path="mails" element={isLogged ? <Mails /> : <Loggin />} />
          </Route>
        </Routes>
      </ThemeProvider>
      <p>{isLogged ? "zalogowany" : "wylogowany"}</p>
      <button onClick={() => dispatch(setUnlogged())}>wyloguj</button>
    </div>
  );
}
