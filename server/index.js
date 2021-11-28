// server/index.js
const express = require("express");
const path = require('path');
var bodyParser = require('body-parser')

// App initialisation
const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, './client/build')));

//environment variables
const dotenv = require('dotenv');
dotenv.config();

var jsonParser = bodyParser.json()

const PORT = process.env.PORT;
const DEVELOPMENT = process.env.DEVELOPMENT;

var pg = require('pg');
var client = new pg.Client(process.env.DB_URL);

app.get("/api", (req, res) => {  
  client.connect(function(err) {
    client.query("SELECT * FROM characters ORDER BY id ASC;", (error, rows) => { 
        if(error){            
            res.send(error) 
            console.log(error)                   
        }else{                        
            console.log(rows.rows)        
            res.send(JSON.stringify(rows.rows));            
        }              
      });       
  });    
})   
app.get('/api/delete/:id',function(req,res) {
  client.connect(function(err) {    
    client.query(`SELECT * FROM characters WHERE id=$1`,[req.params.id], (error)=>{            
        if(error){
            console.log(error)
            res.send(error)
        }else{                      
            client.query("DELETE FROM characters WHERE id=$1;",[req.params.id],(error)=>{                
                if(error){
                    console.log('error2')                    
                    res.send(error)
                }else{                    
                  client.query("SELECT * FROM characters ORDER BY id ASC;", (error, rows) => { 
                    if(error){
                        console.log('error3')            
                        res.send(error)                        
                    }else{                        
                        res.send(JSON.stringify(rows.rows));
                    }              
                  });
                }
            })  
        }
    })
  })              
})  
app.get("/api/update/:id/:status", (req, res) => {
  client.connect(function(err) {           
      client.query("UPDATE characters SET completed=$1 WHERE id=$2;", [req.params.status, req.params.id], (error)=>{
      if(error){
        console.log(error)
        res.send(error)
      }else{
        client.query("SELECT * FROM characters ORDER BY id ASC;", (error, rows) => { 
          if(error){
              console.log('error2')            
              res.send(error)                        
          }else{                        
              res.send(JSON.stringify(rows.rows));
          }              
        });
      }
    })
  })
});  
app.post('/api/add_todo', jsonParser, function(req,res) {
  client.connect(function(err) { 
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1; 
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();    
      newdate = day+ "/" + month + "/" + year;   
      client.query("INSERT INTO characters (name, date_created, date_completion) VALUES ($1, $2, $3);", [req.body.name, newdate, req.body.finish], (error)=>{
      if(error){
        console.log(console.log(error))
        res.send(error)
      }else{
        client.query("SELECT * FROM characters ORDER BY id ASC;", (error, rows) => { 
          if(error){            
              res.send(error)                        
          }else{                        
              res.send(JSON.stringify(rows));
          }              
        });
      }
    })
  })          
})
// }



// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});