import React from "react";
import './ApiRequests.css';

function ApiRequests() {
    const [data, setData] = React.useState(null);    
    
    React.useEffect(() => {fetch("/api").then((res) => res.json())
        .then((data) => setData(data));
    }, []) 
    
    const listItems = (data || []).map((number) =>
        <div>
            <div>{number.id}</div>
            <div>{number.name}</div>
        </div>
    );
    
    return (
        <div className="requests">        
            {listItems}
        </div>
    );
}

export default ApiRequests;