import { React, useState } from "react";
import './Header.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Header() {
    const [show, setShow] = useState(false);
    const [login, setLogin] = useState('Login')  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogin = () => {
        const endPoint = "/api/login"
        fetch(endPoint).then((res) => res.json())
            .then((data) => console.log(data)); 
    }
    
    
    return (
        <div className="header text-center">
            <Row>
                <Col xs={9}><h1>Node-React-Todo</h1></Col>                
                <Col xs={3} className="my-auto" >
                    <div className="btn text-light" onClick={handleShow}>
                        {login}
                    </div>
                </Col>
            </Row>  
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Login details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="w-50 mx-auto form-add-todo" onClick={handleLogin}>     
                    <input className="col-12 m-1" type="text" placeholder="username" required/>
                    <input className="col-12 m-1" type="password" placeholder="password" required/>  
                    <input className="w-50 btn bg-dark text-light mt-2" type="submit" value="Submit" />                
                </form>  
                </Modal.Body>                
            </Modal>
        </div>
    );
}
export default Header;