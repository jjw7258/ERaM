import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import AuthForm from "./test/AuthForm";
import ModifyProfileForm from "./test/ModifyProfileForm";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/auth" element={<AuthForm />} />
            <Route path="/modify" element={<ModifyProfileForm />} />
            <Route
              path="/"
              element={
                <p>
                  Edit <code>src/App.tsx</code> and save to reload.
                </p>
              }
            />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
