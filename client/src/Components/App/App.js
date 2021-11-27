import React from "react";
import './App.css';
import Header from '../Header/Header'
import ApiRequests from "../ApiRequests/ApiRequest";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {fetch("/api").then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <Header />
      <ApiRequests />    
    </div>
  );
}

export default App;
