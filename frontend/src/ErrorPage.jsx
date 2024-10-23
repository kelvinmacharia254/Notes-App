import { useRouteError } from "react-router-dom"
import classes from "./styles/ErrorPage.module.css"
export default function ErrorPage() {
    const error = useRouteError() // provides the error thrown when a user navigates to non-existent routes

    console.log(error)

    return (
        <div className={classes['error-page']}>
            <h1>Oops!</h1>
            <p>
                <i>{error.status} {error.statusText || error.message}</i>
            </p>
        </div>
    )
}