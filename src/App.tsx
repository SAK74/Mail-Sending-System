import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
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
        <Routes>
          <Route path="/" element={<Dashboard changeMode={setDarkMode} />}>
            <Route index element={<Loggin />} />
            <Route path="subscribers" element={<Subscribers />} />
            <Route path="mails" element={<Mails />} />
          </Route>
        </Routes>
      </ThemeProvider>
      <p>{isLogged ? "zalogowany" : "wylogowany"}</p>
      <button onClick={() => dispatch(setUnlogged())}>wyloguj</button>
    </div>
  );
}
