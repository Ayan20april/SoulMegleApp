// src/App.js
import React, { useState } from 'react';
import InterestForm from './components/InterestForm';
import MatchComponent from './components/MatchComponent';
import VideoChat from './components/VideoChat'; // Import Video Chat Component
import Chat from './components/Chat'; // Import Chat Component
import './App.css';

function App() {
  // State to store the current user's ID
  const [userId, setUserId] = useState(null);
  const [matched, setMatched] = useState(false); // State to track matching

  return (
    <div className="App">
      {!userId ? (
        // Pass setUserId to InterestForm so it can update the state upon successful registration
        <InterestForm setUserId={setUserId} />
      ) : !matched ? (
        // Once user is registered, show the matching component
        <MatchComponent userId={userId} setMatched={setMatched} />
      ) : (
        // After matching, show Video Chat and Chat components
        <div className="chat-container">
          <VideoChat userId={userId} />
          <Chat userId={userId} />
        </div>
      )}
    </div>
  );
}

export default App;
