import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "/imports/ui/App";
import { RouterProvider } from "react-router-dom";
//import "../imports/api/TasksMethods";

ReactDOM.createRoot(document.getElementById('react-target')).render(
  <React.StrictMode>
    <RouterProvider router={App()} />
  </React.StrictMode>
);