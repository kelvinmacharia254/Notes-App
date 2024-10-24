import React from "react";
import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";

import Root from "./pages/Root.jsx";
import Home, {loader as notesLoader, action as notesAddAction } from "./pages/Home.jsx";
import Login,{action as loginAction} from "./pages/Login.jsx";
import Register,{action as registerUserAction} from "./pages/Register.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ErrorPage from "./ErrorPage.jsx";
import {noteDeleteAction} from "./actions/notesAction/DeleteNote.js";

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
                index: true,
                element: <ProtectedRoute><Home/></ProtectedRoute>,
                loader: notesLoader,
                action: notesAddAction,
            },
            {
                path:"/delete/:id",
                action: noteDeleteAction,
            },
            {
                path: "/register",
                element: <RegisterAndLogout/>,
                action: registerUserAction,
            },
            {
                path: "/login",
                element: <Login/>,
                action: loginAction,
            },
                {path: "/logout", element: <Logout/>},
            ]
      }
    ]);
  return (
    <RouterProvider router={router}/>
  )
}

export default App
