import React, { Component } from "react";
import "./Signin.css"
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
        loginOrRegister : true
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
      this.handleRegister = this.handleRegister.bind(this);
    }

    handleLogin(event) {
        const { firstName, lastName, userName, password, cpassword} = this.state;
        alert(firstName+password);
    }

    handleRegister(event) {
        const { firstName, lastName, userName, password, cpassword} = this.state;
        alert(lastName+userName);
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
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
            <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
            <div class="sidenav">
                <div class="login-main-text" style = {{display: "flex", flexdirection: "row"}}>
                    <img class="px-2" src={Logo} width="150" alt="cant find"></img>
                    <div style={{border: "1px solid white"}}>
                        <h1 style={{border: "1px solid white"}}>Fat Wallet</h1>
                        <h6 style={{border: "1px solid white"}}>Login or register from here to access.</h6>
                    </div>
                    
                </div>
            </div>
            <div class="main">
                <div class="col-md-6 col-sm-7">
                    <div class="login-form">
                    <form >
                        <div class="form-group">
                            <label>User Name</label>
                            <input 
                                type="text" 
                                name="userName"
                                value={this.state.name}
                                class="form-control" 
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
                                class="form-control" 
                                placeholder="Password" 
                                onChange={this.handleChange}
                            />
                        </div>
                        <button type="button" class="btn btn-black" onClick={this.handleLogin} >Login</button>
                        <div class="form-group">
                            <br/>
                            <p>Do not have an account yet? Please fill in these additional details.</p>
                        </div>
                        <div class="form-group">
                            <label>First Name</label>
                            <input 
                                type="text" 
                                name="firstName"
                                value={this.state.name}
                                class="form-control" 
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
                                class="form-control" 
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
                                class="form-control" 
                                placeholder="Password" 
                                onChange={this.handleChange}
                            />
                        </div>
                        <button type="button" class="btn btn-secondary" onClick={this.handleRegister}>Register</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
      );
    }
  }
  

  
  export default Signin;