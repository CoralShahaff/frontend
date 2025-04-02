import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const WorkoutForm = () => {
  const [userInput, setUserInput] = useState({
    user_id: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    fitness_level: "",
    goal: "",
    workout_area: "",
    Desired_number_of_training_days: 3,
    experience: "",
    workout_area: "",
    training_days: [],
  });

  const [errors, setErrors] = useState({}); // State to track errors
  const navigate = useNavigate(); // React Router's navigation hook

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserInput({ ...userInput, [name]: type === 'checkbox' ? checked : value });
    setErrors({ ...errors, [name]: false }); // Clear error for the field being updated
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    const newErrors = {};
    if (!userInput.user_id.trim()) newErrors.user_id = true;
    if (!userInput.age.trim()) newErrors.age = true;
    if (!userInput.gender || userInput.gender === "Choose your gender") newErrors.gender = true;
    if (!userInput.height.trim()) newErrors.height = true;
    if (!userInput.weight.trim()) newErrors.weight = true;
    if (!userInput.fitness_level || userInput.fitness_level === "Choose your fitness level") newErrors.fitness_level = true;
    if (!userInput.goal || userInput.goal === "Choose your goal level") newErrors.goal = true;
    if (!userInput.workout_area || userInput.workout_area === "") newErrors.workout_area = true;
    if (!userInput.Desired_number_of_training_days || userInput.Desired_number_of_training_days < 3) newErrors.Desired_number_of_training_days = true;
    if (!userInput.experience.trim()) newErrors.experience = true;

    // If there are errors, highlight the fields and stop submission
    if (Object.keys(newErrors).length > 0) {
      console.log("Validation errors:", newErrors); //Debugging
      setErrors(newErrors);
      return;
    }
    
    // Prepare the request body
  const requestBody = {
    ...userInput,
    workout_days: userInput.Desired_number_of_training_days, // Map Desired_number_of_training_days to workout_days
  };
  
  console.log("Request Body:", requestBody); // Debugging

    // If no errors, proceed with form submission
    try {
      const response = await fetch('http://localhost:8000/generate_workout_plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInput),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get error details from the backend
        console.error("Backend Error:", errorText); // Debugging
        throw new Error("Failed to fetch workout plan");
      }

      const data = await response.json();
      console.log("API Response:", data); // Debugging

      // Navigate to the workout plan page with the generated plan
      navigate("/workout-plan", { state: { workoutPlan: data } });
      console.log("Navigating to /workout-plan with data:", data); // Debugging
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate workout plan. Please try again.");
    }
  };

  const handleReturnToHome = () => {
    const videoBackground = document.querySelector(".video-background");
    if (videoBackground) {
      videoBackground.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("Element with class 'video-background' not found.");
    }
  };

  return (
    <div className="workout-page">
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        fontFamily: "'Roboto', sans-serif",
        padding: '0px',
        margin: '0',
        width: '100vw',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#3134ff', fontSize: '2.5rem', fontWeight: 'bold' }}>
        Smart Workout Plan Generator
      </h1>
      <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#4CAF50', fontSize: '1.5rem' }}>
        Create Your Personalized Workout Plan
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '800px',
          backgroundColor: '#ffffff',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          boxSizing: 'border-box',
        }}
      >
        {/* Two Columns */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {/* Left Column */}
          <div style={{ flex: 1, marginRight: '20px' }}>
            {/* User ID */}
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="user_id" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                User ID
              </label>
              <input
                type="text"
                id="user_id"
                name="user_id"
                value={userInput.user_id}
                onChange={handleChange}
                placeholder="Enter your user ID"
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  border: errors.user_id ? '2px solid red' : '1px solid #ccc',
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9',
                }}
              />
            </div>

{/* Equipment */}
<div style={{ marginBottom: '20px' }}>
  <label htmlFor="Equipment" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
    Equipment
  </label>
  <select
    id="Equipment"
    name="Equipment"
    value={userInput.Equipment}
    onChange={handleChange}
    style={{
      width: '100%',
      padding: '8px',
      fontSize: '16px',
      borderRadius: '5px',
      border: errors.Equipment ? '2px solid red' : '1px solid #ccc',
      cursor: 'pointer',
      textAlign: 'center',
      backgroundColor: '#f9f9f9',
    }}
  >
    <option value="">Choose your equipment</option>
    <option value="Gym_Equipment">Gym Equipment</option>
    <option value="resistance_bands">Resistance Bands</option>
    <option value="Bench">Bench</option>
    <option value="bodyweight_only">Bodyweight Only</option>
    <option value="No_equipment">No equipment</option>
  </select>
</div>

            {/* Age */}
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="age" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={userInput.age}
                onChange={handleChange}
                placeholder="Enter your age"
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  border: errors.age ? '2px solid red' : '1px solid #ccc',
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9',
                }}
              />
            </div>

            {/* Gender */}
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="gender" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={userInput.gender}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  border: errors.gender ? '2px solid red' : '1px solid #ccc',
                  cursor: 'pointer',
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <option value="Choose your gender">Choose your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Height */}
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="height" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                Height (cm)
              </label>
              <input
                type="number"
                id="height"
                name="height"
                value={userInput.height}
                onChange={handleChange}
                placeholder="Enter your height in cm"
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  border: errors.height ? '2px solid red' : '1px solid #ccc',
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9',
                }}
              />
            </div>

            {/* Weight */}
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="weight" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={userInput.weight}
                onChange={handleChange}
                placeholder="Enter your weight in kg"
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  border: errors.weight ? '2px solid red' : '1px solid #ccc',
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9',
                }}
              />
            </div>
          </div>

          {/* Right Column */}
          <div style={{ flex: 1, marginLeft: '20px' }}>
            {/* Fitness Level */}
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="fitness_level" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                Fitness Level
              </label>
              <select
                id="fitness_level"
                name="fitness_level"
                value={userInput.fitness_level}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  border: errors.fitness_level ? '2px solid red' : '1px solid #ccc',
                  cursor: 'pointer',
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <option value="Choose your fitness level">Choose your fitness level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Goal */}
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="goal" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                Goal
              </label>
              <select
                id="goal"
                name="goal"
                value={userInput.goal}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  border: errors.goal ? '2px solid red' : '1px solid #ccc',
                  cursor: 'pointer',
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <option value="Choose your goal level">Choose your goal level</option>
                <option value="strength">💪 Strength</option>
                <option value="endurance">🏃 Endurance</option>
                <option value="weight_loss">🔥 Weight Loss</option>
                <option value="flexibility">🧘 Flexibility</option>
                <option value="muscle_gain">🏋️ Muscle Gain</option>
              </select>
            </div>

            {/* Workout Area */}
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="workout_area" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                Workout Area
              </label>
              <select
                id="workout_area"
                name="workout_area"
                value={userInput.workout_area}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  border: errors.workout_area ? '2px solid red' : '1px solid #ccc',
                  cursor: 'pointer',
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <option value="">Choose your workout area</option>
                <option value="at_home">At home</option>
                <option value="at_gym">At gym</option>
                <option value="outside">Outside</option>
              </select>
            </div>

            {/* Desired Number of Training Days */}
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="Desired_number_of_training_days" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                Desired number of training days
              </label>
              <input
                type="number"
                id="Desired_number_of_training_days"
                name="Desired_number_of_training_days"
                value={userInput.Desired_number_of_training_days}
                onChange={handleChange}
                min="3"
                max="7"
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  border: errors.Desired_number_of_training_days ? '2px solid red' : '1px solid #ccc',
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9',
                }}
              />
            </div>

            {/* Experience */}
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="experience" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                Experience (e.g. 2 years)
              </label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={userInput.experience}
                onChange={handleChange}
                placeholder="Enter your workout experience"
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  border: errors.experience ? '2px solid red' : '1px solid #ccc',
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9',
                }}
              />
            </div>
          </div>
        </div>

        {/* "Let's Go!" Button */}
        <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
          <button
            type="submit"
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '15px 32px',
              fontSize: '16px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'background-color 0.3s, transform 0.3s',
              boxSizing: 'border-box',
              width: '150px',
              height: '50px',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#3134ff';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#4CAF50';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Let's Go!
          </button>
        </div>
      </form>

      <button
        type="button"
        onClick={handleReturnToHome}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          padding: '20px 32px',
          fontSize: '20px',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          textAlign: 'center',
          transition: 'background-color 0.3s, transform 0.3s',
          width: '90%',
          marginTop: '20px',
          marginBottom: '20px',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
          e.target.style.transform = 'scale(1)';
        }}
      >
        Return to Home Page
      </button>
    </div>
    </div>
  );
};

export default WorkoutForm;