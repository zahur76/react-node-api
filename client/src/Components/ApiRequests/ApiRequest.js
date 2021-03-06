import React from "react";
import './ApiRequests.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion'
import AddItem from "../AddItem/AddItem";

function ApiRequests() {
    const [data, setData] = React.useState(null);       

    React.useEffect(() => {fetch("/api").then((res) => res.json())
        .then((data) => setData(data));        
    }, []) 
    
    const DeleteItem=(event)=>{        
        console.log(event.target.value)
        let endPoint = `/api/delete/${event.target.value}`
        fetch(endPoint).then((res) => res.json())
            .then((data) => setData(data));                     
    }

    const UpdateStatus=(event)=>{        
        let endPoint;        
        if(event.target.id==='Pending'){            
            endPoint = `/api/update/${event.target.value}/Completed`
        }else{            
            endPoint = `/api/update/${event.target.value}/Pending`
        }        
        fetch(endPoint).then((res) => res.json())
            .then((data) => setData(data));                     
    }
    
    const renderLogin = () => {
        if(localStorage.getItem("login")==='true'){            
            return  <AddItem />
                    
        }else{
            return <div></div>
        }   
    }    
    const listItems = (data || []).map((element) =>
        <div  key={element.id} className="text-center">
            <Accordion className="w-75 mx-auto mb-2" defaultActiveKey="1">
                <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <Col xs={12}>
                                <div className="text-dark h5">{element.id}.{element.name}</div>
                            </Col>                                                                                                                                
                        </Accordion.Header>
                    <Accordion.Body>
                        <Row className="text-center todo-list">
                            <Col xs={4}>Created</Col>
                            <Col xs={4}>Completion</Col>
                            <Col xs={4} md={2}>Status</Col>                            
                            <Col className="border-bottom border-dark mb-2" xs={12}></Col>
                            <Col xs={4}>{element.date_created}</Col>
                            <Col xs={4}>{element.date_completion}</Col>
                            <Col xs={4} md={2}>{element.completed}</Col>
                            <Col className="buttons mt-2" xs={12}>                                
                                <Button onClick={DeleteItem} value={element.id} className="m-1 bg-danger text-light text-right">Remove</Button>
                                <Button onClick={UpdateStatus} value={element.id} id={element.completed} className="m-1 bg-success text-light text-right">Update</Button>                                
                            </Col>                                                                                   
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>            
        </div>
    );    
    return (
        <div className="requests mt-2">
            {renderLogin()}
            {listItems}            
        </div>
    );
}

export default ApiRequests;