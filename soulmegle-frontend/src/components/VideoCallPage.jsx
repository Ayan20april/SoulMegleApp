// src/components/VideoCallPage.jsx
import React from "react";

const VideoCallPage = ({ userId }) => {
  return (
    <div>
      <h2>Live Video Chat</h2>
      <p>Welcome, user {userId}!</p>
      {/* Video call & chat components go here */}
    </div>
  );
};

export default VideoCallPage;
