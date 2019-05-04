import React from "react";
import logo from "../../assets/logo.svg";
import Link from "redux-first-router-link";

const Home = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p> </p>
      <Link to="NotFound"> Link </Link>
    </header>
  );
};

export default Home;
