import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as fileActions from "../redux/actions/fileActions";
import { useDispatch, useSelector } from "react-redux";
import { detailFileSelector } from "../redux/selector/fileSelector";

const FileDetailCard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fileName = queryParams.get("fileName");

  const fileDetail = useSelector(detailFileSelector);

  useEffect(() => {
    dispatch(fileActions.getFile({ fileName: fileName }));
  }, [dispatch, fileName]);

  if (!fileDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{fileDetail.file}</h5>
        <ul className="list-group list-group-flush">
          {fileDetail?.lines.map((line, index) => (
            <li className="list-group-item" key={index}>
              Text: {line.text}, Number: {line.number}, Hex: {line.hex}
            </li>
          ))}
        </ul>
        <button className="btn btn-primary mt-3">Download CSV</button>
      </div>
    </div>
  );
};

export default FileDetailCard;
