import React from "react";
import Logo from "../Image/Wallet.png";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle";

class navBar extends React.Component {
  constructor(props) {
    console.log("woot");
    super(props);
    this.state = {
      remove: !this.props.navState,
      propUpdateCount: 0,
    };
    this.propUpdateCount = 0;
    this.navItemActive = "nav-item active";
    this.navItemDisabled = "nav-item disabled";
    this.navLinkActive = "nav-link active";
    this.navLinkDisabled = "nav-link";
  }
  componentWillReceiveProps(props) {
    console.log("changed");
    console.log(props, this.props);

    if (this.props.navState != props.navState) {
      this.setState(
        {
          remove: !this.state.remove,
          propUpdateCount: 1,
        },
        () => console.log(this.state.remove)
      );
    }
    console.log(this.state.propUpdateCount);
  }

  prevent(event) {
    event.preventDefault();
  }
  allow() {
    return false;
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <img class="px-2" src={Logo} width="50" alt="cant find"></img>
          <Link
            id="Link"
            to={{
              pathname: "/home",
              state: { name: this.props.location.state.name },
            }}
            onClick={(event) => {
              this.state.remove === true ? this.prevent(event) : this.allow();
            }}
          >
            <a class="navbar-brand" href="#">
              Fat Wallet
            </a>
          </Link>
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
              <Link
                id="Link"
                to={{
                  pathname: "/home",
                  state: { name: this.props.location.state.name },
                }}
                onClick={(event) => {
                  this.state.remove === true
                    ? this.prevent(event)
                    : this.allow();
                }}
              >
                <li
                  class={
                    this.state.remove === false
                      ? this.navItemActive
                      : this.navItemDisabled
                  }
                >
                  <a
                    class={
                      this.state.remove === false
                        ? this.navLinkActive
                        : this.navLinkDisabled
                    }
                    href="#"
                  >
                    Home
                  </a>
                </li>
              </Link>
              <Link
                id="Link"
                to={{
                  pathname: "/expenses",
                  state: { name: this.props.location.state.name },
                }}
                onClick={(event) => {
                  this.state.remove === true
                    ? this.prevent(event)
                    : this.allow();
                }}
              >
                <li
                  class={
                    this.state.remove === false
                      ? this.navItemActive
                      : this.navItemDisabled
                  }
                >
                  <a
                    class={
                      this.state.remove === false
                        ? this.navLinkActive
                        : this.navLinkDisabled
                    }
                    href="#"
                  >
                    Expenses
                  </a>
                </li>
              </Link>
              <Link
                id="Link"
                to={{
                  pathname: "/",
                  state: { signedOut: true },
                }}
                onClick={(event) => {
                  this.state.remove === true
                    ? this.prevent(event)
                    : this.allow();
                }}
              >
                <li
                  class={
                    this.state.remove === false
                      ? this.navItemActive
                      : this.navItemDisabled
                  }
                >
                  <a
                    class={
                      this.state.remove === false
                        ? this.navLinkActive
                        : this.navLinkDisabled
                    }
                    href="#"
                  >
                    Sign Out
                  </a>
                </li>
              </Link>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default navBar;
