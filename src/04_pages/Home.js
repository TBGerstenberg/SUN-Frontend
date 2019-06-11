import React from "react";
import Link from "redux-first-router-link";

const Home = () => {
  return (
    <header className="App-header">
      <p> </p>
      <Link to="Login">Login</Link>
      <Link to="Profile">Profile</Link>
    </header>
  );
};

export default Home;
