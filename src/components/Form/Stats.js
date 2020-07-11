import React from "react";
import "./Stats.css";

class Stats extends React.Component {
    constructor(props){
        super(props);
        this.state  = {
            totExp: 0,
            expCat: "",
            user: props.user
        }
    }

    componentDidMount() {
        if (localStorage.getItem("statistics") !== null){
            var lst = JSON.parse(localStorage.getItem("statistics"));
            this.setState({totExp: lst[0], expCat: lst[1]});
        }else{
            console.log("inside stats")
            fetch("http://127.0.0.1:8000/stats_data", {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                username: this.state.user,
            }),
            })
            .then((response) => response.json())
            .then((resData) => {
                var statistics = [];
                statistics[0] = resData[0]
                statistics[1] = resData[1]
                localStorage.setItem("statistics", JSON.stringify(statistics));
                this.setState({totExp: resData[0], expCat: resData[1]})
            });
        }    
      }

    render(){
        return(
            <div style={{display: "flex", flexdirection: "row", padding: "2vh", width: "80vw", maxWidth: "700px",}}>
                <div class="card-deck" >
                    <div class="card bg-warning card-rounded">
                        <div class="card-body text-center">
                        <h3 class="card-text">Total Expense: {this.state.totExp}</h3>
                        </div>
                    </div>
                    <div class="card bg-warning card-rounded">
                        <div class="card-body text-center">
                        <h3 class="card-text">Most Spent On: {this.state.expCat}</h3>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Stats;