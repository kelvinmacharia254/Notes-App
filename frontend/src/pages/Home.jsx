import { Form, useLoaderData } from "react-router-dom";
import api from "../api.js";
import Note from "../components/Note.jsx";
import "../styles/Home.css";

// Loader function to fetch notes
export async function loader() {
    try {
        console.log("Loading notes...");
        const response = await api.get("/api/notes/");
        return response.data;  // This will work as expected if the response is ok.
    } catch (error) {
        console.error("Failed to load notes:", error);
        throw new Error("Failed to load notes.");
    }
}

// Action function to handle note creation
export async function action({ request }) {
    console.log("Processing action for creating a note...");

    try {
        const formData = await request.formData();
        const title = formData.get("title");
        const content = formData.get("content");

        const response = await api.post("/api/notes/", { title, content });

        // Check for the successful response status
        if (response.status !== 201) {
            throw new Error("Failed to create note.");
        }

        // Log the success response for debugging
        console.log("Note created successfully:", response.data);

        return response.data; // Return the created note data
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error creating note:", error);

        // Optionally rethrow the error or return a specific message
        throw new Error("Failed to create note due to an error.");
    }
}


export default function Home() {
    const notes = useLoaderData(); // Data is automatically passed by the loader

    return (
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} key={note.id} /> //
                ))}
            </div>
            <h2>Create a Note</h2>
            <Form method="post">
                <label htmlFor="title">Title:</label>
                <br />
                <input type="text" id="title" name="title" required />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea id="content" name="content" required></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </Form>
        </div>
    );
}
