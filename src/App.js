import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BackgroundVideo from "./components/BackgroundVideo";
import WorkoutForm from "./WorkoutForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the BackgroundVideo page */}
          <Route path="/" element={<BackgroundVideo />} />
          {/* Route for the WorkoutForm page */}
          <Route path="/workout-form" element={<WorkoutForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;