import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Importing the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Add & Manage your Questions</h1>
      <div className="button-container">
        <Link to="/staffhome">
          <button className="btn create-btn">Create Question</button>
        </Link>
        <Link to="/bulk-upload">
          <button className="btn bulk-btn">Bulk Upload</button>
        </Link>
        <Link to="/question-library">
          <button className="btn library-btn">Question Library</button>
        </Link>
        <Link to="/ai-generator">
          <button className="btn ai-btn">AI Generator</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
