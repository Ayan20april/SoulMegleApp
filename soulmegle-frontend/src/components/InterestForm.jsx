// src/components/InterestForm.jsx
import React, { useState } from 'react';
import './InterestForm.css';

const InterestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    hobbies: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container">
      <h2 className="form-heading">Tell Us About Yourself</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            id="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="hobbies">Hobbies</label>
          <input
            type="text"
            name="hobbies"
            id="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            placeholder="e.g., reading, gaming, coding"
          />
        </div>
        <button type="submit" className="button">
          Save &amp; Continue
        </button>
      </form>
    </div>
  );
};

export default InterestForm;
