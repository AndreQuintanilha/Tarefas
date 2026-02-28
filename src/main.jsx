import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';


import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider>
    <App />
  </MantineProvider>
);
