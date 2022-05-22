import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import { fetchData } from "./features/makeAirtableRequest";
import { Mail } from "./types";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}
store.dispatch(fetchData<Mail>("mails")());
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  rootElement
);
