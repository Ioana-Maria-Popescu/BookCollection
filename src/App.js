import React, { useState } from "react";
import './App.css';
import NavBar from "./NavBar";
import LoginForm from "./LoginForm";

const App = () =>
{
  const [data, setData] = useState([]);
  const [name, setName] = useState("");


  const [isShowLogin, setIsShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  const handleActionClick = () => {
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
        setUser(result.user);
        setIsShowLogin(false);
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
      <div className="App">
        <NavBar handleActionClick={handleActionClick} user={user} />
        {isShowLogin && <LoginForm handleLogin={handleLogin} />}
        {user && <div>Welcome, { user.name || user.username }!</div>}
      </div>
      
  );
};


export default App;
