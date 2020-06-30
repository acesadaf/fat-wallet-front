import React, { PureComponent } from "react";
import { ResponsiveContainer, PieChart, Pie, Legend } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

export default class Example extends PureComponent {
  render() {
    return (
      <div >
        <ResponsiveContainer width="99%" height={750}>
          <PieChart>
            <Pie
              dataKey="value"
              data={data}
              fill="#8884d8"
              label
              cx="50%"
              cy="50%"
              outerRadius="80%"
              innerRadius="50%"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
