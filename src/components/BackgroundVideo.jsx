import { useState, useEffect } from "react";
import "./BackgroundVideo.css";
import { useNavigate } from "react-router-dom";

const videoList = [
  "/videos/cycling.mp4",  
  "/videos/dumbbells girl red hair.mp4",
  "/videos/exercise on a bench.mp4",
  "/videos/jump squats on stairs.mp4",
  "/videos/jump.mp4",
  "/videos/pinguins for abs.mp4",
  "/videos/push ups.mp4",
  "/videos/running in the sun.mp4",
  "/videos/running next to lake.mp4"
  
];

const BackgroundVideo = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const navigate = useNavigate(); // React Router's navigation hook

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoList.length); // מחליף בין הסרטונים בצורה סיבובית
    }, 5000); // כל 5 שניות

    return () => clearInterval(interval);
  }, []);

  const handleNavigateToWorkoutForm = () => {
    console.log("Button clicked! Navigating to /workout-form...");
    navigate("/workout-form"); // Navigate to the WorkoutForm page
  };

  return (
    <div className="video-background">
      <div className="app-title">
        <h1 className="app-name">STRIVE</h1>
        <h2 className="app-tagline">No Limits</h2>
      </div>
      <video
        src={videoList[currentVideoIndex]}
        autoPlay
        muted
        loop
        playsInline
        className="background-video"
      />
      <button className="bottom-button" onClick={handleNavigateToWorkoutForm}>
        Create Your Own Personalized Workout
      </button>
    </div>
  );
};

export default BackgroundVideo;