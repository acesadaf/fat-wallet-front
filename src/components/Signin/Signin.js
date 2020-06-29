import React, { Component } from "react";
import "./Signin.css";
import Logo from "../Image/Wallet.png";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      cpassword: "",
      loginOrRegister: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleLogin(event) {
    const { firstName, lastName, userName, password, cpassword } = this.state;
    alert(firstName + password);
  }

  handleRegister(event) {
    const { firstName, lastName, userName, password, cpassword } = this.state;
    alert(lastName + userName);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState(
      {
        [name]: value,
      },
      () => console.log(this.state)
    );
  }

  render() {
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
                <div class="form-group">
                  <label>User Name</label>
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
                  <label>Password</label>
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
                  <label>First Name</label>
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
                  <label>Last Name</label>
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
                  <label>Confirm Password</label>
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
