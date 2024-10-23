import React from "react";
import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";

import Root from "./pages/Root.jsx";
import Home, {loader as notesLoader, action as notesAddAction} from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Register from "./pages/Register.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ErrorPage from "./ErrorPage.jsx";

function Logout(){
    // logout by removing the access token from the local storage
    localStorage.removeItem("access");
    return <Navigate to="/login" />
}

function RegisterAndLogout(){
    // Remove the access token from the local storage before registering a new user
    localStorage.removeItem("access");
    return <Register />
}

function App() {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
          {
            path: "/",
            element: <ProtectedRoute><Home/></ProtectedRoute>,
            loader: notesLoader,
            action: notesAddAction,
          },
          {path: "/login", element: <Login/>},
          {path: "/logout", element: <Logout/>},
          {path: "/register", element: <RegisterAndLogout/>},
        ]
      }
    ]);
  return (
    <RouterProvider router={router}/>
  )
}

export default App
