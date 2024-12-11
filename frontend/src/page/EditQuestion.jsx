import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditQuestion = () => {
    const [questions, setQuestions] = useState([]); // To hold the question data from session storage
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the saved questions from session storage
        const savedQuestions = JSON.parse(sessionStorage.getItem('questions')) || [];
        setQuestions(savedQuestions);
    }, []);

    const handleBackClick = () => {
        // Navigate back to staff home page
        navigate('/staffhome');
    };

    const handleEditClick = (index) => {
        // Navigate to the edit page for a specific question (you can modify this as needed)
        navigate(`/editquestion/${index}`);
    };

    if (questions.length === 0) {
        return <div className="no-questions">No questions available to edit.</div>;
    }

    return (
        <div className="edit-question-container">
            <h1 className="title">Edit Questions</h1>
            <p className="subtitle">Here you can edit the questions.</p>

            {/* Back Button */}
            <button className="btn back-btn" onClick={handleBackClick}>Back</button>

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

                            {/* Edit Button */}
                            <button
                                className="btn edit-btn"
                                onClick={() => handleEditClick(index)}
                            >
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EditQuestion;
