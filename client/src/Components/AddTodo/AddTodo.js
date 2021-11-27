import React from "react";
import './AddTodo.css';
import Header from '../Header/Header'

function AddTodo() {    
    return (
        <div className="text-center">
            <Header />     
            <h1>Add Todo</h1>
            <a href="/" className="btn bg-black text-light">Back</a>
        </div>
    );
}

export default AddTodo;