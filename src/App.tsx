import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import { Subscribers, Mails } from './pages';
import "./styles.css";

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark'
  }
}
export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = createTheme(darkMode ? darkTheme : {});
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Dashboard changeMode={setDarkMode} />}>
            <Route index element={<Navigate to="subscribers" />} />
            <Route path="subscribers" element={<Subscribers />} />
            <Route path="mails" element={<Mails />} />
          </Route>
        </Routes>
      </ThemeProvider>

    </div>
  );
}
