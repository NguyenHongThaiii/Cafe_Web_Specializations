import { Provider } from "react-redux";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.scss";
import store from "./store/store";
import "./tailwind.scss";
import { GlobalProvider } from "./context/Global-Provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalProvider>
          <Suspense fallback={<div>Fall Back</div>}>
            <App />
          </Suspense>
        </GlobalProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
