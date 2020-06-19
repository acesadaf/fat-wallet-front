import React, { Component } from "react";

class Main extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>Enter Stock Info!</h3>

          <div className="form-group">
            <label>Stock Ticker</label>
            <input
              type="text"
              name="ticker"
              className="form-control"
              placeholder="Enter ticker"
              value={this.state.ticker}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              placeholder="Enter number of stocks purchased"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>Purchase Price</label>
            <input
              type="number"
              name="purchasePrice"
              className="form-control"
              placeholder="Enter purchase price"
              value={this.state.purchasePrice}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>Select the date of purchase</label>
            <Calendar>
              onChange={this.onChange}
              value={this.state.purchaseDate}
            </Calendar>
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
