import moment from "moment";
import { Spinner } from "react-bootstrap";
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
      graphState: -1
    };
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

  componentWillMount() {
    if (localStorage.getItem("barVal") !== null) {
      var table = JSON.parse(localStorage.getItem("barVal"));
      var length = JSON.parse(localStorage.getItem("ghState"));
      this.setState({ data: table });
      this.setState({ graphState: length});
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
          this.setState({ data: tableContents }, ()=> {
            localStorage.setItem("ghState", JSON.stringify(this.state.data.length));
            this.setState({ graphState: this.state.data.length});
          });
        });
    }
  }

  render() {
    if (this.state.graphState >= 0){
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
              <Bar dataKey="value" fill="#df622c"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }
    else{
      return (
        <Spinner
          animation="border"
          role="status"
          style={{ textAlign: "center" }}
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    
  }
}
