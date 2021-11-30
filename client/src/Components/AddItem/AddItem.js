import { React, useState, useEffect } from "react";
import Col from 'react-bootstrap/Col'
import './AddItem.css';


function AddItem() {    
    
    return (               
        <div className="text-center">
            <Col xs={12} className="my-auto">
                <a href="/add_todo" className="add-todo links btn w-75 text-dark my-auto mt-2 mb-2">add item</a>
            </Col>                     
        </div>
    );
}

export default AddItem;