import React, { useEffect, useState, useRef } from "react";
import * as fileActions from "../redux/actions/fileActions";
import { useDispatch, useSelector } from "react-redux";
import { filesSelector } from "../redux/selector/fileSelector";
import { Link } from "react-router-dom";

const FileList = () => {
  const dispatch = useDispatch();
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const files = useSelector(filesSelector);

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (!isInitialRender.current) {
      setFilteredFiles(files);
    } else {
      isInitialRender.current = false;
    }
  }, [files]);

  useEffect(() => {
    dispatch(fileActions.getFiles());
  }, [dispatch]);

  const downloadCsv = (text, filename) => {
    const blob = new Blob([text], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const searchFile = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    const data = files.filter(
      (file) =>
        searchTerm.length >= 3 &&
        file.file.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredFiles(data);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">File List</h1>
      <div className="mb-3">
        <label htmlFor="searchInput" className="form-label">
          Search by Name:
        </label>
        <input
          type="text"
          id="searchInput"
          className="form-control"
          placeholder="Enter file name"
          value={searchTerm}
          onChange={(e) => searchFile(e)}
        />
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
            <th>Download CSV</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {filteredFiles.map((file) => (
            <React.Fragment key={file.file}>
              <tr>
                <td>{file.file}</td>
                <td>{file.lines[0].text}</td>
                <td>{file.lines[0].number}</td>
                <td>{file.lines[0].hex}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      downloadCsv(
                        file.lines
                          .map(
                            (line) => `${line.text},${line.number},${line.hex}`
                          )
                          .join("\n"),
                        `${file.file}.csv`
                      )
                    }
                  >
                    Download
                  </button>
                </td>
                <td>
                  <Link
                    to={`/detail?fileName=${file.file}`}
                    className="btn btn-info"
                  >
                    View Detail
                  </Link>
                </td>
              </tr>
              {file.lines.slice(1).map((line, index) => (
                <tr key={index}>
                  <td>{file.file}</td>
                  <td>{line.text}</td>
                  <td>{line.number}</td>
                  <td>{line.hex}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        downloadCsv(
                          `${line.text},${line.number},${line.hex}`,
                          `${file.file}_${index + 1}.csv`
                        )
                      }
                    >
                      Download
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/detail?fileName=${file.file}`}
                      className="btn btn-info"
                    >
                      View Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;
