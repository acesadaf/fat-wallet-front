import moment from "moment";
import { Spinner } from "react-bootstrap";
import ReactLogo from "./error.svg";
import "./Bar_Pie.css";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import React, { PureComponent } from "react";

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentUser: props.username,
      graphState: -1,
    };
    this.fetchRefresh = this.fetchRefresh.bind(this);
  }

  refresh(amount, date) {
    amount = parseFloat(amount);
    var now = moment();
    var givenDate = moment(date);
    console.log(now);

    var found = false;
    var monthToAdd = "";
    var counter = 5;

    while (counter !== 0) {
      if (
        now.month() === givenDate.month() &&
        now.year() === givenDate.year()
      ) {
        found = true;
        monthToAdd = now.format("MMMM");
      } else {
        now.subtract(1, "month");
      }
      counter -= 1;
    }

    console.log(monthToAdd);

    if (found) {
      var newData = this.state.data;
      var i;
      for (i = 0; i < newData.length; i++) {
        if (monthToAdd === newData[i].name) {
          newData[i].value += amount;
          console.log("found");
        }
      }
    }
    console.log(newData);
    localStorage.setItem("barVal", JSON.stringify(newData));
    var table = JSON.parse(localStorage.getItem("barVal"));
    console.log(table);
    this.setState({ data: table });
  }

  fetchRefresh() {
    fetch("http://127.0.0.1:8000/monthly_user_data", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: this.state.currentUser,
        duration: 5,
        month_or_week: 1,
      }),
    })
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData);
        let tableContents = [];
        var sum = 0;
        for (var key in resData) {
          sum = sum + resData[key];
          tableContents.push({
            name: key,
            value: resData[key],
          });
        }
        console.log(tableContents);
        localStorage.setItem("barVal", JSON.stringify(tableContents));
        this.setState({ data: tableContents }, () => {
          localStorage.setItem("ghState", JSON.stringify(sum));
          this.setState({ graphState: sum });
        });
      });
  }

  componentDidMount() {
    console.log("ebar checking", localStorage.getItem("eBar"));
    if (
      localStorage.getItem("barVal") !== null &&
      localStorage.getItem("eBar") === "false"
    ) {
      var table = JSON.parse(localStorage.getItem("barVal"));
      var length = JSON.parse(localStorage.getItem("ghState"));
      this.setState({ data: table });
      this.setState({ graphState: length });
    } else {
      this.fetchRefresh();
      localStorage.setItem("eBar", false);
    }
  }

  render() {
    if (this.state.graphState > 0) {
      return (
        <div>
          <ResponsiveContainer
            width="99%"
            height={650}
            // style={{ height: "80vw", maxHeight: "700px" }}
          >
            <BarChart
              data={this.state.data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
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
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="url(#colorUv)" />
            </BarChart>
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
              justifyContent: "center",
              textTransform: "uppercase",
              padding: "5vh",
              width: "100%",
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
            height={750}
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
