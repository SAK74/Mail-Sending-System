import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import worker from './mocks/browser';
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import { fetchData } from "./features/makeAirtableRequest";

if (process.env.NODE_ENV === "development") {
  worker.start();
}
store.dispatch(fetchData("mails")());
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
