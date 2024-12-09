import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/staffhome.css'

const StaffHome = () => {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [questions, setQuestions] = useState([]);  // To hold the question data
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from the backend
        axios.get('http://localhost:8000/staff/staffhome/')
            .then(response => {
                setMessage(response.data.message);
                setStatus(response.data.status);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setError('Failed to load data.');
                setLoading(false);
            });

        // Fetch the saved questions from session (if any)
        const savedQuestions = JSON.parse(sessionStorage.getItem('questions')) || [];
        setQuestions(savedQuestions);
    }, []);

    const handleAddQuestionClick = () => {
        navigate('/addquestion');
    };

    const handleBackClick = () => {
        // Clear the session storage
        sessionStorage.removeItem('questions');
        
        // Reset the state
        setQuestions([]);
        
        // Navigate to Home page
        navigate('/');
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="staff-home-container">
            <h1 className="title">Our Services</h1>
            <p className="subtitle">Please select which service you are interested in.</p>

            {/* Back Button */}
            <button className="btn back-btn" onClick={handleBackClick}>Back</button>

            <div className="service-card">
                <h2 className="service-title">Logical Reasoning</h2>
                <div className="buttons">
                    <button className="btn preview-btn">Preview</button>
                    <button className="btn edit-session-btn">Edit Session</button>
                    <button className="btn add-questions-btn"> Edit Question</button>
                    <button
                        className="btn edit-btn"
                        onClick={handleAddQuestionClick}
                    >
                        Add Questions
                    </button>
                </div>
                <div className="details">
                    <p>Duration: <span>30 Min</span></p>
                    <p>No of Questions: <span>20</span></p>
                </div>
            </div>

            {/* Display questions stored in the session */}
            {questions.length > 0 && (
                <div className="questions-container">
                    <h3>Questions Added:</h3>
                    <ul>
                        {questions.map((question, index) => (
                            <li key={index} className="question-item">
                                <h4>{question.question}</h4>
                                <ul className="options-list">
                                    {question.options.map((option, idx) => (
                                        <li key={idx} className="option-item">{option}</li>
                                    ))}
                                </ul>
                                <p><strong>Correct Option:</strong> {question.correctOption}</p>
                                <p><strong>Mark:</strong> {question.mark}</p>
                                <p><strong>Negative Mark:</strong> {question.negativeMark}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default StaffHome;

