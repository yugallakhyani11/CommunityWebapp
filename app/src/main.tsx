import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import {store} from "./store";
import router from "./router";
import "./index.css";
import "./store/index";
import { Provider } from "react-redux";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <I18nextProvider i18n={i18n}>
    <RouterProvider router={router} />
  </I18nextProvider>
    </Provider>
  </React.StrictMode>
);
