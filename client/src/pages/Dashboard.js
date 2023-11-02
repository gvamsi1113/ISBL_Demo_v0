import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
function Dashboard() {
  const [user, setUser] = useState({ id: null, username: "", role: 0});

  useEffect(() => {

      axios.get("http://localhost:3001/auth/dashboard", { withCredentials: true })
      .then((response) => {
        console.log(response.data)
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className="dashboardContainer">
      <h2>Dashboard</h2>
      <p>
        ID: {user.id}
      </p>
      <p>
        Username: {user.username}
      </p>
      <p>
        His Role: {user.role}
      </p>
    </div>
  );
}

export default Dashboard;
