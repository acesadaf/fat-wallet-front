import React from "react";
import Logo from "../Image/Wallet.png";
import { Link } from "react-router-dom";

const navBar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light">
      <img class="px-2" src={Logo} width="50" alt="cant find"></img>

      <a class="navbar-brand" href="#">
        Fat Wallet
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <Link to="/home">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home
              </a>
            </li>
          </Link>
          <Link to="/expenses">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Expenses
              </a>
            </li>
          </Link>
          <Link to="/">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Sign Out
              </a>
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default navBar;
