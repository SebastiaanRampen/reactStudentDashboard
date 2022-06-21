import { createSlice } from "@reduxjs/toolkit";

export const evaluationDatasetSlice = createSlice({
  name: "evaluationDataset",
  initialState: {
    dataset: [],
    nameArray: [],
    projectArray: [],
    evaluationArray: [],
    dataReceived: false,
  },

  reducers: {
    addEvaluationDataset: (state, dataset) => {
      state.dataset = dataset.payload;
    },

    addNameArray: (state, dataset) => {
      state.nameArray = dataset.payload;
    },
    modifyNameArray: (state, index) => {
      const prevState = [...state.nameArray];
      prevState[index.payload].selected =
        !state.nameArray[index.payload].selected;
      state.nameArray = prevState;
    },

    addProjectArray: (state, dataset) => {
      state.projectArray = dataset.payload;
    },
    addEvaluationArray: (state, dataset) => {
      state.evaluationArray = dataset.payload;
    },
    reportDataReceived: (state) => {
      state.dataReceived = true;
    },
  },
});

export const {
  addEvaluationDataset,
  addNameArray,
  modifyNameArray,
  addProjectArray,
  addEvaluationArray,
  reportDataReceived,
} = evaluationDatasetSlice.actions;

export default evaluationDatasetSlice.reducer;
