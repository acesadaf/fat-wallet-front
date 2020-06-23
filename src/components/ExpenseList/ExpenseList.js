import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MaterialTable from 'material-table'



class ExpenseList extends React.Component{

    constructor (props){
        super(props);
        this.data = [
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
        ];
        // this.theme  = {
        //     palette: {
        //       primary: {
        //         main: '#4caf50',
        //       },
        //       secondary: {
        //         main: '#ff9100',
        //       },
        //     },
        // };
    }


    render() {
        return(
            
            <MuiThemeProvider >
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                <MaterialTable 
                // theme={this.theme}
                style={{background: "#fcda4f"}}
                title="Styling with MuiThemeProvider Preview"
                columns={[
                    {
                    title: 'Name', field: 'name',
                    },
                    { title: 'Surname', field: 'surname' },
                    { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                    {
                    title: 'Birth Place',
                    field: 'birthCity',
                    lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                    },
                ]}
                data = {this.data}
                options={{
                    selection: false
                }}
                />
            </MuiThemeProvider>
        );
    }
}

export default ExpenseList;
