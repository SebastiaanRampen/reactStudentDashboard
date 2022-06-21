import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Navbar from "../NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Datasheet from "../Datasheet/Datasheet";
import Charts from "../Charts/Charts";
import {
  addEvaluationDataset,
  addNameArray,
  addProjectArray,
  addEvaluationArray,
  reportDataReceived,
} from "../../Redux/EvaluationDataset";
import "./app.css";

export default function App() {
  const mockarooAddress =
    "https://my.api.mockaroo.com/student_dashboard.json?key=6dff6ba0";
  const datasheetAddress =
    "https://opensheet.elk.sh/1BHjq5MjpuSItvVbnQcEdQt_v956-Ks1lr3f_nEFkTks/Blad1";

  const dispatch = useDispatch();

  const colorArray = [
    { nr: "#f44336", description: "red" },
    { nr: "#880e4f", description: "purple" },
    { nr: "#3f51b5", description: "indigo" },
    { nr: "#03a9f4", description: "light-blue" },
    { nr: "#84ffff", description: "cyan accent-1" },
    { nr: "#4db6ac", description: "teal lighten-2" },
    { nr: "#4caf50", description: "green" },
    { nr: "#00e676", description: "green accent-3" },
    { nr: "#76ff03", description: "light-green accent-3" },
    { nr: "#ffeb3b", description: "yellow" },
    { nr: "#ff6f00", description: "amber darken-4" },
    { nr: "#ff5722", description: "deep-orange" },
    { nr: "#ff9e80", description: "deep-orange accent-1" },
    { nr: "#795548", description: "brown" },
  ];

  let mockarooData = [];

  async function getOnlineData() {
    mockarooData = await getMockarooData();
    getEvaluationData();
  }

  useEffect(() => {
    getOnlineData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //https://bobbyhadz.com/blog/react-hook-useeffect-has-missing-dependency

  function orderData(data) {
    let dataArray = [];
    data.forEach((dataSlice) => {
      dataArray.push({
        name: dataSlice["Wie ben je?"],
        task: dataSlice["Welke opdracht of welk project lever je nu in?"],
        challenge: dataSlice["Hoe moeilijk vond je deze opdracht?"],
        fun: dataSlice["Hoe leuk vond je deze opdracht?"],
      });
    });

    return dataArray;
  }

  async function getMockarooData() {
    let response = await fetch(mockarooAddress);
    return await response.json();
  }

  function getAge() {
    return Math.floor(Math.random() * 71 + 18);
  }

  const getEmail = (firstName, lastName) => {
    let result;
    let randomValue = Math.floor(Math.random() * 2);
    if (randomValue === 1) {
      result = firstName;
    } else {
      result = firstName.charAt(0);
    }
    randomValue = Math.floor(Math.random() * 2);
    if (randomValue === 1) {
      result = result + lastName;
    } else {
      result = result + "." + lastName;
    }
    randomValue = Math.floor(Math.random() * 3);
    if (randomValue === 0) {
      result = result + "@yahoo.com";
    }
    if (randomValue === 1) {
      result = result + "@gmail.com";
    }
    if (randomValue === 2) {
      result = result + "@hotmail.com";
    }
    return result;
  };

  const getEvaluationData = () => {
    //    curl "https://api.mockaroo.com/api/87025880?count=50&key=6dff6ba0" > "student_dashboard.json"
    fetch(datasheetAddress)
      .then((data) => data.json())
      .then((data) => {
        let nameArray = [];
        nameArray.push({
          id: 0,
          name: data[0]["Wie ben je?"],
          lastName: mockarooData[0].last_name,
          age: getAge(),
          phoneNumber: mockarooData[0].phone_number,
          email: getEmail(data[0]["Wie ben je?"], mockarooData[0].last_name),
          url: mockarooData[0].url,
          indexColor: colorArray[0],
          selected: false,
        });
        let projectArray = [];
        let EvaluationArray = [];
        let EvaluationObject = [];
        data.forEach((dataSlice) => {
          if (dataSlice["Wie ben je?"] === nameArray[0].name) {
            projectArray.push(
              dataSlice["Welke opdracht of welk project lever je nu in?"]
            );
          }
          if (
            !nameArray.some((names) => {
              return names.name === dataSlice["Wie ben je?"];
            })
          ) {
            let i = nameArray.length;
            nameArray.push({
              id: i,
              name: dataSlice["Wie ben je?"],
              lastName: mockarooData[i].last_name,
              age: getAge(),
              phoneNumber: mockarooData[i].phone_number,
              email: getEmail(
                dataSlice["Wie ben je?"],
                mockarooData[i].last_name
              ),
              url: mockarooData[i].url,

              indexColor: colorArray[i % 15],
              selected: false,
            });
            EvaluationArray.push(EvaluationObject);
            EvaluationObject = [];
          }
          EvaluationObject.push({
            challenge: parseInt(
              dataSlice["Hoe moeilijk vond je deze opdracht?"]
            ),
            fun: parseInt(dataSlice["Hoe leuk vond je deze opdracht?"]),
          });
        });
        EvaluationArray.push(EvaluationObject);
        dispatch(addNameArray(nameArray));
        dispatch(addProjectArray(projectArray));
        dispatch(addEvaluationArray(EvaluationArray));
        dispatch(addEvaluationDataset(orderData(data)));
      })
      .then(dispatch(reportDataReceived()));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/datasheet" element={<Datasheet />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
