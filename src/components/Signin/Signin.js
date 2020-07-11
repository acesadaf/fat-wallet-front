import React, { Component } from "react";
import "./Signin.css";
import Logo from "../Image/Wallet.png";
import { Redirect, Link } from "react-router-dom";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      cpassword: "",
      loginOrRegister: true,
      displayText: "",
      redirect: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.conditionalCSS = this.conditionalCSS.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  conditionalCSS() {
    var index = 0;
    Object.keys(this.state).map((i) => {
      if (index <= 6) {
        if (this.state[i] === "") {
          document.getElementById(i).style.color = "red";
        }
      }
      index = index + 1;
    });

    // }
  }

  handleLogin(event) {
    console.log(this.state.userName);
    // fetch('http://friendly-eds-52406.herokuapp.com/sign_in',{
    fetch("http://127.0.0.1:8000/sign_in", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: this.state.userName,
        password: this.state.password,
      }),
    })
      .then((response) => response.text())
      .then((responseText) => {
        console.log(responseText);
        if (responseText === "Signed in!") {
          localStorage.setItem("fatWalletUser", this.state.userName);
          this.setState({ redirect: "/home" });
        } else {
          this.setState({ displayText: responseText });
        }
      });
  }

  handleRegister(event) {
    console.log(this.state.userName);
    const p = this.state.password;
    const cp = this.state.cpassword;

    if (
      this.state.email === "" ||
      this.state.firstName === "" ||
      this.state.lastName === "" ||
      this.state.userName === "" ||
      this.state.password === "" ||
      this.state.cpassword === ""
    ) {
      this.setState({ displayText: "Empty Field" }, () => {
        this.conditionalCSS();
      });

      return;
    }

    if (p != cp) {
      this.setState({ displayText: "Passwords don't match. Sorry!" });
      document.getElementById("password").style.color = "red";
      document.getElementById("cpassword").style.color = "red";
      return;
    }

    if (!this.state.email.includes("@") | !this.state.email.includes(".com")) {
      this.setState({ displayText: "Invalid Email Address!" });
      document.getElementById("email").style.color = "red";
      return;
    }

    // fetch('http://friendly-eds-52406.herokuapp.com/add_user',{
    fetch("http://127.0.0.1:8000/add_user", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: this.state.userName,
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
      }),
    })
      .then((response) => response.text())
      .then((responseText) => {
        console.log(responseText);
        if (responseText === "Added") {
          console.log("here");
          this.setState({ redirect: "/home" });
        } else {
          this.setState({ displayText: responseText });
        }
      });
  }

  // const { firstName, lastName, userName, password, cpassword } = this.state;
  // alert(lastName + userName);

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState(
      {
        [name]: value,
      },
      () => (document.getElementById(name).style.color = "black")
    );
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: { name: this.state.userName },
          }}
        />
      );
    }

    return (
      <div>
        {/* <link
          href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          rel="stylesheet"
          id="bootstrap-css"
        />
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
        <script src="//code.jquery.com/jquery-1.11.1.min.js"></script> */}

        <div class="sidenav">
          <div
            class="login-main-text"
            style={{
              display: "flex",
              flexdirection: "row",
              alignItems: "center",
            }}
          >
            <img
              class="px-2"
              src={Logo}
              height="100%"
              width="150"
              alt="cant find"
            ></img>
            <div class="title-padding">
              <h1 class="heading-style">Fat Wallet</h1>
              <h6>Login or register from here to access.</h6>
            </div>
          </div>
        </div>

        <div class="main">
          <div class="col-md-7 col-sm-7">
            <div>
              <form class="form-padding">
                <label
                  className="lh-copy white f5"
                  style={{ textTransform: "uppercase" }}
                >
                  {this.state.displayText}
                </label>
                <div class="form-group">
                  <label id="userName">User Name</label>
                  <input
                    type="text"
                    name="userName"
                    value={this.state.name}
                    class="form-control form-rounded"
                    placeholder="User Name"
                    onChange={this.handleChange}
                  />
                </div>
                <div class="form-group">
                  <label id="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={this.state.name}
                    class="form-control form-rounded"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-black form-rounded"
                  onClick={this.handleLogin}
                >
                  Login
                </button>
                <div class="form-group">
                  <br />
                  <p>
                    Do not have an account yet? Please fill in these additional
                    details.
                  </p>
                </div>
                <div class="form-group">
                  <label id="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={this.state.name}
                    class="form-control form-rounded"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </div>
                <div class="form-group">
                  <label id="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={this.state.name}
                    class="form-control form-rounded"
                    placeholder="First Name"
                    onChange={this.handleChange}
                  />
                </div>
                <div class="form-group">
                  <label id="lastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={this.state.name}
                    class="form-control  form-rounded"
                    placeholder="Last Name"
                    onChange={this.handleChange}
                  />
                </div>
                <div class="form-group">
                  <label id="cpassword">Confirm Password</label>
                  <input
                    type="password"
                    name="cpassword"
                    value={this.state.name}
                    class="form-control form-rounded"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-black form-rounded"
                  onClick={this.handleRegister}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
