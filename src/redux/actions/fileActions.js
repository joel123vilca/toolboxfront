import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import FileController from "../controllers/fileController";

export const types = {
  GET_FILES: "GET_FILES",
  SET_FILES: "SET_FILES",
  GET_FILE: "GET_FILE",
  SET_DETAIL_FILE: "SET_DETAIL_FILE",
};

export const getFiles = createAsyncThunk(
  types.GET_FILES,
  async (_, { dispatch }) => {
    const response = await FileController.getFiles();
    dispatch(setFiles(response));
    return response;
  }
);

export const getFile = createAsyncThunk(
  types.GET_FILE,
  async ({ fileName }, { dispatch }) => {
    const response = await FileController.getFile(fileName);
    dispatch(setDetail(response));
    return response;
  }
);

export const setFiles = createAction(types.SET_FILES, (files) => ({
  payload: files,
}));

export const setDetail = createAction(types.SET_DETAIL_FILE, (detailFile) => ({
  payload: detailFile,
}));
