import React, { useState } from "react";
import API_BASE_URL from "../config";

const MatchComponent = ({ userId }) => {
  const [match, setMatch] = useState(null);

  const findMatch = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/match/${userId}`);
      const data = await response.json();
      setMatch(data);
    } catch (error) {
      console.error("Error finding match:", error);
    }
  };

  return (
    <div>
      <button onClick={findMatch}>Find a Match</button>
      {match && (
        <div>
          <h3>Matched With:</h3>
          <p>Name: {match.name}</p>
          <p>Age: {match.age}</p>
          <p>Gender: {match.gender}</p>
          <p>Hobbies: {match.hobbies}</p>
        </div>
      )}
    </div>
  );
};

export default MatchComponent;
