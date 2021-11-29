import React from "react";
import './AddTodo.css';


function AddTodo() {
    const [item, setData] = React.useState(null);
    const [create, setDate] = React.useState(null);
    const [complete, setComplete] = React.useState(null);    
    
    const handleNameChange = (event) => {
        setData(event.target.value);        
    }    
    
    const handleCompleteChange = (event) => {        
        setComplete(event.target.value);
    } 

    const handleSubmit = () => {        
        let endPoint = '/api/add_todo'
        let data = {'name': item, 'start': create, 'finish': complete}
        fetch(endPoint, {method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},body: JSON.stringify(data)}).then((res) => res.json())
            .then((data) => setData(data));                      
    }    
    
    return (
        <div className="text-center">                                            
            <div className="row m-0">
                <div className="col-2">           
                    <a href="/" className="btn bg-black text-light m-1">Back</a>
                </div>
                <h1 className="col-8">Add Todo</h1>
                <div className="col-2"></div>
            </div>                     
            <form className="w-50 mx-auto form-add-todo" onSubmit={handleSubmit}>     
                <input className="col-12 m-1" type="text" name={item} onChange={handleNameChange} placeholder="Item Name" required/>
                <input className="col-12 m-1" type="text" name={complete} onChange={handleCompleteChange} placeholder="Date to complete" required/>  
                <input className="w-50 btn bg-dark text-light mt-2" type="submit" value="Submit" />                
            </form>                      
        </div>
    );
}

export default AddTodo;