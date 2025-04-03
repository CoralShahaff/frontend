import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BackgroundVideo from "./components/BackgroundVideo";
import WorkoutForm from "./WorkoutForm";
import WorkoutPlan from "./Workoutplan"; // Import the WorkoutPlan component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the BackgroundVideo page */}
          <Route path="/" element={<BackgroundVideo />} />
          {/* Route for the WorkoutForm page */}
          <Route path="/workout-form" element={<WorkoutForm />} />
          {/* Route for the WorkoutPlan page */}
          <Route path="/workout-plan" element={<WorkoutPlan />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;