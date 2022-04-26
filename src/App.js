import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import { Subscribers, Mails } from './pages';
import "./styles.css";

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
