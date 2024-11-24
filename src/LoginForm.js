import React, { useState } from "react";

/*function handleSubmit(event) {
    event.preventDefault();
      return (
        <Link className="link" to={'/App'}></Link>
      );
  }
      */

const LoginForm = ({ isShowLogin, handleLogin  }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin({ username, password });
      };

  return (
    <div className={`${isShowLogin ? "active" : ""} show`}>
      <div className="login-form">
        <div className="form-box solid">
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <br></br>
            <input
              type="text"
              name="username"
              className="login-box"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <br></br>
            <label>Password</label>
            <br></br>
            <input
              type="password"
              name="password"
              className="login-box"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br></br>
            <input type="submit" value="LOGIN" className="login-btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
