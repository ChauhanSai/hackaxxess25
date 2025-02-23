// import React from "react";
// import {LineChart, Line} from "recharts";
// import "./styles/Dashboard.css";
// const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];

// const renderLineChart = (
//   <LineChart width={400} height={400} data={data}>
//     <Line type="monotone" dataKey="uv" stroke="#8884d8" />
//   </LineChart>
// );

// const Dashboard = () => {
//     return (
//         <div className = "dash-container">
//           <div className = "page-title">My Forkast</div>
//             <div className="background-row">
//               <div className="recent-activities">
//                 <div className="image-uploaded"></div>
//                 <div className="image-uploaded"></div>
//                 <div className="image-uploaded"></div>
//                 <div className="image-uploaded"></div>
//                 <div className="image-uploaded"></div>
//                 <button className="show-all-button">Show All</button>
//               </div>
//             </div>

            
//           <div>
//             <div className = "nutrition-title">My Nutrition</div>
//           </div>
//         </div>

//     );
// };

// {'Iron, Fe MG': 3.34, 'Potassium, K MG': 2078, 'Sodium, Na MG': 110.2, 'Glucose G': 5.7700000000000005, 'Fiber, total dietary G': 10.78, 'Calcium, Ca MG': 110.56, 'Carbohydrate, by difference G': 47.449999999999996, 'Sugars, Total G': 11.68, 'Vitamin C, total ascorbic acid MG': 14.8, 'Vitamin B-6 MG': 0.43, 'Biotin UG': 2.51, 'Vitamin D (D2 + D3), International Units IU': 0.0, 'Fatty acids, total monounsaturated G': 0.02, 'Fatty acids, total polyunsaturated G': 0.05, 'Energy KCAL': 16.0, 'Fatty acids, total saturated G': 0.03, 'Vitamin A, IU IU': 7.0, 'Fatty acids, total trans G': 0.0, 'Cholesterol MG': 0.0}

// [
//   {
//   “Id”: “allen-20250223-022315”,
//   “Image”: “image.jpg”
//   “Data”: “0b00014e0c032bb80d002b0c0a0002410900043601002b30020012890e000490120005c81100002b000000fa13000000050000020600000504000640070000030f0000ba100002bc0800000003000000”
//   },
//   {
//   “Id”: “prerita-20250223-022315”,
//   “Image”: “image.jpg”
//   “Data”: “0b00014e0c032bb80d002b0c0a0002410900043601002b30020012890e000490120005c81100002b000000fa13000000050000020600000504000640070000030f0000ba100002bc0800000003000000”
//   },
//   {
//   “Id”: “allen-20250221-160234”,
//   “Image”: “image.jpg”
//   “Data”: “0b00014e0c032bb80d002b0c0a0002410900043601002b30020012890e000490120005c81100002b000000fa13000000050000020600000504000640070000030f0000ba100002bc0800000003000000”
//   }
//   ]
  
// 'Biotin UG': '00',
// 'Calcium, Ca MG': '01',
// 'Carbohydrate, by difference G': '02',
// 'Cholesterol MG': '03',
// 'Energy KCAL': '04',
// 'Fatty acids, total monounsaturated G': '05',
// 'Fatty acids, total polyunsaturated G': '06',
// 'Fatty acids, total saturated G': '07',
// 'Fatty acids, total trans G': '08',
// 'Fiber, total dietary G': '09',
// 'Glucose G': '0a',
// 'Iron, Fe MG': '0b',
// 'Potassium, K MG': '0c',
// 'Sodium, Na MG': '0d',
// 'Sugars, Total G': '0e',
// 'Total Sugars G': '0f',
// 'Vitamin A, IU IU': '10',
// 'Vitamin B-6 MG': '11',
// 'Vitamin C, total ascorbic acid MG': '12',
// 'Vitamin D (D2 + D3), International Units IU': '13'


// export default Dashboard;
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./styles/Dashboard.css";

const calories = [
  { name: "Mon", standard: 400, userdata: 2400},
  { name: "Tues", standard: 300, userdata: 2200},
  { name: "Wed", standard: 200, userdata: 2000},
  { name: "Thurs", standard: 278, userdata: 2100},
  { name: "Fri", standard: 189, userdata: 1800},
  { name: "Sat", standard: 239, userdata: 2000},
  { name: "Sun", standard: 349, userdata: 2300},
];

const Dashboard = () => {
  return (
    <div className="dash-container">
      <div className="page-title">My Forkast</div>

      <div className="background-row">
        <div className="recent-activities">
          <div className="image-uploaded"></div>
          <div className="image-uploaded"></div>
          <div className="image-uploaded"></div>
          <div className="image-uploaded"></div>
          <div className="image-uploaded"></div>
          <button className="show-all-button">Show All</button>
        </div>
      </div>

      <div className="nutrition-section">
        <div className="nutrition-title">My Nutrition</div>

        {/* Line Chart for Nutrition Data */}
        <div className="chart-container">
          <h1>My Calories</h1>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={calories} margin={{ top: 30, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="standard" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="userdata" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
