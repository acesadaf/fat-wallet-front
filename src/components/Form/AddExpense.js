import React from 'react';
import {Dropdown} from 'react-bootstrap';

class AddExpense extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            amount: 0,
            Category: "",
            Date: new Date()
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){

    }

    handleChange(event){
        
    }

    render(){
        return(
            <form
                style={{
                width: '80vh',
                }}
                onSubmit={this.handleSubmit}
            >
                <h3 style={{display: "flex", justifyContent: "center"}}>so how did you waste ur money this time</h3>

                <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    name="ticker"
                    className="form-control"
                    placeholder="Enter Expense"
                />
                </div>

                <div className="form-group">
                <label>Amount</label>
                <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    placeholder="Enter amount"
                />
                </div>
                

                <div style={{ display: "flex", flexdirection: "row", justifyContent: "space-around"}}>
                    <div className="form-group" style = {{width: "100%"}}>
                    <label for="birthday">Date of Expenditure: </label><br />
                    <input 
                        type="date" 
                        id="birthday" 
                        className="form-control"
                        name="birthday"
                    />
                    </div>
                    <div className="form-group" style = {{width: "100vh"}}>
                        <label>Purchase Category</label>
                        {/* <input 
                            list="browsers" 
                            name="browser"
                            className="form-control"
                            placeholder="Choose an option"
                        />
                        <datalist id="browsers">
                            <option value="Internet Explorer"/>
                            <option value="Firefox"/>
                            <option value="Chrome"/>
                            <option value="Opera"/>
                            <option value="Safari"/>
                        </datalist>
                    </div>  */}
                        <Dropdown>
                            <Dropdown.Toggle  style = {{width: "100%", color: "black" ,background: "#fcda4f", border: "#fcda4f" }} variant="primary" id="dropdown-basic">
                                Choose an Option 
                            </Dropdown.Toggle>

                            <Dropdown.Menu style = {{width: "100%"}}>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                </div>
                
                <div className="form-group">
                <label>Description</label>
                <textarea
                    type="text"
                    name="quantity"
                    className="form-control"
                    placeholder="Enter description"
                />
                </div>

                <button
                style={{ background: "#fcda4f", color: "black", border: "#fcda4f" }}
                type="submit"
                className="btn btn-primary btn-block"
                >
                Submit
                </button>
            </form>
        );
    }
}



export default AddExpense;