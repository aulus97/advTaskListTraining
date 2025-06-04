import React from "react";
import { TasksPage } from "./TasksPage";
import { Welcome } from "./Welcome";
import { SignInForm } from "./SignInForm";
//import {  BrowserRouter, Route, Routes/*,Outlet, Link*/ } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { Hello } from "./Hello";
import { Info } from "./Info";
import { LoginForm } from "./LoginForm";

export const App = () => {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Welcome />,
    },
    {
      path: '/signIn',
      element: <SignInForm />,
    },
    {
      path: '/logIn',
      element: <LoginForm />,
    },
    {
      path: '/tasks',
      element: <TasksPage />, // acts as a layout or wrapper
    },
    {  
      path: '/hello',
      element: <Hello />,
    },
    {
      path: '/info',
      element: <Info />,
    },
  ]);
  
  return (/*
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/tasks" element={<TasksPage />}>
          <Route index element={<Hello />} />
          <Route path="/info" element={<Info />} />
        </Route>
      </Routes>
    </BrowserRouter>
    */
    router
  );
};
