// src/components/InterestForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import API_BASE_URL from "../config";

const InterestForm = ({ setUserId }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [hobbies, setHobbies] = useState("");
  const navigate = useNavigate(); // Use navigate for redirection

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { name, age, gender, hobbies };

    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("User added:", data);

      if (data.id) {
        setUserId(data.id);
        alert("User registered successfully!");
        navigate("/video-chat"); // Redirect to video chat page
      } else {
        alert("Failed to register. Please try again.");
      }
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

      <label>Age:</label>
      <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />

      <label>Gender:</label>
      <select value={gender} onChange={(e) => setGender(e.target.value)} required>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <label>Hobbies:</label>
      <input type="text" value={hobbies} onChange={(e) => setHobbies(e.target.value)} required />

      <button type="submit">Save & Continue</button>
    </form>
  );
};

export default InterestForm;
