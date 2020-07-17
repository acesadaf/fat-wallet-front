import React, { PureComponent } from "react";
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip } from "recharts";
import { Spinner } from "react-bootstrap";
import ReactLogo from "./error.svg";
import "./Bar_Pie.css";

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentUser: props.username,
      graphState: -1,
    };

    this.refresh = this.refresh.bind(this);
    this.fetchRefresh = this.fetchRefresh.bind(this);
  }

  refresh(amount, category) {
    var newData = this.state.data;
    var found = false;
    var i;
    for (i = 0; i < newData.length; i++) {
      if (category === newData[i].name) {
        newData[i].value += parseFloat(amount);
        found = true;
        console.log("found");
      }
    }
    if (!found) {
      newData.push({
        name: category,
        value: parseFloat(amount),
      });
      console.log("not found");
    }

    localStorage.setItem("pieVal", JSON.stringify(newData));
    var table = JSON.parse(localStorage.getItem("pieVal"));
    this.setState({ data: table });
  }

  fetchRefresh() {
    fetch(
      "https://upper-inukshuk-26953.herokuapp.com/category_wise_user_data",
      {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username: this.state.currentUser,
        }),
      }
    )
      .then((response) => response.json())
      .then((resData) => {
        let tableContents = [];
        var sum = 0;
        for (var key in resData) {
          sum = sum + resData[key];
          tableContents.push({
            name: key,
            value: resData[key],
          });
        }
        localStorage.setItem("pieVal", JSON.stringify(tableContents));
        this.setState({ data: tableContents }, () => {
          localStorage.setItem("ghState", JSON.stringify(sum));
          this.setState({ graphState: sum });
        });
      });
  }

  componentDidUpdate(event) {
    var table = JSON.parse(localStorage.getItem("pieVal"));
  }

  componentDidMount() {
    if (
      localStorage.getItem("pieVal") !== null &&
      localStorage.getItem("ePie") === "false"
    ) {
      var table = JSON.parse(localStorage.getItem("pieVal"));
      var length = JSON.parse(localStorage.getItem("ghState"));
      this.setState({ data: table });
      this.setState({ graphState: length });
    } else {
      this.fetchRefresh();
      localStorage.setItem("ePie", false);
    }
  }

  render() {
    if (this.state.graphState > 0) {
      return (
        <div>
          <ResponsiveContainer width="99%" height={650}>
            <PieChart>
              <defs>
                <linearGradient
                  id="colorUv"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                  spreadMethod="reflect"
                >
                  <stop offset="0" stopColor="#f28f6d" />
                  <stop offset="1" stopColor="#df622c" />
                </linearGradient>
              </defs>
              <Pie
                dataKey="value"
                data={this.state.data}
                fill="url(#colorUv)"
                label
                cx="50%"
                cy="50%"
                outerRadius="80%"
                innerRadius="50%"
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    } else if (this.state.graphState == 0) {
      return (
        <div>
          <div>
            <img class="center" src={ReactLogo} alt="React Logo" />
          </div>
          <label
            className="lh-copy white f5 center"
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              //textTransform: "uppercase",
              padding: "5vh",
              fontSize: "3vh",
            }}
          >
            No Data to show
          </label>
        </div>
      );
    } else {
      return (
        <div style={{ textAlign: "center" }}>
          <Spinner
            width="99%"
            height={650}
            animation="border"
            role="status"
            style={{
              textAlign: "center",
              marginTop: "30%",
              marginBottom: "30%",
            }}
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    }
  }
}
