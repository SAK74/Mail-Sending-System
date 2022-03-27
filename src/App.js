import Subscribers from "./components/subscribers";
// import fetchData from "./features/fetchData";
import "./styles.css";

export default function App() {
  // fetchData().then((data) => console.log(data));
  // console.log(testRequest);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      {/* <h2>Start editing to see some magic happen!</h2> */}
      <Subscribers />
    </div>
  );
}
