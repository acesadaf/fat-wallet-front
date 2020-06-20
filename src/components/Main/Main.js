import React, { Component } from "react";
import Graph from "../Graphs/Bar";
//import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";


class Main extends Component {
  render() {
    return (
      <div style={{ display: "flex", flexdirection: "row", justifyContent: "center"}}>
        <div style={{ display: "flex", justifyContent: "center", width: '100vh'}}>
            <Graph/>
          </div>
        <div
          className="px-5"
          style={{ display: "flex", justifyContent: "flex-end"}}
        >
          <form
            style={{
              width: '80vh',
            }}
            onSubmit={this.handleSubmit}
          >
            <h3>so how did you waste ur money this time</h3>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="ticker"
                className="form-control"
                placeholder="Enter ticker"
              />
            </div>

            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                placeholder="Enter number of stocks purchased"
              />
            </div>

            <div className="form-group">
              <label>Purchase Category</label>
              <input
                type="number"
                name="purchasePrice"
                className="form-control"
                placeholder="Enter purchase price"
              />
            </div>

            <div className="form-group">
              <label>Select the date of purchase</label>
              {/* <Calendar>
              onChange={this.onChange}
              value={this.state.purchaseDate}
            </Calendar> */}
            </div>

            <button
              //style={{ backgroundColor: "101357" }}
              type="submit"
              className="btn btn-primary btn-block"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Main;
