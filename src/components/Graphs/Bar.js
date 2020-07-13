import React, { PureComponent } from "react";
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

export default class Example extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentUser: props.username,
    };
  }

  refresh() {
    var table = JSON.parse(localStorage.getItem("barVal"));
    this.setState({ data: table });
  }

  componentWillMount() {
    if (localStorage.getItem("barVal") !== null) {
      var table = JSON.parse(localStorage.getItem("barVal"));
      this.setState({ data: table });
    } else {
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
          for (var key in resData) {
            tableContents.push({
              name: key,
              value: resData[key],
            });
          }
          console.log(tableContents);
          localStorage.setItem("barVal", JSON.stringify(tableContents));
          this.setState({ data: tableContents }, () =>
            console.log(this.state.data)
          );
        });
    }
  }

  render() {
    return (
      <div>
        <ResponsiveContainer
          width="99%"
          height={750}
          style={{ height: "80vw", maxHeight: "700px" }}
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
