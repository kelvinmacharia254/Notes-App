import api from "../../api.js";
import {redirect} from "react-router-dom";

export async function noteDeleteAction({params}) {
    try {
        const response = await api.delete(`/api/notes/${params.id}/`);
        if (response.status === 204) {
            return redirect("/"); // Redirect to the home page
        } else {
            throw new Error("Failed to delete note.");
        }
    } catch (error) {
        console.error("Failed to delete note:", error);
        throw new Error("Failed to delete note.");
    }
}