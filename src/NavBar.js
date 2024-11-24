import React from "react";

function NavBar({ handleLoginClick }) {
  const handleClick = () => {
    handleLoginClick();
  };
  return (
    <div className="actionButtons">
          <h1>Welcome to Book Collection</h1>
          <div>
              <button onClick={handleClick}>Login</button>
              <button>Sign up</button>
          </div>
      </div>

  );
}

export default NavBar;
