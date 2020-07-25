import React, { Component } from "react";
import "./Signin.css";
import Logo from "../Image/Wallet.png";
import { Redirect, Link } from "react-router-dom";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      regUserName: "",
      email: "",
      firstName: "",
      lastName: "",
      regPassword: "",
      cpassword: "",
      loginOrRegister: true,
      displayText: "",
      redirect: null,
    };
    if (
      typeof props.location.state != "undefined" &&
      "signedOut" in props.location.state
    ) {
      localStorage.setItem("auth", "false");
    }

    this.handleChange = this.handleChange.bind(this);
    this.conditionalCSS = this.conditionalCSS.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  conditionalCSS(choice) {
    var index = 0;
    Object.keys(this.state).map((i) => {
      if (index <= 8) {
        if (this.state[i] === "") {
          if (choice === 1) {
            if (index >= 2) document.getElementById(i).style.color = "red";
          } else if (choice === 2) {
            console.log("-----------------------------");
            if (index === 0 || index === 1) {
              document.getElementById(i).style.color = "red";
            }
          }
        }
      }
      index = index + 1;
    });
  }

  handleLogin(event) {
    if (this.state.userName === "" || this.state.password === "") {
      this.setState({ displayText: "Empty Fields" }, () => {
        this.conditionalCSS(2);
      });
      return;
    }

    console.log(this.state.userName);
    fetch("https://upper-inukshuk-26953.herokuapp.com/sign_in", {
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
        if (!isNaN(responseText)) {
          localStorage.clear();
          localStorage.setItem("token", responseText);
          localStorage.setItem("fatWalletUser", this.state.userName);
          localStorage.setItem("auth", "true");
          localStorage.setItem("eBar", "true");
          localStorage.setItem("ePie", "true");
          localStorage.setItem("eCard", "true");
          localStorage.setItem("eList", "true");
          localStorage.setItem("firstTime", "true");
          this.setState({ redirect: "/home" });
        } else {
          this.setState({ displayText: responseText });
        }
      });
  }

  handleRegister(event) {
    console.log(this.state.regUserName);
    const p = this.state.regPassword;
    const cp = this.state.cpassword;

    if (
      this.state.email === "" ||
      this.state.firstName === "" ||
      this.state.lastName === "" ||
      this.state.regUserName === "" ||
      this.state.regPassword === "" ||
      this.state.cpassword === ""
    ) {
      this.setState({ displayText: "Empty Fields" }, () => {
        this.conditionalCSS(1);
      });

      return;
    }

    if (p != cp) {
      this.setState({ displayText: "Passwords don't match. Sorry!" });
      document.getElementById("regPassword").style.color = "red";
      document.getElementById("cpassword").style.color = "red";
      return;
    }

    if (!this.state.email.includes("@") | !this.state.email.includes(".")) {
      this.setState({ displayText: "Invalid Email Address!" });
      document.getElementById("email").style.color = "red";
      return;
    }

    fetch("https://upper-inukshuk-26953.herokuapp.com/add_user", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: this.state.regUserName,
        email: this.state.email,
        password: this.state.regPassword,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
      }),
    })
      .then((response) => response.text())
      .then((responseText) => {
        console.log(responseText);
        if (!isNaN(responseText)) {
          localStorage.clear();
          localStorage.setItem("token", responseText);
          localStorage.setItem("fatWalletUser", this.state.regUserName);
          localStorage.setItem("auth", "true");
          localStorage.setItem("firstTime", "true");
          localStorage.setItem("justReg", "true");
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
            state: { name: localStorage.getItem("fatWalletUser") },
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
                {/* <label
                  className="lh-copy white f5"
                  style={{ textTransform: "uppercase" }}
                >
                  {this.state.displayText}
                </label> */}

                <Label statement={this.state.displayText} />
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
                    Do not have an account yet? Please fill in these details.
                  </p>
                </div>
                <div class="form-group">
                  <label id="regUserName">User Name</label>
                  <input
                    type="text"
                    name="regUserName"
                    value={this.state.name}
                    class="form-control form-rounded"
                    placeholder="User Name"
                    onChange={this.handleChange}
                  />
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
                  <label id="regPassword">Password</label>
                  <input
                    type="password"
                    name="regPassword"
                    value={this.state.name}
                    class="form-control form-rounded"
                    placeholder="Password"
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

function Label(statement) {
  if (statement.statement === "") {
    return <div></div>;
  } else {
    return (
      <section>
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <div
                class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
                role="alert"
                data-brk-library="component__alert"
              >
                <i class="start-icon fa fa-times-circle faa-flash animated"></i>
                <strong class="font__weight-semibold">Oh snap!</strong>{" "}
                {statement.statement}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Signin;
