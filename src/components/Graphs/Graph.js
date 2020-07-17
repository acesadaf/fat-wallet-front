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
      firstName: "",
    };
    this.handleSelect = this.handleSelect.bind(this);

    this.childPie = React.createRef();
    this.childBar = React.createRef();
  }

  triggerUpdate(amount, date, category, refresh = false) {
    if (!refresh) {
      if (this.state.choice === "Expenses by Month") {
        this.childBar.current.refresh(amount, date);
      } else {
        this.childPie.current.refresh(amount, category);
      }
    } else {
      this.childBar.current.fetchRefresh();
      this.childPie.current.fetchRefresh();
    }
  }

  handleSelect(eventKey) {
    this.setState({
      choice: eventKey,
    });
    localStorage.setItem("choice", eventKey);
  }

  async componentDidMount() {
    var lastChoice = localStorage.getItem("choice");
    if (lastChoice != null) {
      this.setState({
        choice: lastChoice,
      });
    }
    const response = await fetch("https://upper-inukshuk-26953.herokuapp.com/give_name", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: this.props.username,
      }),
    });

    const name = await response.text();

    this.setState({ firstName: name });
  }

  render() {
    return (
      <div style={{ width: "100vh" }}>
        <PrintLabel user={this.state.firstName} />
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
            <p style={{ fontSize: "3vh" }}>{this.state.choice}</p>
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
          cB={this.childBar}
          cP={this.childPie}
          choice={this.state.choice}
          user={this.props.username}
        ></ShowGraph>
      </div>
    );
  }
}

function ShowGraph({ cB, cP, choice, user }) {
  if (choice === "Expenses by Month") {
    return <Bar ref={cB} username={user} />;
  } else {
    return <Pie ref={cP} username={user} />;
  }
}

function PrintLabel(user) {
  var strr = "";
  var arr = [
    ["Good Morning, ", 6, 12],
    ["Good Afternoon, ", 12, 18],
    ["Good Evening, ", 18, 21],
    ["Good Night, ", 21, 24],
  ];
  var hour = new Date().getHours();
  var i;

  var firstName = user.user;
  for (i = 0; i < 3; i++) {
    strr = arr[i][0].concat(firstName);
    if ((hour > arr[i][1]) & (hour <= arr[i][2])) {
      return <h3 style={{ padding: "3vh" }}>{strr}</h3>;
    }
  }
  strr = arr[3][0].concat(firstName);

  return (
    <h3 style={{ paddingTop: "3vh", paddingBottom: "1vh", paddingLeft: "3vh" }}>
      {strr}
    </h3>
  );
}

export default Graph;
