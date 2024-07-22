import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';
import SignUpPage from './pages/SignUpPage';


const router = createBrowserRouter([

  {
    path: "/",
    // element: <MainPage />,
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },

  {
    path: "/home",
    element: <MainPage />,

  },
  {
    path: "/login",
    element: <LoginPage />

  },
  {
    path: "/signup",
    element: <SignUpPage />
  }



])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
