import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { setupInterceptors } from "./api";

// if (process.env.NODE_ENV === "development") {
//   const { worker } = require("./mockAPI/browser");
//   worker.start();
// }
setupInterceptors(store.getState);
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
  rootElement
);
