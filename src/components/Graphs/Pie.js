import React, { PureComponent } from "react";
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip } from "recharts";
import { Spinner } from "react-bootstrap";

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentUser: props.username,
      graphState: -1
    };

    this.refresh = this.refresh.bind(this);
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

  componentDidUpdate(event) {
    var table = JSON.parse(localStorage.getItem("pieVal"));
  }

  componentWillMount() {
    console.log("im mounting");
    if (localStorage.getItem("pieVal") !== null) {
      var table = JSON.parse(localStorage.getItem("pieVal"));
      var length = JSON.parse(localStorage.getItem("ghState"));
      this.setState({ data: table });
      this.setState({ graphState: length});
    } else {
      fetch("http://127.0.0.1:8000/category_wise_user_data", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username: this.state.currentUser,
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
          localStorage.setItem("pieVal", JSON.stringify(tableContents));
          this.setState({ data: tableContents }, () => {
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
          <ResponsiveContainer width="99%" height={750}>
            <PieChart>
              <Pie
                dataKey="value"
                data={this.state.data}
                fill="#df622c" 
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
