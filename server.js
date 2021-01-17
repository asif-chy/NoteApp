const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const _ = require('lodash');
const PORT = process.env.PORT || 9000;

mongoose.connect("mongodb+srv://Asiful_01:Mongo1234@cluster0.9hlzt.mongodb.net/noteDB?retryWrites=true&w=majority", {useNewUrlParser: true});

const app = express();

app.set('view engine');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());

const noteSchema = {
  id: String,
  title: String,
  content: String,
}

const Note = mongoose.model("Note",noteSchema);

// app.get('/api/greeting', (req, res) => {
//   const name = req.query.name || 'World';
//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
// });


app.post("/save",function(request,response){
  console.log("Save Data");
  console.log(request.body.note);
  var res = {};
  const noteId = request.body.note.id;
  const title = request.body.note.noteTitle;
  const content = request.body.note.noteContent;

  console.log(noteId,title,content);

  const newNote = new Note({
    id:noteId,
    title: title,
    content: content
  })

  newNote.save(function(err, result){
  if(err) {
    res = { error: true, message: "Error adding data" };
  } else {
    res = { error: false, message: "Data added", id: result._id };
  }
  console.log(res);
  response.json(res);
});
  //response.redirect("http://localhost:3000/");

});

app.delete("/delete",function(request,response){
  console.log("Delete Item");
  console.log(request.body.note);

  const id = request.body.note.id;
  console.log(id);


  Note.findByIdAndRemove({_id:id},function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Delete Successful");
    }
  })
});




//
// app.post("/delete",function(request,response){
//   const id = request.body.deleteItem;
//   const hiddenTitle = request.body.hiddenValue;
//   if(hiddenTitle === "Today"){
//     Item.findByIdAndRemove({_id:id},function(err){
//       if(err){
//         console.log(err);
//       }else{
//         console.log("Delete Successful");
//         response.redirect("/");
//       }
//     })
//   }else{
//     List.findOneAndUpdate({name:hiddenTitle},{$pull: {items:{_id:id}}},function(err){
//       if(!err){
//         console.log("Delete Successful")
//         response.redirect("/"+hiddenTitle);
//       }
//     })
//   }
// })

app.get('/', function(req, res) {
  res.json('you did it');
});

app.listen(PORT,function(){
  console.log("Server listening to port 9000");
})
