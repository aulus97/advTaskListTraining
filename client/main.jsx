import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TasksPage } from "/imports/ui/TasksPage";
import { Welcome } from "/imports/ui/Welcome";
import { SignUpForm } from "/imports/ui/SignUpForm";
import { Hello } from "/imports/ui/Hello";
import { Info } from "/imports/ui/editTask";
import { LoginForm } from "/imports/ui/LoginForm";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: 
    '/signUp',
    element: <SignUpForm />,
  },
  {
    path: 
    '/logIn',
    element: <LoginForm />,
  },
  {
    path: 
    '/tasks',
    element: <TasksPage />, // acts as a layout or wrapper
  },
  {  
    path: 
    '/hello',
    element: <Hello />,
  },
  {
    path: 
    '/editTask',
    element: <Info />,
  },
]);

ReactDOM.createRoot(document.getElementById("react-target")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
