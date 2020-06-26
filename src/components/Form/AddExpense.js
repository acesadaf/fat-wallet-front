import React from "react";
import { Dropdown } from "react-bootstrap";

class AddExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      amount: 0,
      category: "",
      date: new Date(),
      description: "",
    };
    this.selectedCat = "Choose an Option";
    this.categories = ["Food", "Utilites", "Commute", "Entertainment"];

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }
  //alert("Your favorite flavor is: " + this.state.email);
  handleClick(event) {
    this.props.callbackFromParent(true);
  }

  handleSubmit() {
    const { name, amount, category, date, description } = this.state;
    alert("Inputs" + name + amount + category + date + description);
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

  handleSelect(eventKey) {
    this.setState(
      {
        category: eventKey,
      },
      () => console.log(this.state)
    );
    this.selectedCat = eventKey;
  }

  // handleClick(event) {
  //   event.preventDefault();
  // }

  render() {
    return (
      <form
        style={{
          width: "80vh",
          //border: "1px solid black",
        }}
        onSubmit={this.handleSubmit}
      >
        <h3 style={{ display: "flex", justifyContent: "center" }}>
          so how did you waste ur money this time
        </h3>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter Expense"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            className="form-control"
            placeholder="Enter amount"
            value={this.state.amount}
            onChange={this.handleChange}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexdirection: "row",
            justifyContent: "space-around",
            //border: "1px solid black",
          }}
        >
          <div className="form-group" style={{ width: "100%" }}>
            <label for="date">Date of Expenditure: </label>
            <br />
            <input
              type="date"
              id="date"
              className="form-control"
              name="date"
              value={this.state.date}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group" style={{ width: "100%" }}>
            <label>Purchase Category</label>
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
                    background: "#fcda4f",
                    border: "#fcda4f",
                  }}
                  variant="primary"
                  id="dropdown-basic"
                >
                  {this.selectedCat}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: "100%" }}>
                  {this.categories.map((cat) => (
                    <Dropdown.Item eventKey={cat}>{cat}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <button
                type="button"
                class="btn btn-warning"
                onClick={this.handleClick}
                style={{
                  background: "#fcda4f",
                  border: "#fcda4f",
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
          <label>Description</label>
          <textarea
            type="text"
            name="description"
            className="form-control"
            placeholder="Enter description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>

        <button
          style={{ background: "#fcda4f", color: "black", border: "#fcda4f" }}
          type="submit"
          className="btn btn-primary btn-block"
          onSubmit={this.handleSubmit}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default AddExpense;
