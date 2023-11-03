import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import AdminRegistration from "./pages/AdminRegistration";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Logout from './pages/Logout'; // Import the new Logout component

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/">Home Page</Link>
          <Link to="/login">Login</Link>
          <Link to="/registration">Registration</Link>
          <Link to="/adminregistration">Admin Registration</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/admindashboard">Admin Dashboard</Link>

          <Logout /> {/* Include the Logout component in the navbar */}
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/registration" exact component={Registration} />
          <Route path="/adminregistration" exact component={AdminRegistration} />
          <Route path="/login" exact component={Login} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/admindashboard" exact component={AdminDashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
