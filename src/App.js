import AddSubscriber from "./components/addSubscriber";
import Subscribers from "./components/subscribers";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Subscribers />
      <hr />
      <AddSubscriber />
    </div>
  );
}
