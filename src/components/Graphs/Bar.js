import React from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

const Bars = () =>{
  return (
    <BarChart
        width={1000}
        height={800}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
  );
}

export default Bars;























// import React, { Component } from 'react';
// import BarChart from 'react-easy-bar-chart';
// // import './App.css';

// class Bar extends Component {
//   render() {
//   const data = [
//     {
//       title:  "Maths",
//       value: 10,
//       color: "#196f3d",
//     },
//     {
//       title:  "English",
//       value: 14,
//       color: "#a93226",
//     },
//     {
//       title:  "Physics",
//       value: 2,
//       color: " #1f618d",
//     },
//     {
//       title:  "Chemistry",
//       value: 20,
//       color: "#839192",
//     },
//     {
//       title:  "Psychology",
//       value: 15,
//       color: "#d35400",
//     },
//     {
//       title:  "Biology",
//       value: 12,
//       color: " #a9cce3",
//     },
//     {
//       title:  "Economics",
//       value: 5,
//       color: "#2e4053",
//     },
//     {
//       title:  "Social Science",
//       value: 6,
//       color: "#186a3b",
//     },
//     ];
//     return (
//       <div className="App">
//         <header className="App-header">
//           <h1>React Bar Chart!</h1>
//         </header>
//         <BarChart 
//           xAxis='React Bar Chart'
//           yAxis="Values"
//           height={400}
//           width={800}
//           data={data}
//         />
//       </div>
//     );
//   }
// }

// export default Bar;
