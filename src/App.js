import { Route, Routes } from "react-router-dom";
import AddSubscriber from "./components/addSubscriber";
import Dashboard from "./components/dashboard";
import Subscribers from "./components/subscribers";
import CreateMail from './pages/createMail';
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index path="subscribers" element={<Subscribers />} />
          <Route path="mails" />
          <Route path="mailedit" element={<CreateMail />} />
        </Route>

        {/* <Subscribers />
        <hr />
        <AddSubscriber /> */}
      </Routes>
    </div>
  );
}
