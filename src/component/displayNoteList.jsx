import React from 'react';
import axios from 'axios';

function DisplayNoteList(props) {

  function handleSubmit(event){
   event.preventDefault();

   console.log(props.id)
   props.delete(props.id)
   const note = props.item;

    axios.delete('http://localhost:9000/delete', { data: {note}}).then(res => {});
 }

  return (

  <div class="noteList">
  <form onSubmit = {handleSubmit}>
    <h1 className="noteListTitle">{props.item.noteTitle}</h1>
    <button className="noteListButton" type="submit">Delete</button>
  </form>
  </div>)
}

// onClick = {() => {props.delete(props.id)}}

export default DisplayNoteList;
