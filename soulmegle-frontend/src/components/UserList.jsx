import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/users`) // Calls the backend
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.age} - {user.gender}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
