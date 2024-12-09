import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/home'; // Importing Home component
import StaffHome from './page/staffhome'; // Correct import path for StaffHome
import AddQuestion from './page/AddQuestion'; // Importing AddQuestion component
import EditQuestion from './page/EditQuestion'; // Importing EditQuestion component

function App() {
    return (
        <Router>
            <Routes>
                {/* Route for Home page */}
                <Route path="/" element={<Home />} />
                {/* Route for StaffHome page */}
                <Route path="/staffhome" element={<StaffHome />} />
                {/* Route for AddQuestion page */}
                <Route path="/addquestion" element={<AddQuestion />} />
                {/* Route for EditQuestion with dynamic id */}
                <Route path="/editquestion" element={<EditQuestion />} /> 
                </Routes>
        </Router>
    );
}

export default App;
