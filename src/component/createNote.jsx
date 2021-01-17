import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateNote(props) {

  const [note, setNote] = React.useState({
    id:"",
    noteTitle: "",
    noteContent:""
  });

  useEffect(()=>{
    console.log(note);

    if(note.id){
      props.onAdd(note);

      setNote(previousValue =>{
        return{
          ...previousValue,
          id:"",
        };
      })
    }

  })

  function addNote(event){
    const{name,value} = event.target;

    setNote(previousValue =>{
      return{
        ...previousValue,
        [name]:value,
      };
    })
  }

   async function handleSubmit(event){
    event.preventDefault();
    const res = await axios.post('http://localhost:9000/save', {note});

    console.log(res);
    console.log(res.data.id);

    const itemId = res.data.id;

    await setNote(previousValue =>{
      return{
        ...previousValue,
        id:itemId,
      };
    })

    //console.log(note);
    // props.onAdd(event,note);
  }

  return (
    <form name="id" onSubmit={handleSubmit}>
      <input onChange={addNote} className="newNote" type="text" name="noteTitle" placeholder="Title"></input>
      <div className="newNoteButtons">
        <button type="submit">Save</button>
        <button type="button" name="button">Clear</button>
      </div>
      <textarea onChange={addNote} name="noteContent" rows="16" cols="78"></textarea>
    </form>)
}

export default CreateNote;
