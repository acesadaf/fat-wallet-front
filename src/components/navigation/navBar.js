import React from "react";
import Logo from "../Image/Wallet.png";

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
          <li class="nav-item active">
            <a class="nav-link" href="#">
              History <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Link
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link disabled" href="#">
              Disabled
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default navBar;
