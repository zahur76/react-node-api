import React from "react";
import './ApiRequests.css';

function ApiRequests() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {fetch("/api").then((res) => res.json())
        .then((data) => setData(data.message));
    }, [])
    return (
        <div className="requests">        
            <h1>{data}</h1>
        </div>
    );
}

export default ApiRequests;