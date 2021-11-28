// server/index.js
const express = require("express");
const path = require('path');
var bodyParser = require('body-parser')

//environment variables
const dotenv = require('dotenv');
dotenv.config();
var jsonParser = bodyParser.json()

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

const sqlite3 = require('sqlite3');
// open up the SQLite database in './db.sqlite'
const db = new sqlite3.Database('./all_character.db', (err)=> {
  if(err){
    console.log(err)
  }else{
    console.log('connected')
  }
});

const PORT = process.env.PORT;

const app = express();

app.get("/api", (req, res) => {
  db.all("SELECT * FROM characters;", (error, rows) => { 
    if(error){            
        res.send(error)        
    }else{        
        res.send(JSON.stringify(rows));
    }              
  });  
});

app.get('/api/delete/:id',function(req,res) {    
    db.get("SELECT * FROM characters WHERE id=($charId);", {
        $charId: req.params.id
    }, (error)=>{            
        if(error){
            res.send(error)
        }else{                      
            db.run("DELETE FROM characters WHERE id=($charId);", {
                $charId: req.params.id
            }, (error)=>{                
                if(error){
                    console.log('shabana')
                    res.send(error)
                }else{                    
                  db.all("SELECT * FROM characters;", (error, rows) => { 
                    if(error){            
                        res.send(error)                        
                    }else{                        
                        res.send(JSON.stringify(rows));
                    }              
                  });
                }
            })  
        }
    })
           
})

app.get("/api/update/:id/:status", (req, res) => {          
    db.run("UPDATE characters SET completed=$completed WHERE id=$charId;", {     
      $charId: req.params.id,
      $completed: req.params.status    
  }, (error)=>{
    if(error){
      res.send(error)
    }else{
      db.all("SELECT * FROM characters;", (error, rows) => { 
        if(error){            
            res.send(error)                        
        }else{                        
            res.send(JSON.stringify(rows));
        }              
      });
    }
  })  
});

app.post('/api/add_todo', jsonParser, function(req,res) {      
    db.run("INSERT INTO characters (name, date_created, date_completion) VALUES ($name, $created, $completed);", {
      $name: req.body.name,
      $created: req.body.start,
      $completed: req.body.finish     
  }, (error)=>{
    if(error){
      console.log(console.log(error))
      res.send(error)
    }else{
      db.all("SELECT * FROM characters;", (error, rows) => { 
        if(error){            
            res.send(error)                        
        }else{                        
            res.send(JSON.stringify(rows));
        }              
      });
    }
  })          
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});