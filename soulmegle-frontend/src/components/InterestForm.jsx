// src/components/InterestForm.jsx
import React, { useState } from "react";
import API_BASE_URL from "../config";
import "./InterestForm.css";

const InterestForm = ({ setUserId }) => {
  const [formData, setFormData] = useState({ name: "", age: "", gender: "", hobbies: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("User added:", data);
      alert("User registered successfully!");
      setUserId(data.id);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Tell Us About Yourself</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Age</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />

        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label>Hobbies</label>
        <input type="text" name="hobbies" placeholder="e.g., reading, gaming, coding" value={formData.hobbies} onChange={handleChange} required />

        <button type="submit" className="submit-button">Save & Continue</button>
      </form>
    </div>
  );
};

export default InterestForm;
