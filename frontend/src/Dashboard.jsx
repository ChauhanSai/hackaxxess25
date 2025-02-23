
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


import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./styles/Dashboard.css";
import { useNavigate } from "react-router-dom";



const userAge = 19;
const userHeight = 70;
const userWeight = 160;
const userSex = "Male";

const id = "allen-20250223-022315";
const data = "0b00014e0c032bb80d002b0c0a0002410900043601002b30020012890e000490120005c81100002b000000fa13000000050000020600000504000640070000030f0000ba100002bc0800000003000000";

const year = id.substring(6,10);
const month = id.substring(10,12);
const day = parseInt(id.substring(12,14)) - 1;
const hour = id.substring(15,17);
const minute = id.substring(17,19);
const second = id.substring(19,21);
const mealDate = new Date(year, month, day, hour, minute, second);

const dayOfWeek = mealDate.getDay();

let weeklyData = Array.from({ length: 7 }, () => Array(7).fill(0));

let mealCals = 0;
let mealCarbs = 0;
let mealSugar = 0;
let mealSodium = 0;
let mealChol = 0;
let mealSatFat = 0;
let mealIron = 0;

for (let i = 0; i < data.length; i += 8) {
  if (data.substring(i,i+2) === "04") {
    mealCals = parseInt(data.substring(i+2,i+8)) / 100;
  } else if (data.substring(i,i+2) === "02") {
    mealCarbs = parseInt(data.substring(i+2,i+8)) / 100;
  } else if (data.substring(i,i+2) === "03") {
    mealChol = parseInt(data.substring(i+2,i+8)) / 100;
  } else if (data.substring(i,i+2) === "07") {
    mealSatFat = parseInt(data.substring(i+2,i+8)) / 100;
  } else if (data.substring(i,i+2) === "0b") {
    mealIron = parseInt(data.substring(i+2,i+8)) / 100;
  } else if (data.substring(i,i+2) === "0d") {
    mealSodium = parseInt(data.substring(i+2,i+8)) / 100;
  } else if (data.substring(i,i+2) === "0e") {
    mealSugar = parseInt(data.substring(i+2,i+8)) / 100;
  }
}

weeklyData[dayOfWeek][0] += mealCals;
weeklyData[dayOfWeek][1] += mealCarbs;
weeklyData[dayOfWeek][2] += mealSugar;
weeklyData[dayOfWeek][3] += mealSodium;
weeklyData[dayOfWeek][4] += mealChol;
weeklyData[dayOfWeek][5] += mealSatFat;
weeklyData[dayOfWeek][6] += mealIron;

let standardCal = 0;
if (userSex === "Male") {
  standardCal = 1.375 * ((10 * userWeight) + (6.25 * userHeight) - (5 * userAge) + 5);
} else {
  standardCal = 1.375 * ((10 * userWeight) + (6.25 * userHeight) - (5 * userAge) - 161);
}

let standardCarb = standardCal / 8;

let standardSugar = 0;
if (userSex === "Male") {
  standardSugar = 36;
} else {
  standardSugar = 25;
}

let standardSodium = 1800;

let standardChol = 250;

let standardSatFat = standardCal / (9 * 1.375);

let standardIron = 0;
if (userSex === "Male" || userAge < 50) {
  standardIron = 8;
} else {
  standardIron = 18;
}

const calories = [
  { name: "Mon", standard: standardCal, userdata: weeklyData[1][0]},
  { name: "Tues", standard: standardCal, userdata: weeklyData[2][0]},
  { name: "Wed", standard: standardCal, userdata: weeklyData[3][0]},
  { name: "Thurs", standard: standardCal, userdata: weeklyData[4][0]},
  { name: "Fri", standard: standardCal, userdata: weeklyData[5][0]},
  { name: "Sat", standard: standardCal, userdata: weeklyData[6][0]},
  { name: "Sun", standard: standardCal, userdata: weeklyData[0][0]},
];

const carbs = [
  { name: "Mon", standard: standardCarb, userdata: weeklyData[1][1]},
  { name: "Tues", standard: standardCarb, userdata: weeklyData[2][1]},
  { name: "Wed", standard: standardCarb, userdata: weeklyData[3][1]},
  { name: "Thurs", standard: standardCarb, userdata: weeklyData[4][1]},
  { name: "Fri", standard: standardCarb, userdata: weeklyData[5][1]},
  { name: "Sat", standard: standardCarb, userdata: weeklyData[6][1]},
  { name: "Sun", standard: standardCarb, userdata: weeklyData[0][1]},
];

const sodium = [
  { name: "Mon", standard: standardSugar, userdata: weeklyData[1][2]},
  { name: "Tues", standard: standardSugar, userdata: weeklyData[2][2]},
  { name: "Wed", standard: standardSugar, userdata: weeklyData[3][2]},
  { name: "Thurs", standard: standardSugar, userdata: weeklyData[4][2]},
  { name: "Fri", standard: standardSugar, userdata: weeklyData[5][2]},
  { name: "Sat", standard: standardSugar, userdata: weeklyData[6][2]},
  { name: "Sun", standard: standardSugar, userdata: weeklyData[0][2]},
];

const sugar = [
  { name: "Mon", standard: standardSodium, userdata: weeklyData[1][3]},
  { name: "Tues", standard: standardSodium, userdata: weeklyData[2][3]},
  { name: "Wed", standard: standardSodium, userdata: weeklyData[3][3]},
  { name: "Thurs", standard: standardSodium, userdata: weeklyData[4][3]},
  { name: "Fri", standard: standardSodium, userdata: weeklyData[5][3]},
  { name: "Sat", standard: standardSodium, userdata: weeklyData[6][3]},
  { name: "Sun", standard: standardSodium, userdata: weeklyData[0][3]},
];

const cholesterol = [
  { name: "Mon", standard: standardChol, userdata: weeklyData[1][4]},
  { name: "Tues", standard: standardChol, userdata: weeklyData[1][4]},
  { name: "Wed", standard: standardChol, userdata: weeklyData[1][4]},
  { name: "Thurs", standard: standardChol, userdata: weeklyData[1][4]},
  { name: "Fri", standard: standardChol, userdata: weeklyData[1][4]},
  { name: "Sat", standard: standardChol, userdata: weeklyData[1][4]},
  { name: "Sun", standard: standardChol, userdata: weeklyData[1][4]},
];

const satFat = [
  { name: "Mon", standard: standardSatFat, userdata: weeklyData[1][5]},
  { name: "Tues", standard: standardSatFat, userdata: weeklyData[2][5]},
  { name: "Wed", standard: standardSatFat, userdata: weeklyData[3][5]},
  { name: "Thurs", standard: standardSatFat, userdata: weeklyData[4][5]},
  { name: "Fri", standard: standardSatFat, userdata: weeklyData[5][5]},
  { name: "Sat", standard: standardSatFat, userdata: weeklyData[6][5]},
  { name: "Sun", standard: standardSatFat, userdata: weeklyData[0][5]},
];

const iron = [
  { name: "Mon", standard: standardIron, userdata: weeklyData[1][6]},
  { name: "Tues", standard: standardIron, userdata: weeklyData[2][6]},
  { name: "Wed", standard: standardIron, userdata: weeklyData[3][6]},
  { name: "Thurs", standard: standardIron, userdata: weeklyData[4][6]},
  { name: "Fri", standard: standardIron, userdata: weeklyData[5][6]},
  { name: "Sat", standard: standardIron, userdata: weeklyData[6][6]},
  { name: "Sun", standard: standardIron, userdata: weeklyData[0][6]},
];

const Dashboard = () => {
    const navigate = useNavigate();
  return (
    <div className="dash-container">

      {/* <div className="background-row">
        <div className="recent-activities">
          <div className="image-uploaded"></div>
          <div className="image-uploaded"></div>
          <div className="image-uploaded"></div>
          <div className="image-uploaded"></div>
          <div className="image-uploaded"></div>
          <button className="show-all-button">Show All</button>
        </div>
      </div> */}
        <button
            type="button"
            onClick={() => navigate("/activities")}
            className="plus"
        >
         +
        </button>
      <div className="nutrition-section">
        <div className="nutrition-title">My Nutrition</div>
        <div className="instructions">Welcome to your Forkast! Scroll to see your intake this week. Click the plus to upload new meals.</div>

        <div className="chart-container">
          <h1>My Calories (kCal)</h1>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={calories} margin={{ top: 30, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line className = "legend" type="monotone" dataKey="standard" stroke="#8884d8" strokeWidth={2} />
              <Line className = "legend" type="monotone" dataKey="userdata" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h1>My Carbohydrates (g)</h1>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={carbs} margin={{ top: 30, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line className = "legend" type="monotone" dataKey="standard" stroke="#8884d8" strokeWidth={2} />
              <Line className = "legend" type="monotone" dataKey="userdata" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h1>My Sodium (mg)</h1>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={carbs} margin={{ top: 30, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line className = "legend" type="monotone" dataKey="standard" stroke="#8884d8" strokeWidth={2} />
              <Line className = "legend" type="monotone" dataKey="userdata" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h1>My Sugar (g)</h1>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={carbs} margin={{ top: 30, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line className = "legend" type="monotone" dataKey="standard" stroke="#8884d8" strokeWidth={2} />
              <Line className = "legend" type="monotone" dataKey="userdata" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h1>My Cholesterol (mg)</h1>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={carbs} margin={{ top: 30, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line className = "legend" type="monotone" dataKey="standard" stroke="#8884d8" strokeWidth={2} />
              <Line className = "legend" type="monotone" dataKey="userdata" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h1>My Sat Fats (g)</h1>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={carbs} margin={{ top: 30, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line className = "legend" type="monotone" dataKey="standard" stroke="#8884d8" strokeWidth={2} />
              <Line className = "legend" type="monotone" dataKey="userdata" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h1>My Iron (mg)</h1>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={carbs} margin={{ top: 30, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line className = "legend" type="monotone" dataKey="standard" stroke="#8884d8" strokeWidth={2} />
              <Line className = "legend" type="monotone" dataKey="userdata" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
