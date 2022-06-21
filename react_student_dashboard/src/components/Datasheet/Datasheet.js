import React from "react";
import { useSelector } from "react-redux";

import "./datasheet.css";
import {
  ConditionalFormatDirective,
  RangeDirective,
  RangesDirective,
  SheetDirective,
  SheetsDirective,
  SpreadsheetComponent,
  ColumnDirective,
  ColumnsDirective,
  ConditionalFormatsDirective,
} from "@syncfusion/ej2-react-spreadsheet";
// https://youtu.be/3Cx9AnKAHdY
//Getting Started with the React Spreadsheet Component

export default function Datasheet() {
  const getNameArray = useSelector(
    (state) => state.evaluationDataset.nameArray
  );
  const getProjectArray = useSelector(
    (state) => state.evaluationDataset.projectArray
  );
  const getEvaluationArray = useSelector(
    (state) => state.evaluationDataset.evaluationArray
  );
  let style = { textAlign: "left", textIndent: "8pt" };

  if (getEvaluationArray.length === 0) {
    return (
      <div className="container">
        <div className="logo">
          <label aria-current="page" className="logo-block ">
            <img
              src="https://global-uploads.webflow.com/5ee34869dd28cd4237e2a5f2/5f030fe26dc9fc19df8dc16a_Winc-logo-objects.svg"
              alt="Logo of Winc Academy"
              className="navigation-logo"
            />
            <div className="navigation-logo-text">
              WINC&nbsp;
              <span className="navigation-logo-text-normal">Academy</span>
            </div>
            <div>
              <span className="TitleText">Student Dashboard</span>
            </div>
          </label>
        </div>

        <h4 className="center-align">Loading Data</h4>
      </div>
    );
  } else {
    let challengeData = [];
    let funData = [];
    let studentData = [];

    for (let i = 0; i < getProjectArray.length; i++) {
      let addChallengeData = { "": getProjectArray[i] };
      let addFunData = { "": getProjectArray[i] };

      for (let j = 0; j < getNameArray.length; j++) {
        let addition = {};
        let keyName = getNameArray[j].name;
        addition[keyName] = getEvaluationArray[j][i].challenge;
        Object.assign(addChallengeData, addition);
        addition = {};
        addition[keyName] = getEvaluationArray[j][i].fun;
        Object.assign(addFunData, addition);
      }
      challengeData.push(addChallengeData);
      funData.push(addFunData);
    }

    getNameArray.forEach((dataSlice) => {
      studentData.push({
        "First name": dataSlice.name,
        "Last name": dataSlice.lastName,
        Age: dataSlice.age,
        "Phone number": dataSlice.phoneNumber,
        Email: dataSlice.email,
        "Photo (URL)": dataSlice.url,
      });
    });

    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    function printToLetter(number) {
      //      https://stackoverflow.com/questions/36129721/convert-number-to-alphabet-letter
      let charIndex = number % alphabet.length;
      let quotient = number / alphabet.length;
      if (charIndex - 1 === -1) {
        charIndex = alphabet.length;
        quotient--;
      }
      result = alphabet.charAt(charIndex - 1) + result;
      if (quotient >= 1) {
        printToLetter(parseInt(quotient));
      } else {
        return result;
      }
    }
    return (
      <div className="container">
        <div className="logo">
          <label aria-current="page" className="logo-block ">
            <img
              src="https://global-uploads.webflow.com/5ee34869dd28cd4237e2a5f2/5f030fe26dc9fc19df8dc16a_Winc-logo-objects.svg"
              alt="Logo of Winc Academy"
              className="navigation-logo"
            />
            <div className="navigation-logo-text">
              WINC&nbsp;
              <span className="navigation-logo-text-normal">Academy</span>
            </div>
            <div>
              <span className="TitleText">Student Dashboard</span>
            </div>
          </label>
        </div>

        <SpreadsheetComponent
          allowConditionalFormat={true}
          allowCellFormatting={true}
          allowOpen={true}
          allowSave={true}
          // height={"1400px"}
        >
          <SheetsDirective>
            <SheetDirective name="Assignment Difficulty">
              <RangesDirective>
                <RangeDirective
                  dataSource={challengeData}
                  style={style}
                ></RangeDirective>
              </RangesDirective>
              <ConditionalFormatsDirective>
                <ConditionalFormatDirective
                  type="GYRColorScale"
                  range={
                    "a2:" +
                    printToLetter(getNameArray.length + 1) +
                    (getProjectArray.length + 1)
                  }
                  // https://ej2.syncfusion.com/react/documentation/spreadsheet/formatting/#borders
                ></ConditionalFormatDirective>
              </ConditionalFormatsDirective>
            </SheetDirective>
            <SheetDirective name="Assignment Fun">
              <RangesDirective>
                <RangeDirective dataSource={funData}></RangeDirective>
              </RangesDirective>
              <ConditionalFormatsDirective>
                <ConditionalFormatDirective
                  type="GYRColorScale"
                  range={
                    "a2:" +
                    printToLetter(getNameArray.length + 1) +
                    (getProjectArray.length + 1)
                  }
                ></ConditionalFormatDirective>
              </ConditionalFormatsDirective>
            </SheetDirective>
            <SheetDirective name="Student Data">
              <RangesDirective>
                <RangeDirective dataSource={studentData}></RangeDirective>
              </RangesDirective>
              <ColumnsDirective>
                <ColumnDirective width={80}></ColumnDirective>
                <ColumnDirective width={100}></ColumnDirective>
                <ColumnDirective width={40}></ColumnDirective>
                <ColumnDirective width={100}></ColumnDirective>
                <ColumnDirective width={180}></ColumnDirective>
                <ColumnDirective width={220}></ColumnDirective>
              </ColumnsDirective>
            </SheetDirective>
          </SheetsDirective>
        </SpreadsheetComponent>
      </div>
    );
  }
}
