import React from "react";
import { useLocation } from "react-router-dom";
import "./Workoutplan.css"; // Import the CSS file for styling

const WorkoutPlan = () => {
  const location = useLocation();
  const workoutPlan = location.state?.workoutPlan; // Access the workout plan data

  console.log("Workout Plan Data:", workoutPlan); // Debugging: Log the workout plan data

  if (!workoutPlan) {
    return <p>Loading workout plan...</p>; // Show a loading message if no data is available
  }

  // Separate sections into pre-days, days, and post-days
  const preDaysSections = {};
  const postDaysSections = {};
  const days = workoutPlan.days || [];
  let foundDaysKey = false; // Flag to track when we encounter the "days" key

  Object.entries(workoutPlan).forEach(([key, value]) => {
    if (key === "days") {
      foundDaysKey = true; // Mark that we've encountered the "days" key
      return; // Skip "days" for now
    }
    if (!value) return; // Skip empty or null values

    // Always categorize "introduction" as a pre-days section
    if (key.toLowerCase() === "introduction") {
      preDaysSections[key] = value;
      return;
    }

    // Dynamically determine if the section comes before or after "days"
    if (!foundDaysKey) {
      preDaysSections[key] = value; // Add to pre-days if we haven't encountered "days" yet
    } else {
      postDaysSections[key] = value; // Add to post-days if we have already encountered "days"
    }
  });

  return (
    <div className="workout-plan-page">
      <h1 className="workout-plan-title">Your Personalized Workout Plan</h1>
      <div className="workout-plan-content">
        {/* Always Render Formatted Workout Plan */}
        <h2>Formatted Workout Plan</h2>

        {/* Render Pre-Days Sections */}
        {Object.entries(preDaysSections).map(([key, value]) => {
          const title = key
            .replace(/_/g, " ") // Replace underscores with spaces
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word

          return (
            <div key={key} className={`${key}-section`}>
              <h2>{title}</h2>
              {Array.isArray(value) ? (
                <ul>
                  {value.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{value}</p>
              )}
            </div>
          );
        })}

        {/* Render Days */}
        {days.map((day, index) => (
          <div key={index} className="workout-day">
            <h2>{day.day}</h2>
            <div className="warm-up-section">
              <h3>Warm-up</h3>
              <p>{day.warm_up || "No warm-up information provided."}</p>
            </div>
            <div className="workout-section">
              <h3>Workout Exercises</h3>
              <p>{day.workout_exercises || "No workout exercises provided."}</p>
            </div>
            <div className="cool-down-section">
              <h3>Cool-down</h3>
              <p>{day.cool_down || "No cool-down information provided."}</p>
            </div>
          </div>
        ))}

        {/* Render Post-Days Sections */}
        {Object.entries(postDaysSections).map(([key, value]) => {
          const title = key
            .replace(/_/g, " ") // Replace underscores with spaces
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word

          return (
            <div key={key} className={`${key}-section`}>
              <h2>{title}</h2>
              {Array.isArray(value) ? (
                <ul>
                  {value.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{value}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkoutPlan;