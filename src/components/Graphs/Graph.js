import React from "react";
import { Dropdown } from "react-bootstrap";
import Bar from "./Bar";
import Pie from "./Pie";

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.choice = "Bar";

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event) {}

  render() {
    return (
      <Dropdown
        name="category"
        value={this.choice}
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
        <Dropdown.Menu style={{ width: "100%" }}></Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default Graph;
