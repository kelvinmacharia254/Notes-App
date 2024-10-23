import Form from "../components/Form"
export default function Register(){
    return (
        // This is a dynamic form that can be used to register a new user or login.
        <Form route="/auth/users" method="register"/>
    )
}