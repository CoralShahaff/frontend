import React from "react";
import { useLocation } from "react-router-dom";
import "./Workoutplan.css"; // Import the CSS file for styling

const WorkoutPlan = () => {
  const location = useLocation();
  const workoutPlan = location.state?.workoutPlan; // Access the workout plan data

  if (!workoutPlan) {
    return <p>Loading workout plan...</p>; // Show a loading message if no data is available
  }

  return (
    <div className="workout-plan-page">
      <h1 className="workout-plan-title">Your Personalized Workout Plan</h1>
      <div className="workout-plan-content">
        {Object.keys(workoutPlan).map((day) => (
          <div key={day} className="workout-day">
            <h2>{day.replace("_", " ").toUpperCase()}</h2>
            <ul>
              {workoutPlan[day].details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlan;