import React, { useState } from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTooltip,
  VictoryLine,
  VictoryGroup,
  VictoryZoomContainer,
  VictoryBrushContainer,
} from "victory";
import { useSelector } from "react-redux";
import AddNameLegend from "./addNameLegend";
import "./charts.css";

export default function Charts() {
  const getNameArray = useSelector(
    (state) => state.evaluationDataset.nameArray
  );
  const getProjectArray = useSelector(
    (state) => state.evaluationDataset.projectArray
  );
  const getEvaluationArray = useSelector(
    (state) => state.evaluationDataset.evaluationArray
  );

  const [storedZoomDomain, setZoomDomain] = useState({
    x: [0.5, 10.5],
  });
  const [directionUp, setDirection] = useState(true);

  const [selectShowData, setSelectShowData] = useState("challenge");
  function changeSelectShowData(input) {
    setSelectShowData(input);
  }
  const [selectSortData, setSelectSortData] = useState("entry");
  function changeSelectSortData(input) {
    setSelectSortData(input);
  }

  let assignmentRatingAverage = [];
  let showDataSet = [];

  const NrSelectedNames = getNameArray.reduce((count, person) => {
    if (person.selected === true) {
      count = count + 1;
    }
    return count;
  }, 0);

  let nrOfBars = 2;
  if (NrSelectedNames > 0) {
    nrOfBars = NrSelectedNames;
  }

  let challengeColor = { nr: "#9e9e9e", description: "grey" };
  let funColor = { nr: "#000000", description: "black" };

  const wincTheme = {
    axis: {
      style: {
        grid: {
          fill: "none",
          stroke: "none",
        },
        ticks: {
          fill: "transparent",
          size: 5,
          stroke: "#90A4AE",
          strokeWidth: 1,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        },
        tickLabels: {
          fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
          fontSize: 10,
          letterSpacing: "normal",
          padding: 8,
          fill: "#455A64",
          stroke: "transparent",
          strokeWidth: 0,
        },
      },
    },
    bar: {
      style: {
        data: {
          fill: "#4a90e2",
          padding: 0,
          strokeWidth:
            200 / nrOfBars / (storedZoomDomain.x[1] - storedZoomDomain.x[0]),
        },
        labels: {
          fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
          fontSize: 8,
          letterSpacing: "normal",
          padding: 8,
          fill: "#455A64",
          stroke: "transparent",
          strokeWidth: 0,
        },
      },
    },
    chart: {
      width: 800,
      height: 300,
      padding: 50,
    },
    line: {
      style: {
        data: {
          fill: "transparent",
          opacity: 1,
          stroke: "#455A64",
          strokeWidth: 2,
        },
      },
    },
  };

  if (getEvaluationArray.length > 0) {
    let difficultyRating;
    let enjoymentRating;

    for (let i = 0; i < getProjectArray.length; i++) {
      difficultyRating = 0;
      enjoymentRating = 0;
      let addToAssignmentRatingAverage = {
        id: i,
        assignment: getProjectArray[i],
      };

      for (let j = 0; j < getNameArray.length; j++) {
        difficultyRating =
          difficultyRating + getEvaluationArray[j][i].challenge;
        enjoymentRating = enjoymentRating + getEvaluationArray[j][i].fun;

        let keyName = getNameArray[j].name;
        let addition = {};
        addition[keyName] = {
          difficultyRating: getEvaluationArray[j][i].challenge,
          enjoymentRating: getEvaluationArray[j][i].fun,
        };
        Object.assign(addToAssignmentRatingAverage, addition);
      }

      difficultyRating = difficultyRating / getNameArray.length;
      enjoymentRating = enjoymentRating / getNameArray.length;

      let addition = {
        average: {
          difficultyRating: difficultyRating,
          enjoymentRating: enjoymentRating,
          label: `Opdracht ${
            getProjectArray[i]
          }, difficultyRating: ${difficultyRating.toFixed(
            1
          )}, enjoymentRating: ${enjoymentRating.toFixed(1)}`,
        },
        label: `Opdracht ${
          getProjectArray[i]
        }, challenge: ${difficultyRating.toFixed(
          1
        )}, fun: ${enjoymentRating.toFixed(1)}`,
        label1: `Opdracht ${
          getProjectArray[i]
        }, difficultyRating: ${difficultyRating.toFixed(1)}`,
        label2: `Opdracht ${
          getProjectArray[i]
        },  enjoymentRating: ${enjoymentRating.toFixed(1)}`,
      };

      Object.assign(addToAssignmentRatingAverage, addition);

      assignmentRatingAverage.push(addToAssignmentRatingAverage);
    }
  }

  let preShowDataSet = [];

  if (assignmentRatingAverage.length > 0) {
    for (let i = 0; i < getProjectArray.length; i++) {
      let addData = {};
      if (NrSelectedNames === 0) {
        addData = {
          id: assignmentRatingAverage[i].id,
          assignment: assignmentRatingAverage[i].assignment,
          difficultyRating: assignmentRatingAverage[i].average.difficultyRating,
          enjoymentRating: assignmentRatingAverage[i].average.enjoymentRating,
          label: assignmentRatingAverage[i].label,
        };
      } else {
        addData = {
          id: assignmentRatingAverage[i].id,
          assignment: assignmentRatingAverage[i].assignment,
          label: assignmentRatingAverage[i].assignment,
        };

        for (let j = 0; j < getNameArray.length; j++) {
          if (getNameArray[j].selected) {
            let addition = {};
            let keyName = getNameArray[j].name;
            if (selectShowData === "challenge") {
              addition[keyName] =
                assignmentRatingAverage[i][keyName].difficultyRating;
            }
            if (selectShowData === "fun") {
              addition[keyName] =
                assignmentRatingAverage[i][keyName].enjoymentRating;
            }

            // addition[keyName] =
            //   assignmentRatingAverage[i][keyName].difficultyRating;
            Object.assign(addData, addition);
          }
        }
      }

      preShowDataSet.push(addData);
    }
  }

  let showData = [];
  if (NrSelectedNames === 0) {
    showData = [
      {
        id: 0,
        label: "difficultyRating",
        color: challengeColor,
      },
      {
        id: 1,
        label: "enjoymentRating",
        color: funColor,
      },
    ];
  } else {
    for (let i = 0; i < getNameArray.length; i++) {
      if (getNameArray[i].selected) {
        let addition = {
          id: getNameArray[i].id,
          label: getNameArray[i].name,
          color: getNameArray[i].indexColor,
        };
        showData.push(addition);
      }
    }
  }

  let dataInLineGraph = assignmentRatingAverage.map((dataSlice) => {
    return {
      id: dataSlice.id,
      average: dataSlice.average,
      assignment: dataSlice.assignment,
    };
  });

  dataInLineGraph = dataInLineGraph.sort(function (a, b) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    let A, B;
    switch (selectSortData) {
      case "challenge":
        A = a.average.difficultyRating;
        B = b.average.difficultyRating;
        break;
      case "fun":
        A = a.average.enjoymentRating;
        B = b.average.enjoymentRating;
        break;
      default:
        A = a.id;
        B = b.id;
    }
    if (A > B) {
      if (directionUp) {
        return 1;
      } else {
        return -1;
      }
    } else {
      if (directionUp) {
        return -1;
      } else {
        return 1;
      }
    }
  });

  if (dataInLineGraph.length > 0) {
    for (let i = 0; i < dataInLineGraph.length; i++) {
      const addItem = preShowDataSet.find((dataSlice) => {
        return dataSlice.id === dataInLineGraph[i].id;
      });
      showDataSet.push(addItem);
    }
  }

  if (assignmentRatingAverage.length === 0) {
    return (
      <div>
        <h4 className="center-align">Loading Data</h4>
      </div>
    );
  } else {
    return (
      <div className="chartData">
        <div className="barChart chartField ">
          <VictoryChart
            domainPadding={15}
            theme={wincTheme}
            scale={{ x: "linear" }}
            domain={{ y: [0, 5] }}
            containerComponent={
              <VictoryZoomContainer
                zoomDimension="x"
                zoomDomain={storedZoomDomain}
                minimumZoom={{ x: 1 }}
                onZoomDomainChange={(domain, props) =>
                  setZoomDomain(domain, props)
                }
              />
            }
          >
            <VictoryGroup
              offset={
                500 / nrOfBars / (storedZoomDomain.x[1] - storedZoomDomain.x[0])
              }
            >
              {showData.map((dataSlice) => (
                <VictoryBar
                  key={dataSlice.id}
                  labelComponent={<VictoryTooltip key={dataSlice.id} />}
                  data={showDataSet}
                  x="assignment"
                  y={dataSlice.label}
                  tickValues={[1, 2, 3, 4, 5]}
                  tickFormat={assignmentRatingAverage.map((avg) => avg.id)}
                  style={{
                    data: {
                      stroke: dataSlice.color.nr,
                      fill: dataSlice.color.nr,
                    },
                  }}
                />
              ))}
            </VictoryGroup>
          </VictoryChart>
        </div>

        <div className="row" id="average">
          <div className="col" key="challenge">
            <span className="assignmentRating">Assignment Difficulty</span>

            <span
              href="#"
              className={`btn ${challengeColor.description}`}
              style={{
                height: "20px",
                width: "20px",
              }}
              //          onClick={() => handleClick(itemName.id)}
              btn-value="challenge"
            />
          </div>
          <div className="col" key="fun">
            <span className="assignmentRating">Assignment Fun</span>
            <span
              href="#"
              className={`btn ${funColor.description}`}
              style={{
                height: "20px",
                width: "20px",
              }}
              //          onClick={() => handleClick(itemName.id)}
              btn-value="fun"
            />
          </div>
        </div>

        <AddNameLegend />

        <div className="row" id="show">
          <div className="col">
            <span className="showData">Show Data:</span>
            <label>
              <input
                className="with-gap"
                name="show"
                type="radio"
                checked={selectShowData === "challenge"}
                onChange={() => {
                  changeSelectShowData("challenge");
                }}
              />
              <span className="showData">Difficulty</span>
            </label>
            <label>
              <input
                className="with-gap"
                name="show"
                type="radio"
                checked={selectShowData === "fun"}
                onChange={() => {
                  changeSelectShowData("fun");
                }}
              />
              <span>Fun</span>
            </label>
          </div>
        </div>

        <div className="row" id="sort">
          <div className="col">
            <span className="sortData">Sort Average Data by:</span>
            <label>
              <input
                className="with-gap"
                name="sort"
                type="radio"
                checked={selectSortData === "entry"}
                onChange={() => {
                  changeSelectSortData("entry");
                }}
              />
              <span className="sortData1">Course Progression</span>
            </label>
            <label>
              <input
                className="with-gap"
                name="sort"
                type="radio"
                checked={selectSortData === "challenge"}
                onChange={() => {
                  changeSelectSortData("challenge");
                }}
              />
              <span className="sortData2">Difficulty Score</span>
            </label>
            <label>
              <input
                className="with-gap"
                name="sort"
                type="radio"
                checked={selectSortData === "fun"}
                onChange={() => {
                  changeSelectSortData("fun");
                }}
              />
              <span className="sortData3">Fun Score</span>
            </label>
            {/* <div className="input-field"> */}
            <span>
              <i
                className={
                  directionUp
                    ? "fa-solid fa-arrow-down-short-wide"
                    : "fa-solid fa-arrow-down-wide-short"
                }
                onClick={() => setDirection(!directionUp)}
              ></i>
            </span>
            {/* </div> */}
          </div>
        </div>

        {/* 
      
      
      lineplot 
         
      
      */}
        <div className="chartField">
          <VictoryChart
            domainPadding={15}
            theme={wincTheme}
            scale={{ x: "linear" }}
            containerComponent={
              <VictoryBrushContainer
                brushDimension="x"
                brushDomain={storedZoomDomain}
                onBrushDomainChange={(domain, props) =>
                  setZoomDomain(domain, props)
                }
              />
            }
          >
            <VictoryLine
              style={{
                data: { stroke: challengeColor.nr },
              }}
              data={dataInLineGraph}
              y="average.difficultyRating"
            />
            <VictoryLine
              style={{
                data: { stroke: funColor.nr },
              }}
              data={dataInLineGraph}
              y="average.enjoymentRating"
            />
            <VictoryAxis tickFormat={() => ""} />
            <VictoryAxis dependentAxis />
          </VictoryChart>
        </div>
      </div>
    );
  }
}
// export default FirstCharts;
