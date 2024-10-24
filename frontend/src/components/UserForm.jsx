import {useState} from "react";
import {Form, useNavigation} from "react-router-dom";

import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator.jsx";

// The Form component is a reusable component that can be used to create forms for login, register, and other forms.
// The Form component takes two props: route and method.
// The route prop is the URL to which the form data will be sent, and the method prop is the HTTP method to be used to register or login.
export default function UserForm({method}){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const formMode = method === 'login'? "Login":"Register"

    const [isLoading, setIsLoading] = useState(false)

    function handleSubmit() {
        setIsLoading(true)
    }

    return (
        <Form className="form-container" method="post" onSubmit={handleSubmit}>
            <h1>{formMode}</h1>
            { formMode === "Register"? (<input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                name="email"
                required
            />): null}
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                name="username"
                required
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                name="password"
                required
            />
            {isLoading && <LoadingIndicator/>}
            <button className="form-button" type="submit">{formMode}</button>
        </Form>
    )
}