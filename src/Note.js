import React from "react";

const Note = (props) => {
  const updateTitle = (e) => {
    const editMeID = props.note.id;
    const updatedValue = e.target.value;
    props.onType(editMeID, "title", updatedValue);
  };
  const updateDescription = (e) => {
    const editMeID = props.note.id;
    const updatedValue = e.target.value;
    props.onType(editMeID, "description", updatedValue);
  };
  const deleteNoteFunction = (e) => {
    e.preventDefault();
    const deleteID = props.note.id;
    props.deleteNote(deleteID);
  };
  return (
    <li className="note">
      <input
        type="text"
        placeholder="Title"
        className="note__title"
        value={props.note.title}
        onChange={updateTitle}
      />
      <textarea
        placeholder="Description..."
        className="note__description"
        value={props.note.description}
        onChange={updateDescription}
      />
      <span className="note__delete" onClick={deleteNoteFunction}>
        X
      </span>
    </li>
  );
};

export default Note;
