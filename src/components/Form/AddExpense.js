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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  //alert("Your favorite flavor is: " + this.state.email);
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
  }

  render() {
    return (
      <form
        style={{
          width: "80vh",
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
          <div className="form-group" style={{ width: "100vh" }}>
            <label>Purchase Category</label>
            {/* <input 
                            list="browsers" 
                            name="browser"
                            className="form-control"
                            placeholder="Choose an option"
                        />
                        <datalist id="browsers">
                            <option value="Internet Explorer"/>
                            <option value="Firefox"/>
                            <option value="Chrome"/>
                            <option value="Opera"/>
                            <option value="Safari"/>
                        </datalist>
                    </div>  */}
            <Dropdown
              name="category"
              value={this.state.category}
              onSelect={this.handleSelect}
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
                Choose an Option
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item eventKey="action ">Action</Dropdown.Item>
                <Dropdown.Item eventKey="another" href="#/action-2">
                  Another action
                </Dropdown.Item>
                <Dropdown.Item eventKey="something" href="#/action-3">
                  Something else
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
