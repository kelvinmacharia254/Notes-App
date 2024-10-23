import React from "react";
import "../styles/Note.css"
import {Form} from "react-router-dom";

export default function Note({ note }) { //
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-UK")

    return (
        <div className="note-container">
            <p className="note-title">{note.title}</p>
            <p className="note-content">{note.content}</p>
            <p className="note-date">{formattedDate}</p>
            <Form method="post" action={`/delete/${note.id}`}>
                <button className="delete-button">Delete</button>
            </Form>
        </div>
    );
}
