import React, { Component } from "react";
//import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

class Main extends Component {
  render() {
    return (
      <div
        className="px-5"
        style={{ display: "flex", justifyContent: "right" }}
      >
        <form
          style={{
            height: 500,
            width: 300,
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
    );
  }
}

export default Main;
