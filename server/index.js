// server/index.js

const express = require("express");

const sqlite3 = require('sqlite3');
// open up the SQLite database in './db.sqlite'
const db = new sqlite3.Database('./all_character.db', (err)=> {
  if(err){
    console.log(err)
  }else{
    console.log('connected')
  }
});

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  db.all("SELECT * FROM characters;", (error, rows) => { 
    if(error){            
        res.send(error)
        console.log(error)
        console.log('error error')
    }else{ 
        console.log(rows)
        res.send(JSON.stringify(rows));
    }              
  });  
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});