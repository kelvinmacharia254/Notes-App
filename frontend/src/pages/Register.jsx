import UserForm from "../components/UserForm.jsx"
import api from "../api.js";
import {redirect, useActionData} from "react-router-dom";

export async function action({request}) {
    try {
        // Send a POST request to the server with login credentials (username, password)
        console.log("registering in...");
        const formData = await request.formData();
        const email = formData.get("email");
        const username = formData.get("username");
        const password = formData.get("password");
        console.log(email, username, password)

        const res = await api.post("/auth/users/", { email,username, password });

        console.log("New user registered successfully");
        return redirect("/login")

    } catch (error) {
        console.error("Registration error:", error);

        // Prepare a meaningful error message
        let errorMessage = "Sign in failed. Please check the details you provided.";

        // Handle specific error codes if available
        if (error.response) {
            if (error.response.status === 401) {
                errorMessage = `${error.response.statusText}`;
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
export default function Register(){
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
            <UserForm route="/register" method="register"/>
        </>
    )
}