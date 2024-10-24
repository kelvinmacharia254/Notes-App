import UserForm from "../components/UserForm.jsx"

import api from "../api.js";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants.js";
import {redirect, useActionData} from "react-router-dom";

export async function action({request}) {
    try {
        // Send a POST request to the server with login credentials (username, password)
        console.log("logging in...");
        const formData = await request.formData();
        const username = formData.get("username");
        const password = formData.get("password");
        console.log(username, password)

        const res = await api.post("/auth/jwt/create/", { username, password });

        // Store the access and refresh tokens in localStorage
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

        // Redirect to the home page after successful login
        console.log("logged in successfully");
        return redirect("/")
    } catch (error) {
        console.error("Login error:", error);

        // Prepare a meaningful error message
        let errorMessage = "Login failed. Please check your credentials and try again.";

        // Handle specific error codes if available
        if (error.response) {
            if (error.response.status === 401) {
                errorMessage = "Invalid username or password.";
            } else if (error.response.status === 404) {
                errorMessage = "The requested resource was not found.";
            } else {
                errorMessage = "An error occurred. Please try again.";
            }
        }

        // Return the error message for the component to display
        return { errors: { general: errorMessage } };
    }
}
export default function Login(){
    const actionData = useActionData()
    return (
        <>
            {actionData && actionData.errors && (
              <ul>
                {Object.values(actionData.errors).map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            )}
            {actionData && actionData.message && <p>{actionData.message}</p>}
            <UserForm method="login"/>
        </>
    )
}