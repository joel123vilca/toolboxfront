import { createReducer } from "@reduxjs/toolkit";
import * as fileActions from "../actions/fileActions";

const initialState = {
  files: [],
  detailFile: null,
};

const FileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fileActions.setFiles, (state, { payload }) => ({
      ...state,
      files: payload,
    }))
    .addCase(fileActions.setDetail, (state, { payload }) => ({
      ...state,
      detailFile: payload,
    }));
});

export default FileReducer;
