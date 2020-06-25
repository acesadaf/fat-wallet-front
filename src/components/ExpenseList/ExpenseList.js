import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MaterialTable from 'material-table'



export default function MaterialTableDemo() {
    const [state, setState] = React.useState({
      columns: [
        { title: 'Name', field: 'name' },
        { title: 'Amount', field: 'amount', type: 'numeric' },
        { title: 'Date of Expense', field: 'dateOfExpense', type: 'date' },
        { title: 'Category', field: 'category' },
        {
          title: 'Description',
          field: 'description',
        //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
      ],
      data: [
        { name: 'Mehmet', amount: 100, dateOfExpense: "12/11/2020", category: 'Food',  description: "adasdasdasdasd"},
        { name: 'hmet', amount: 100, dateOfExpense: "2020-10-10", category: 'Food',  description: "adasdasdasdasd"},
      ],
    });
  
    return (
        <div
            style = {{
                padding: "5%"
            }}
        >
        
        <MuiThemeProvider>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <MaterialTable
                style = {{
                    background: "#fcda4f"
                }}
                title="Expense History"
                columns={state.columns}
                data={state.data}
                editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                        if (oldData) {
                        setState((prevState) => {
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)] = newData;
                            return { ...prevState, data };
                        });
                        }
                    }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                        setState((prevState) => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                        });
                    }, 600);
                    }),
                }}
            />
        </MuiThemeProvider>
        </div>
    );
  }