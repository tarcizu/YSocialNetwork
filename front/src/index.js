import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import PostPage from './pages/PostPage';


const router = createBrowserRouter([

  {
    path: "/",
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
  },
  {
    path: "/profile/:username",
    element: <ProfilePage />
  },
  {
    path: "/post/:username/:id",
    element: <PostPage />
  },
  {
    path: "/404",
    element: <ErrorPage />
  }



])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

reportWebVitals();
