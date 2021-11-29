import { React, useState, useEffect } from "react";
import './Header.css';
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Header() {
    const [show, setShow] = useState(false);
    const [login, setLogin] = useState(null);    
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [formUsername, setFormUsername] = useState(null)
    const [formPassword, setFormpassword] = useState(null)    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const handleLogin = (event) =>{      
        if({formUsername}.formUsername==={username}.username){
            fetch('/api/login/login').then((res) => res.json())
            .then((data) => setLogin(data[0].login));
        }else{
            console.log('nopee')
        }                           
    };
    
    const handleLogout = (event) =>{        
        fetch('/api/login/logout').then((res) => res.json())
        .then((data) => setLogin(data[0].login));                                   
    };
    
    
    useEffect(() => {fetch("/api/login").then((res) => res.json())
        .then((data) => [setUsername(data[0].username), setPassword(data[0].password), setLogin(data[0].login)]);        
    }, [])

    console.log({login})
    const renderLogin = () => {
        if({login}.login==='login'){
            return  <Col xs={3} className="my-auto" >
                        <div className="btn text-light" onClick={handleShow}>
                            {login}                                              
                        </div>
                    </Col>
        }else{
            return <Col xs={3} className="my-auto" >
                        <div className="btn text-light" onClick={handleLogout}>
                            {login}                                              
                        </div>
                    </Col>
            }
    }

    const handleFormUsername = (event) => {
        setFormUsername(event.target.value);        
    }

    const handleFormPassword = (event) => {
        setFormpassword(event.target.value);        
    }     
    
    return (
        <div className="header text-center">
            <Row>
                <Col xs={9}><h1>Node-React-Todo</h1></Col>                               
                {renderLogin()}
            </Row>  
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Login details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="w-50 mx-auto form-add-todo" onSubmit={handleLogin}>     
                        <input className="col-12 m-1" type="text" name={formUsername} onChange={handleFormUsername} placeholder="username" required/>
                        <input className="col-12 m-1" type="password" name={formPassword} onChange={handleFormPassword} placeholder="password" required/>  
                        <input className="w-50 btn bg-dark text-light mt-2" type="submit" value="Submit" />                
                    </form>                      
                </Modal.Body>                
            </Modal>
        </div>
    );
}
export default Header;