import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilesContainer from "./containers/filesContainer";
import DetailContainer from "./containers/detailContainer";
import Header from "./components/header";
import { Provider } from "react-redux";
import { store } from "./redux";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<FilesContainer />} />
          <Route path="/detail" element={<DetailContainer />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
