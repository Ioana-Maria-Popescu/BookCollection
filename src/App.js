import React, { useState } from "react";
import './App.css';

const App = () =>
{
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  const fetchData = async () =>
  {
    const response = await fetch("http://localhost:5000/data");
    const result = await response.json();
    setData(result);
  };

  const addData = async () =>
  {
    await fetch("http://localhost:5000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    setName("");
    fetchData();
  };

  return (
    /*<div style={{ padding: "20px" }}>
      <h1>MariaDB + Sequelize Example</h1>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addData}>Add</button>
      <button onClick={fetchData}>Refresh</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>*/


      <div className="actionButtons">
          <h1>Welcome to Book Collection</h1>
          <div>
              <button>Login</button>
              <button>Sign up</button>
          </div>
      </div>
      
  );
};

export default App;
