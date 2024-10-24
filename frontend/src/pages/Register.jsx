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
        // Display the error to the user in case of failure
        console.error("Registration error:", error);
        alert("Failed to register new user");
        return error
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