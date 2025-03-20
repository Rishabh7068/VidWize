import { React } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import Recommendation from "./component/Recommendation";
import Editor from "./component/Editor";
import Creator from "./component/Creator";
import Signup from "./component/Signup";
import Login from "./component/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route
          exact
          path="/signup"
          element={
            <>
              <Signup/>
            </>
          }
        />
        <Route
          exact
          path="/login"
          element={
            <>
              <Login/>
            </>
          }
        />

        <Route
          exact
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          exact
          path="/recommendation"
          element={
            <>
              <Recommendation />
            </>
          }
        />
        <Route
          exact
          path="/editor"
          element={
            <>
              <Editor />
            </>
          }
        />
        <Route
          exact
          path="/creator"
          element={
            <>
              <Creator />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
