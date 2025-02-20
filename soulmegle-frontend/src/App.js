// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import InterestForm from "./components/InterestForm";
import VideoCallPage from "./components/VideoCallPage";
import "./App.css";

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<InterestForm setUserId={setUserId} />} />
        {/* Navigate to video call page after successful registration */}
        <Route path="/video-chat" element={userId ? <VideoCallPage userId={userId} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
