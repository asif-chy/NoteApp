import React from 'react';
import CreateNote from './createNote';
import DisplayNoteList from './displayNoteList';
import SearchNote from './searchNote';

function App() {

  const [noteList, setNoteList] = React.useState([]);

  function updateNoteList(note){
    //console.log(note);
    setNoteList(previousValue =>{
      return[...previousValue, note];
    })

    //event.preventDefault();
  }

  function deleteItem(id){
    setNoteList(prevValue => {
    return prevValue.filter((note)=>{
    return note.id !== id;
  });
});
}

  return ( <container class="container">
      <div class="flex-left">
      <SearchNote/>
      {noteList.map((note,index) =>
      (<DisplayNoteList key = {note.id}
          id={note.id}
          item={note}
          delete = {deleteItem}/>))}
      </div>
      <div class="flex-right">
      <CreateNote onAdd = {updateNoteList} />
      </div>
      </container>)
}

export default App;
