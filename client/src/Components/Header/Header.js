import { React, useState, useEffect } from "react";
import { Navigate } from "react-router";
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

    console.log(localStorage.getItem("login"))
    const handleLogin = () =>{              
        if({formUsername}.formUsername==={username}.username && {formPassword}.formPassword==={password}.password){
            localStorage.setItem("login", "true")
            setLogin('logout')
        }else{
            console.log('nopee')
        }                           
    };   

    const handleLogout = () =>{        
        localStorage.setItem("login", "false")
        setLogin('login')
        window.location.reload(false);                                                         
    };
    
    
    useEffect(() => {fetch("/api/login").then((res) => res.json())
        .then((data) => [setUsername(data[0].username), setPassword(data[0].password)]);        
    }, [])    

    const handleFormUsername = (event) => {
        setFormUsername(event.target.value);        
    }

    const handleFormPassword = (event) => {
        setFormpassword(event.target.value);        
    }
    
    const renderLogin = () => {
        if(localStorage.getItem("login")==='true'){
            return  <div>
                        <Row className="header m-0">
                            <Col xs={0} md={2} className="logo h1 my-auto"></Col>
                            <Col xs={9} md={8} className="logo h1 my-auto">Node-React-Todo</Col>
                            <Col xs={3} md={2} className="links btn text-light my-auto" onClick={handleLogout}>logout</Col>
                        </Row>                        
                    </div> 
                    
        }else{
            return <Row className="header m-0">
                        <Col xs={0} md={2} className="logo h1 my-auto"></Col>
                        <Col xs={9} md={8} className="logo h1 my-auto">Node-React-Todo</Col>
                        <Col xs={3} md={2} className="links btn text-light my-auto" onClick={handleShow}>login</Col>               
                    </Row>
        }   
    }
    
    return (
        <div className="text-center">                        
            {renderLogin()}             
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