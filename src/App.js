import React, { useState } from "react";
import './App.css';
import NavBar from "./NavBar";
import LoginForm from "./LoginForm";

const App = () =>
{
  const [data, setData] = useState([]);
  const [name, setName] = useState("");


  const [isShowLogin, setIsShowLogin] = useState(true);
  const [user, setUser] = useState(null);

  const handleLoginClick = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin);
  };

  const handleLogin = (credentials) => {
    loginUser(credentials);
  };

  const loginUser = async (credentials) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const result = await response.json();

      if (result.success) {
        setUser(result.user); // Assuming the API returns user data.
        setIsShowLogin(false);
        const n = credentials.username;
      } else {
        alert(result.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login!");
    }
  };

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
    </div>


      <div className="actionButtons">
          <h1>Welcome to Book Collection</h1>
          <div>
              <button onClick={loginUser}>Login</button>
              <button>Sign up</button>
          </div>
      </div>*/

      <div className="App">
        <NavBar handleLoginClick={handleLoginClick} user={user} />
        {isShowLogin && <LoginForm handleLogin={handleLogin} />}
        {user && <div>Welcome, {user.name || user.username}!</div>}
      </div>
      
  );
};


export default App;
