import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MaterialTable from 'material-table'

class EditCategory extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.callbackFromParent(true);
  }

  render() {
    return (
      <div
            style = {{
                padding: "5%"
            }}
        >
        

        <button
          style={{ background: "#fcda4f", color: "black", border: "#fcda4f" }}
          type="button"
          className="btn btn-primary btn-block"
          onClick={this.handleClick}
        >
          Back
        </button>

        </div>
    );
  }
}

export default EditCategory;
