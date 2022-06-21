import { configureStore } from "@reduxjs/toolkit";
import evaluationDataset from "./EvaluationDataset";

export default configureStore({
  reducer: {
    evaluationDataset,
  },
});
