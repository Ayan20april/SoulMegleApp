// src/App.js
import React, { useState } from 'react';
import InterestForm from './components/InterestForm';
import MatchComponent from './components/MatchComponent';
import './App.css';

function App() {
  // State to store the current user's ID
  const [userId, setUserId] = useState(null);

  return (
    <div className="App">
      {!userId ? (
        // Pass setUserId to InterestForm so it can update the state upon successful registration
        <InterestForm setUserId={setUserId} />
      ) : (
        // Once user is registered, show the matching component
        <MatchComponent userId={userId} />
      )}
    </div>
  );
}

export default App;
