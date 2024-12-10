import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/EditQuestion.css';

const EditQuestion = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all the question data when the component mounts
  useEffect(() => {
    fetch(`http://localhost:8000/staff/editquestion/`)  // No ID in URL
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching question data');
        setLoading(false);
      });
  }, []);

  // Handle input changes for each question
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    
    if (name === 'options') {
      updatedQuestions[index][name] = value.split(',').map(option => option.trim()); // Convert to array of options
    } else {
      updatedQuestions[index][name] = value;
    }
    
    setQuestions(updatedQuestions);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the updated question data to the Django API
    fetch(`http://localhost:8000/staff/editquestion/`, {  // No ID in URL
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questions),  // Send all questions
    })
      .then(response => response.json())
      .then(data => {
        // On success, redirect back to the question list or some other page
        navigate('/questions');
      })
      .catch(err => {
        setError('Error updating questions');
      });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="edit-question-container">
      <h1>Edit Questions</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={question.id}>
            <h2>Question {index + 1}</h2>

            <div className="form-group">
              <label>Question Text:</label>
              <input
                type="text"
                name="question_text"
                value={question.question_text}
                onChange={(e) => handleChange(e, index)}
              />
            </div>

            <div className="form-group">
              <label>Options (comma separated):</label>
              <input
                type="text"
                name="options"
                value={question.options.join(', ')}
                onChange={(e) => handleChange(e, index)}
              />
            </div>

            <div className="form-group">
              <label>Correct Option:</label>
              <input
                type="text"
                name="correct_option"
                value={question.correct_option}
                onChange={(e) => handleChange(e, index)}
              />
            </div>

            <div className="form-group">
              <label>Mark:</label>
              <input
                type="number"
                name="mark"
                value={question.mark}
                onChange={(e) => handleChange(e, index)}
              />
            </div>

            <div className="form-group">
              <label>Negative Mark:</label>
              <input
                type="number"
                name="negative_mark"
                value={question.negative_mark}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
          </div>
        ))}

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditQuestion;
