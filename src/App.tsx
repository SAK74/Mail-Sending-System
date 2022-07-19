import { Navigate, Route, Routes } from "react-router-dom";
import { Subscribers, Mails, Dashboard } from './pages';
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Navigate to="subscribers" />} />
          <Route path="subscribers" element={<Subscribers />} />
          <Route path="mails" element={<Mails />} />
        </Route>
      </Routes>
    </div>
  );
}
