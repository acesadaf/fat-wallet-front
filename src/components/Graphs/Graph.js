import React from "react";
import { Dropdown } from "react-bootstrap";
import Bar from "./Bar";
import Pie from "./Pie";

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: "Expenses by Month",
      time_of_day: "",
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(eventKey) {
    this.setState({
      choice: eventKey,
    });
    localStorage.setItem("choice", eventKey);
  }

  componentWillMount() {
    var lastChoice = localStorage.getItem("choice");
    if (lastChoice != null) {
      this.setState({
        choice: lastChoice,
      });
    }
  }

  render() {
    return (
      <div style={{ width: "100vh" }}>
        <PrintLabel
          user = {this.props.username}
        />
        <Dropdown
          name="category"
          value={this.choice}
          onSelect={this.handleSelect}
        >
          <Dropdown.Toggle
            style={{
              width: "100%",
              color: "black",
              backgroundColor: "transparent",
              outline: "none",
              border: "none",
              outline: "none !important",
              boxshadow: "none",
            }}
            variant="primary"
            id="dropdown-basic"
          >
            {this.state.choice}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ width: "100%", justifyContent: "center" }}>
            <Dropdown.Item eventKey="Expenses by Month">
              Expenses by Month
            </Dropdown.Item>
            <Dropdown.Item eventKey="Expenses by Category">
              Expenses by Category
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ShowGraph
          choice={this.state.choice}
          user={this.props.username}
        ></ShowGraph>
      </div>
    );
  }
}

function ShowGraph({ choice, user }) {
  if (choice === "Expenses by Month") {
    return <Bar username={user} />;
  } else {
    return <Pie username={user} />;
  }
}

function PrintLabel(user){
    var arr = [["Good Morning, ", 6, 12], ["Good Evening, ", 12, 18], ["Good afternoon, ", 18, 21], ["Good Night, ", 21, 24]];
    var hour = new Date().getHours();
    console.log(user)
    var i;
    var strr = "";
    for(i=0; i<3; i++){
      strr = arr[i][0].concat(user.user)
      if (hour > arr[i][1] & hour <= arr[i][2]){
          return <h3 style={{padding: "3vh"}}>{strr}</h3>
      }
    }
    strr = arr[3][0].concat(user.user)
    return <h3 style={{padding: "3vh"}}>{strr}</h3>

    // if (hour < 12){
    //   var strr = arr[0].concat(user)
    //   return <label>{strr}</label>
    // }
    // if (hour >= 12 & hour < 6){
    //   var strr = arr[1].concat(user)
    //   return <label>{strr}</label>
    // }
    // return <label>reeee</label>
    
}

export default Graph;
