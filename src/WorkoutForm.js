import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './WorkoutForm.css'; // Import the CSS file

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
    equipment: [], // Updated field for equipment
    
  });

  const [errors, setErrors] = useState({}); // State to track errors
  const navigate = useNavigate(); // React Router's navigation hook

  const equipmentOptions = [
    "Access to a gym",
    "Free weights (dumbbells, kettlebells)",
    "Resistance bands",
    "Jump rope",
    "Yoga / Pilates Mat",
    "Spinning bike / Exercise bike",
    "TRX / training straps",
    "Ab Roller",
    "Plyo Box",
    "Medicine Ball",
    "Voltage / Parallels",
    "No equipment",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserInput({ ...userInput, [name]: type === 'checkbox' ? checked : value });
    setErrors({ ...errors, [name]: false }); // Clear error for the field being updated
  };

  const handleEquipmentSelect = (equipment) => {
    if (!userInput.equipment.includes(equipment)) {
      setUserInput((prev) => ({
        ...prev,
        equipment: [...prev.equipment, equipment],
      }));
    }
  };
  

  const handleEquipmentRemove = (equipment) => {
    setUserInput((prev) => ({
      ...prev,
      equipment: prev.equipment.filter((item) => item !== equipment),
    }));
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
  
    // If there are errors, highlight the fields and stop submission
    if (Object.keys(newErrors).length > 0) {
      console.log("Validation errors:", newErrors); // Debugging
      setErrors(newErrors);
      return;
    }
  
    // Navigate to the WorkoutPlan page
    navigate("/workout-plan");
  };

  const handleReturnToHome = () => {
    navigate("/"); // Navigate to the BackgroundVideo page
  };

  return (
    <div className="workout-page">
      <div className="workout-container">
        <h1 className="workout-title">Smart Workout Plan Generator</h1>
        <h2 className="workout-subtitle">Create Your Personalized Workout Plan</h2>
        <form onSubmit={handleSubmit} className="workout-form">
        <div className="form-columns">
  <div className="form-column">
    {/* Left Column */}
    <div className="form-group">
      <label htmlFor="user_id">User ID</label>
      <input
        type="text"
        id="user_id"
        name="user_id"
        value={userInput.user_id}
        onChange={handleChange}
        placeholder="Enter your user ID"
        className={errors.user_id ? "error" : ""}
      />
    </div>
    <div className="form-group">
      <label htmlFor="age">Age</label>
      <input
        type="number"
        id="age"
        name="age"
        value={userInput.age}
        onChange={handleChange}
        placeholder="Enter your age"
        className={errors.age ? "error" : ""}
      />
    </div>
    <div className="form-group">
      <label htmlFor="gender">Gender</label>
      <select
        id="gender"
        name="gender"
        value={userInput.gender}
        onChange={handleChange}
        className={errors.gender ? "error" : ""}
      >
        <option value="Choose your gender">Choose your gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="height">Height (cm)</label>
      <input
        type="number"
        id="height"
        name="height"
        value={userInput.height}
        onChange={handleChange}
        placeholder="Enter your height in cm"
        className={errors.height ? "error" : ""}
      />
    </div>
    <div className="form-group">
      <label htmlFor="fitness_level">Fitness Level</label>
      <select
        id="fitness_level"
        name="fitness_level"
        value={userInput.fitness_level}
        onChange={handleChange}
        className={errors.fitness_level ? "error" : ""}
      >
        <option value="Choose your fitness level">Choose your fitness level</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
    </div>
  </div>
  <div className="form-column">
    {/* Right Column */}
    <div className="form-group">
      <label htmlFor="goal">Goal</label>
      <select
        id="goal"
        name="goal"
        value={userInput.goal}
        onChange={handleChange}
        className={errors.goal ? "error" : ""}
      >
        <option value="Choose your goal level">Choose your goal level</option>
        <option value="strength">Strength</option>
        <option value="endurance">Endurance</option>
        <option value="weight_loss">Weight Loss</option>
        <option value="flexibility">Flexibility</option>
        <option value="muscle_gain">Muscle Gain</option>
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="workout_area">Workout Area</label>
      <select
        id="workout_area"
        name="workout_area"
        value={userInput.workout_area}
        onChange={handleChange}
        className={errors.workout_area ? "error" : ""}
      >
        <option value="">Choose your workout area</option>
        <option value="at_home">At home</option>
        <option value="at_gym">At gym</option>
        <option value="outside">Outside</option>
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="Desired_number_of_training_days">Desired number of training days</label>
      <input
        type="number"
        id="Desired_number_of_training_days"
        name="Desired_number_of_training_days"
        value={userInput.Desired_number_of_training_days}
        onChange={handleChange}
        min="3"
        max="7"
        className={errors.Desired_number_of_training_days ? "error" : ""}
      />
    </div>
    <div className="form-group">
      <label htmlFor="equipment">Equipment</label>
      <div className="equipment-options">
        {equipmentOptions.map((equipment) => (
          <button
            type="button"
            key={equipment}
            className="equipment-option"
            onClick={() => handleEquipmentSelect(equipment)}
          >
            {equipment}
          </button>
        ))}
      </div>
      <div className="selected-equipment">
        {userInput.equipment.map((item) => (
          <div key={item} className="selected-equipment-item">
            {item}
            <button
              type="button"
              className="remove-equipment"
              onClick={() => handleEquipmentRemove(item)}
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
          <div className="form-actions">
            <button type="submit" className="submit-button">Let's Go!</button>
          </div>
        </form>
        <button type="button" onClick={handleReturnToHome} className="return-button">
          Return to Home Page
        </button>
      </div>
    </div>
  );
};

export default WorkoutForm;