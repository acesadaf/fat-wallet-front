import React from "react";
import { Dropdown } from "react-bootstrap";
import "./AddExpense.css";
//import "../checkMark.css";
import { InputGroupAppend } from "react-bootstrap/InputGroup";
import Stats from "./Stats";
import 'font-awesome/css/font-awesome.min.css';
import '../../fa-animation.css';
import "./EditCategory.css";


class AddExpense extends React.Component {
  constructor(props) {
    super(props);
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let separator = "-";

    this.newstring = `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
    this.state = {
      name: "",
      amount: 0,
      category: "",
      date: this.newstring,
      description: "",
      user: props.username,
      allcategories: [],
      displayText: "",
      added: 0,
    };
    this.selectedCat = "Options";
    this.categories = ["Food", "Utilites", "Commute", "Entertainment"];

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    fetch("https://upper-inukshuk-26953.herokuapp.com/category_data", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: this.state.user,
      }),
    })
      .then((response) => response.json())
      .then((resData) => {
        let tableContents = [];
        var i;
        for (i = 0; i < resData.length; i++) {
          tableContents.push(resData[i].category);
        }
        this.setState({ allcategories: tableContents });
      });
  }

  handleClick(event) {
    this.props.callbackFromParent(true);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ added: 0 });
  }

  conditionalCSS() {
    var index = 0;
    Object.keys(this.state).map((i) => {
      if (index <= 3) {
        if (this.state[i] === "" || this.state[i] === 0.0) {
          document.getElementById(i).style.color = "red";
        }
      }
      index = index + 1;
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (
      this.state.name === "" ||
      this.state.amount === 0.0 ||
      this.state.category === ""
    ) {
      this.setState({ displayText: "Empty Fields" }, () => {
        this.conditionalCSS();
      });

      return;
    }
    localStorage.setItem("eList", "true");
    this.setState({
      name: "",
      amount: 0,
      date: this.newstring,
      description: "",
    });
    event.preventDefault();
    this.props.informNav();
    this.props.informUpdate(
      this.state.amount,
      this.state.date,
      this.state.category,
      false
    );
    localStorage.setItem("ghState", "1");
    this.setState({ added: parseFloat(this.state.amount) });

    fetch("https://upper-inukshuk-26953.herokuapp.com/expense_submit", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        amount: this.state.amount,
        date_of_expense: this.state.date,
        category: this.state.category,
        description: this.state.description,
        user: this.state.user,
      }),
    })
      .then((response) => response.text())
      .then((responseText) => {
        console.log(responseText);
        this.props.informUpdate(
          this.state.amount,
          this.state.date,
          this.state.category,
          true
        );
        this.props.informNav();
        this.state.added = 0;

        this.setState({ displayText: responseText });
        setTimeout(() => {
          this.setState({ displayText: "" });
        }, 4000);

        //this.refs.stat.refresh(this.state.amount);
        // this.props.informUpdate(
        //   this.state.amount,
        //   this.state.date,
        //   this.state.category
        // );
      });
  }

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

  handleSelect(eventKey) {
    this.setState(
      {
        category: eventKey,
      },
      () => (document.getElementById("category").style.color = "black")
    );
    this.selectedCat = eventKey;
  }

  render() {
    return (
      <div>
        <form
          id="addForm"
          style={{
            width: "80vw",
            maxWidth: "700px",
            marginBottom: "2vh",
            //border: "1px solid black",
          }}
          onSubmit={this.handleSubmit}
          class = "slide-up"
        >
          <Stats
            ref="stat"
            totExp={
              parseFloat(this.props.totExp) + parseFloat(this.state.added)
            }
            expCat={this.props.expCat}
            //user={this.state.user}
          />
          <h3 style={{ display: "flex", justifyContent: "center" }}>
            Key in your new expense
          </h3>

          <Label statement = {this.state.displayText}/>

          <div className="form-group">
            <label id="name">Name</label>
            <input
              type="text"
              name="name"
              className="form-control form-rounded"
              placeholder="Enter Expense"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label id="amount">Amount</label>
            <input
              type="number"
              step="0.01"
              name="amount"
              className="form-control form-rounded"
              placeholder="Enter amount"
              value={this.state.amount}
              onChange={this.handleChange}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <div className="form-group" 
            style={{ width: "50%" }}
            >
              <label id="date" for="date">
                Incurred Date:{" "}
              </label>
              <br />
              <input
                type="date"
                id="date"
                className="form-control form-rounded"
                name="date"
                value={this.state.date}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group" 
            style={{ width: "50%" }}
            >
              <label id="category">Purchase Category</label>
              <div
                style={{
                  display: "flex",
                  flexdirection: "row",
                }}
              >
                <Dropdown
                  name="category"
                  value={this.state.category}
                  onSelect={this.handleSelect}
                  style={{
                    flex: 10,
                  }}
                >
                  <Dropdown.Toggle
                    style={{
                      width: "100%",
                      color: "black",
                      background: "#FFAC9E",
                      border: "#FFAC9E",
                      boxShadow:
                        "0 1.8px 2.2px rgba(0, 0, 0, 0.02), 0 4.3px 5.3px rgba(0, 0, 0, 0.028), 0 8.1px 10px rgba(0, 0, 0, 0.035), 0 14.5px 17.9px rgba(0, 0, 0, 0.042), 0 27.2px 33.4px rgba(0, 0, 0, 0.05), 0 65px 80px rgba(0, 0, 0, 0.07)",
                    }}
                    variant="primary"
                    id="dropdown-basic"
                    className="form-rounded"
                  >
                    {this.selectedCat}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ width: "100%" }}>
                    {this.state.allcategories.map((cat) => (
                      <Dropdown.Item eventKey={cat}>{cat}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <button
                  type="button"
                  class="btn btn-warning form-rounded"
                  onClick={this.handleClick}
                  style={{
                    background: "#FFAC9E",
                    border: "#FFAC9E",
                    display: "flex",
                    width: "100%",
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label id="description">Description</label>
            <textarea
              type="text"
              name="description"
              className="form-control form-rounded"
              placeholder="Enter description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>

          <button
            style={{ background: "#FFAC9E", color: "black", border: "#FFAC9E" }}
            type="submit"
            className="btn btn-warning btn-block form-rounded"
            onSubmit={this.handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function Label(statement){
  if (statement.statement === ""){
    return(
        <div></div>
    );
  }
  else if(statement.statement === "Expense Added"){
    return (
      <section>
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div class="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">
              <i class="start-icon fa fa-check-circle faa-tada animated"></i>
              <strong>Well Done!</strong> Your expense has been added.
            </div>
          </div>
        </div>
      </div>
    </section>
    );
  }
  else{
    return (
      <section>
      <div class="square_box box_three"></div>
      <div class="square_box box_four"></div>
      <div class="container mt-5">
        <div class="row">
          <div class="col-sm-12">
              <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" role="alert" data-brk-library="component__alert">
                <i class="start-icon fa fa-times-circle faa-flash animated"></i>
                <strong class="font__weight-semibold">Oh snap!</strong> Change a few things up and try submitting again.
              </div>
          </div>
        </div>
      </div>
    </section>
    );
  }
}

export default AddExpense;
