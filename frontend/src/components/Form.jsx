import {useState} from "react";
import api from "../api";
import {useNavigate} from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN} from "../constants.js";

import "../styles/Form.css";

// The Form component is a reusable component that can be used to create forms for login, register, and other forms.
// The Form component takes two props: route and method.
// The route prop is the URL to which the form data will be sent, and the method prop is the HTTP method to be used to register or login.
export default function Form({route, method}){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const formMode = method === 'login'? "Login":"Register"

    // The handleSubmit function is called when the form is submitted.
    const handleSubmit = async (e) => {
        console.log("called handleSubmit function ... ")
        // Prevent the default form submission behavior
        setLoading(true)
        e.preventDefault()

        try{
            // Send a POST request to the server with context data which is either registration ot login data

            if(method === "login"){
                // if method is login, login the user and redirect to the home page
                console.log("login in ... ")
                const res = await api.post(route, {username, password})
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.access)
                navigate("/")
                console.log("logged in ")
            }else{
                // if method is register, create new user and redirect to login page
                console.log("registering ... ")
                await api.post(route, {username, password, email})
                console.log("new user added ... ")
                navigate("/login")
            }

        }catch(error) {
            alert(error)
        }finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{formMode}</h1>
            { formMode === "Register"? (<input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />): null}
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
            />
            <button className="form-button" type="submit">{formMode}</button>
        </form>
    )
}