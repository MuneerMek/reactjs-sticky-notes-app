import React, { Component } from "react";
import Header from "./Header";
import NotesList from "./NotesList";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true,
      },
    ],
    searchText: "",
  };

  componentDidMount() {
    const stringifiedNotes = localStorage.getItem("savedNotes");
    if (stringifiedNotes) {
      const savedNotes = JSON.parse(stringifiedNotes);
      const showAllNotes = savedNotes.map((note) => {
        note.doesMatchSearch = true;
        return note;
      });
      this.setState({ notes: showAllNotes });
    }
  }
  componentDidUpdate() {
    const stringifiedNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", stringifiedNotes);
  }

  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true,
    };
    this.setState({ notes: [newNote, ...this.state.notes] });
  };

  onSearch = (search) => {
    const searchQuery = search.toLowerCase();
    const filteredNotes = this.state.notes.map((note) => {
      if (!searchQuery) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const noteTitle = note.title.toLowerCase();
        const noteDescription = note.description.toLowerCase();
        const titleMatch = noteTitle.includes(searchQuery);
        const descMatch = noteDescription.includes(searchQuery);
        const matchStatus = titleMatch || descMatch;
        note.doesMatchSearch = matchStatus;
        return note;
      }
    });
    this.setState({ notes: filteredNotes, searchText: searchQuery });
  };

  onType = (editMeID, updatedKey, updatedValue) => {
    // editMeId == id of the note that is edited
    // updatedKey == title or description field
    // updatedValue == value of title or description
    // via change event interrogation
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editMeID) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    this.setState({ notes: updatedNotes });
  };

  deleteNote = (deleteID) => {
    const updatedNotes = this.state.notes.filter(
      (note) => note.id !== deleteID
    );
    this.setState({ notes: updatedNotes });
  };

  render() {
    return (
      <div>
        <Header
          searchText={this.state.searchText}
          onSearch={this.onSearch}
          addNote={this.addNote}
        />
        <NotesList
          deleteNote={this.deleteNote}
          onType={this.onType}
          notes={this.state.notes}
        />
      </div>
    );
  }
}

export default App;
