import React from "react";
import './App.css';
import Header from '../Header/Header'
import ApiRequests from "../ApiRequests/ApiRequest";

function App() {
  return (
    <div className="App">
      <Header />
      <ApiRequests />    
    </div>
  );
}

export default App;
