import Form from "../components/Form"
export default function Login(){
    return (
        // This is a dynamic form that can be used to register a new user or login.
        <Form route="/auth/jwt/create" method="login"/>
    )
}