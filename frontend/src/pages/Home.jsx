import { useState, useEffect } from "react"
import api from '../api'
import Note from '../components/Note'
import "../styles/Home.css"
import Profile from '../components/Profile'
import { toast } from 'react-toastify';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, [])

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data); console.log(data);
      })
      .catch((err) => toast.error(err.message));
  }

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) toast.success("Note deleted!");
        else toast.error("Failed to delete note.");
        getNotes();
      })
      .catch((error) => toast.error(error.message));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) toast.success("Note created!");
        else toast.error("Failed to make note.");
        getNotes();
      })
      .catch((err) => toast.error(err.message));
  };


  return (
    <div>
      <Profile />
      <br /><br /><br /><br />
      <br /><br /><br /><br />
      <br /><br /><br /><br />
      <div>
        <h2>Notes</h2>
        {notes.map((note) => <Note note={note} onDelete={deleteNote} key={note.id}/>)}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input type="text" name="title" id="title" required onChange={(e)=> setTitle(e.target.value)} value={title}/>
        
        <label htmlFor="content">Content:</label>
        <br />
        <textarea name="content" id="content" required onChange={(e)=> setContent(e.target.value)} value={content}/>

        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  )
}

export default Home