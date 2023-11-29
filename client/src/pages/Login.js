import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Add an error state

  const history = useHistory();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data, { withCredentials: true })
      .then((response) => {
        console.log(response.data);

        const accessToken = response.data["access-token"];

        // Set the access token as a cookie
        document.cookie = `access-token=${accessToken}; path=/; max-age=${60 * 60 * 24 * 30}`;

        history.push("/dashboard");
      })
      .catch((error) => {
        // Handle authentication error
        setError("Wrong Username and Password Combination");
      });
  };

  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if there's an error */}
      
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
