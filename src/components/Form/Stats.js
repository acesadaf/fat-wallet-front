import React from "react";
import "./Stats.css";
import "./Odometer.css";
import Odometer from 'react-odometerjs';

class Stats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const totExp = this.props.totExp;
    const expCat = this.props.expCat;
    return (
      <div
        style={{
          display: "flex",
          flexdirection: "row",
          justifyContent: "center",
          width: "80vw",
          maxWidth: "700px",
        }}
      >
        <div class="card-deck card-margin" >
          <div class="card bg-warning card-rounded">
            <div class="card-body text-center">
              <h3 class="card-text">Total Expense:</h3>
              <h3><Odometer format="(,ddd).dd" value={totExp}/></h3>
            </div>
          </div>
          <div class="card bg-warning card-rounded">
            <div class="card-body text-center">
              <h3 class="card-text">Most Spent On: {expCat}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Stats;
