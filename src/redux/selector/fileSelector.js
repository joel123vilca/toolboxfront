import { createSelector } from "@reduxjs/toolkit";

export const fileStateSelector = createSelector(
  (state) => state.files,
  (files) => files
);

export const filesSelector = createSelector(
  fileStateSelector,
  (state) => state.files
);

export const detailFileSelector = createSelector(
  fileStateSelector,
  (state) => state.detailFile
);
