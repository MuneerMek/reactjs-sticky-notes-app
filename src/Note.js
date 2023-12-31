import React from "react";

const Note = (props) => (
  <li className="note">
    <input type="text" placeholder={props.note.title} className="note__title" />
    <textarea
      placeholder={props.note.description}
      className="note__description"
    />
    <span className="note__delete">X</span>
  </li>
);

export default Note;
