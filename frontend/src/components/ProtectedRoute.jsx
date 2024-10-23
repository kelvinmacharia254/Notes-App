import {Navigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../api";
import {REFRESH_TOKEN, ACCESS_TOKEN} from "../constants.js";
import {useState, useEffect} from "react";

// This component is a wrapper for any other route which required authenticated user.
// It checks if the user is authorized to access the route by checking the access token in the local storage.
// If the access token is not present or expired, it tries to refresh the token using the refresh token.
// If the refresh token is also expired, it redirects the user to the login page.
export default function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    // check if user is authorized when the component is mounted
    useEffect(() => {
        auth().catch(()=> setIsAuthorized(false));
    },[]);

    // refresh access token automaitcally
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try{
            const res = await api.post("/auth/jwt/refresh/", {refresh: refreshToken});
            if(res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            }else{
                setIsAuthorized(false);
            }
        }catch(error){
            console.log(error)
            setIsAuthorized(false);
        }
    }

    // check if access token should be refreshed
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        // if token is not present, user is not authorized
        if(!token) {
            setIsAuthorized(false);
            return;
        }
        // decode the token to get the expiration date
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp; // expiration time in seconds
        const now = Date.now() / 1000; // current time in seconds
        if(tokenExpiration < now) {
            // if token is expired, try to refresh it
            await refreshToken();
        }else{
            // if token is not expired, user is authorized
            setIsAuthorized(true);
        }
    }

    // when isAuthorized is null, we are still checking if the user is authorized
    if(isAuthorized === null) {
        return <div>Loading...</div>
    }

    // if isAuthorized is false, redirect to login page otherwise render the children route
    return isAuthorized ? children : <Navigate to="/login" />
}