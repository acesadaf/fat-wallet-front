import React from "react";

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
      <button type="button" onClick={this.handleClick}>
        Back
      </button>
    );
  }
}

export default EditCategory;
