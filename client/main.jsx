import React from "react";
import ReactDOM from "react-dom/client";//truly need it???
//import { createRoot } from "react-dom/client";
import { Meteor } from "meteor/meteor";
import { App } from "/imports/ui/App";
import { Info } from "/imports/ui/Info";
import { Hello } from "/imports/ui/Hello";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../imports/api/TasksMethods";

//Meteor.startup(() => {
  /*
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Hello />} />
        <Route path="/info" element={<Info />} />
      </Route>
    )
  );
    
  */
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />, // acts as a layout or wrapper
      children: [
        {
          index: true,
          path: '/hello',
          element: <Hello />,
        },
        {
          path: '/info',
          element: <Info />,
        },
      ],
    },
  ]);
  
//});

ReactDOM.createRoot(document.getElementById('react-target')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);