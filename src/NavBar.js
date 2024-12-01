import React from "react";

function NavBar({ handleActionClick }) {
  const handleLoginClick = () => {
    handleActionClick();
  };
  const handleSignupClick = () => {
    //handleActionClick();
  };
  return (
    <div className="actionButtons">
          <h1>Welcome to Book Collection</h1>
          <div>
              <button onClick={handleLoginClick}>Login</button>
              <button onClick={handleSignupClick}>Sign up</button>
          </div>
      </div>

  );
}

export default NavBar;
