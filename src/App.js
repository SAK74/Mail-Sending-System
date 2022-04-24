import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Subscribers from "./pages/subscribers";
import "./styles.css";
import Mails from "./pages/mails";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" index element={<Navigate to="subscribers" />} />
          <Route path="subscribers" element={<Subscribers />} />
          <Route path="mails" element={<Mails />} />
        </Route>
      </Routes>
    </div>
  );
}
