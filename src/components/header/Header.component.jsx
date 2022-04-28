import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/book.png";
import "./Header.style.scss";

const Header = () => {
  return (
    <div className="header">
      <Link className="header__brand" to="/">
        <img className="header__logo" src={logo} alt="book" />
        <h1 className="header__title">DLI Library</h1>
      </Link>
    </div>
  );
};

export default Header;
