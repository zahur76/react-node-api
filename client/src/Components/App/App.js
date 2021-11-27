import React from "react";
import './App.css';
import ApiRequests from "../ApiRequests/ApiRequest";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import AddTodo from "../AddTodo/AddTodo";

class App extends React.Component {  
  render(){
    return (
      <BrowserRouter>
        <Routes className="App">          
          <Route path="/" element={<ApiRequests />} />
          <Route path="/add_todo" element={<AddTodo />} />                                         
        </Routes> 
      </BrowserRouter>      
           
    );
  }  
}

export default App;
